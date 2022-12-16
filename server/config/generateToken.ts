import jwt from 'jsonwebtoken';
export const generateToken = (payload: object) => {
  const privateKey = String(process.env.ACTIVE_TOKEN_SECRET);
  return jwt.sign(payload, privateKey, { expiresIn: '5m' });
};
export const generateAccessToken = (payload: object) => {
  const privateKey = String(process.env.ACCESS_TOKEN_SECRET);
  return jwt.sign(payload, privateKey, { expiresIn: '15m' });
};
export const generateRefeshToken = (payload: object) => {
  const privateKey = String(process.env.REFESH_TOKEN_SECRET);
  return jwt.sign(payload, privateKey, { expiresIn: '30d' });
};
