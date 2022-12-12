import { Request, Response, NextFunction } from 'express';

const validEmail = (yourEmail: string) => {
  return String(yourEmail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const validPhone = (phone: string) => {
  const myPhoneRegex =
    /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i;
  if (myPhoneRegex.test(phone)) {
    return true;
  }
  return false;
};

const validatorRegistration = async (req: Request, res: Response, next: NextFunction) => {
  const { name, account, password }: any = req.body;
  if (!name) {
    return res.status(400).json({ msg: 'Please add your name' });
  } else if (name.length > 20) {
    return res.status(400).json({ msg: 'Your name is up to 20 chars long' });
  }
  if (!account) {
    return res.status(400).json({ msg: 'Please add your account pr phone number' });
  } else if (validEmail(account)) {
    return res.status(400).json({ msg: 'Your account is up to 20 chars long' });
  }
};

export default validatorRegistration;
