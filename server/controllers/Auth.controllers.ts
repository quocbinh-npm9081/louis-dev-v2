import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefeshToken, generateToken, generateVerifyToken } from '../config/generateToken';
import { validEmail, isVietnamesePhoneNumber } from '../middlewares/validations';
import sendMail from '../config/sendMail';
import sendSms from '../config/sendSMS';
import { IUserDecoded, IUserDocument } from '../config/interfaces';

const loginUser = async (user: IUserDocument, password: string, res: Response) => {
  const passwordHashed = user.password;
  const isMatch = await bcrypt.compare(password, passwordHashed);
  if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect !' });
  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefeshToken({ id: user.id });
  return res
    .cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
    })
    .status(200)
    .json({ msg: 'login success', access_token: access_token, user: { ...user._doc, password: '' } });
};

const AuthControllers = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password }: any = req.body;
      const user = await userModel.findOne({ account });
      if (user) return res.status(500).json({ msg: 'Email or Phone number already exist !' });
      const saltRounds = 10;
      const passwordHashed = await bcrypt.hash(password, saltRounds);
      const newUser = { name: name, account: account, password: passwordHashed };
      const active_token = await generateToken({ newUser });
      const CLIENT_URL = `${process.env.BASE_URL}/active/${active_token}`;
      if (validEmail(account)) {
        const isSendMail = await sendMail(account, 'Xác nhận email của bạn !', CLIENT_URL);
        if (isSendMail)
          return res
            .status(200)
            .json({ status: 'OK', msg: 'Register with email successfully !', data: newUser, active_token: active_token });
        else return res.status(500).json({ status: 'ERROR', msg: 'Somethings went wrong !' });
      }
      // else if (isVietnamesePhoneNumber(account)) {
      //   // return res.status(200).json({ status: 'OK', msg: 'đây là sdt', data: newUser, active_token: active_token });
      //   const isSendSMS = await sendSms(
      //     account,
      //     'anh đang test chức năng gửi sms, em thấy tin nhắn này thì ib cho anh biết là nó hoạt động nha !',
      //     CLIENT_URL,
      //   );
      //   if (isSendSMS)
      //     return res
      //       .status(200)
      //       .json({ status: 'OK', msg: 'Register with your phone number successfully !', data: newUser, active_token: active_token });
      //   else return res.status(500).json({ status: 'ERROR', msg: 'Somethings went wrong !' });
      // }
    } catch (error: any) {
      return res.status(500).json({ status: 'ERROR', msg: error.message });
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      const userDecoded = await generateVerifyToken(active_token);
      const { newUser } = userDecoded;
      if (!newUser) return res.status(500).json({ status: 'ERROR', msg: 'Invalid Authentication !' });
      const user = new UserModel(newUser);
      await user.save();
      res.status(200).json({ msg: 'active succesfully !', data: newUser });
    } catch (error: any) {
      if (error.code === 11000) return res.status(400).json({ status: 'ERROR', msg: 'Account already exits !' });
      if (error.name === 'TokenExpiredError') return res.status(400).json({ status: 'ERROR', msg: 'jwt expired !' });
      return res.status(500).json({ status: 'ERROR', msg: error });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;
      const user = await UserModel.findOne({ account: account });
      if (!user) return res.status(400).json({ msg: 'User already not exits !' });
      loginUser(user, password, res);
    } catch (error: any) {
      return res.status(500).json({ error: error });
    }
  },
  logout: (req: Request, res: Response) => {
    try {
      return res.clearCookie('refresh_token').status(200).json({ msg: 'Logged out !' });
    } catch (error: any) {
      return res.status(500).json({ error: error });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      let rf_token = req.cookies;
      if (!rf_token.refresh_token) return res.status(400).json({ msg: 'Please login again !' });
      rf_token = req.cookies.refresh_token;
      const decoded = await (<IUserDecoded>jwt.verify(rf_token, String(process.env.REFRESH_TOKEN_SECRET)));
      if (!decoded.id) return res.status(400).json({ msg: 'Please login again !' });
      const user = await UserModel.findById(decoded.id).select('-password');
      if (!user) return res.status(400).json({ msg: 'Your Account does not exist Please login again !' });
      const access_token = generateAccessToken({ id: user.id });
      return res
        .status(200)
        .json({ msg: 'refresh token success !', rf_token: rf_token, access_token: access_token, decoded_id: decoded.id });
    } catch (error: any) {
      return res.status(500).json({ error: error });
    }
  },
};

export default AuthControllers;
