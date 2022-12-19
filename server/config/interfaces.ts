import { Document } from 'mongoose';
export interface IUserDocument extends Document {
  name: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  type: string;
  _doc: object;
}

export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface IUserDecoded {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}
