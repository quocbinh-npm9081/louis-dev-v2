import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import { generateToken } from '../config/generateToken';
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
      //  newUser.save();
      return res.status(200).json({ status: 'OK', msg: 'Register successfully !', data: newUser, active_token: active_token });
    } catch (error) {
      return res.status(500).json({ status: 'ERROR', msg: error });
    }
  },
};

export default AuthControllers;
