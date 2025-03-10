import * as crypto from 'crypto';

export const generateCode = () => {
  return crypto.randomInt(1000, 9999).toString();
};

export const randomByte = (length: number) => {
  return crypto.randomBytes(length).toString('hex');
};

export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString('base64');
};

export const convertToUid = (data: string) => {
  return randomByte(8) + encodeBase64(data);
};
