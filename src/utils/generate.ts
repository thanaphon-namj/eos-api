import * as crypto from 'crypto';

export const generateCode = (value: string, length: number = 4) => {
  return String(Number(value) + 1).padStart(length, '0');
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
