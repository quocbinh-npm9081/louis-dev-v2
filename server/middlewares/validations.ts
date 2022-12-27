import { Request, Response, NextFunction } from 'express';
export const validEmail = (yourEmail: string) => {
  return String(yourEmail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
export const isVietnamesePhoneNumber = (phoneNumber: string) => {
  return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(phoneNumber);
};

export const validatorRegistration = async (req: Request, res: Response, next: NextFunction) => {
  const errors = [];
  const { name, account, password }: any = req.body;
  if (!name) {
    errors.push('Please add your name');
  } else if (name.length > 20) {
    errors.push('Your name is up to 20 chars long');
  }
  if (!account) {
    errors.push('Please add your account pr phone number !');
  } else if (!isVietnamesePhoneNumber(account) && !validEmail(account)) {
    console.log(isVietnamesePhoneNumber(account));
    errors.push('Your email or your phone is incorrects !');
  }
  if (isVietnamesePhoneNumber(account)) {
    errors.push('Đăng kí sử dụng sms đang trong giai đoạn phát triển');
  }
  if (password.length < 6) {
    errors.push('Your password must be at least 6 characters !');
  }
  if (errors.length > 0) return res.status(400).json({ msg: errors });
  next();
};
export const validatorLogin = async (req: Request, res: Response, next: NextFunction) => {
  const errors = [];
  const { account, password }: any = req.body;
  if (!account) {
    errors.push('Please add your account pr phone number !');
  } else if (!isVietnamesePhoneNumber(account) && !validEmail(account)) {
    errors.push('Your email or your phone is incorrects !');
  }
  if (isVietnamesePhoneNumber(account)) {
    errors.push('Đăng kí sử dụng sms đang trong giai đoạn phát triển');
  }
  if (password.length < 6) {
    errors.push('Your password must be at least 6 characters !');
  }
  if (errors.length > 0) return res.status(400).json({ msg: errors });
  next();
};
