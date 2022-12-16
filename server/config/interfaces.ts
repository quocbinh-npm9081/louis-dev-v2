export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface IUserDecoded {
  newUser: INewUser;
  iat: number;
  exp: number;
}
