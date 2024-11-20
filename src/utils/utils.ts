import moment from 'moment';
import CryptoJs from 'crypto-js';
import JSEncrypt from 'jsencrypt';
moment.locale('zh-cn');

// 密钥
const key = '1112345345676435';
// 十六位十六进制数作为秘钥
const aesKey = CryptoJs.enc.Latin1.parse(key);

// RSA公钥
const rsaPublicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoOMDGcMpAB5ha0QtaZ106pcpa9GoEXxKjIPCer5L0fLU7uCHQqa5naD2XUd5Qi5rVhGnPtg3OEVqWlh8dj2pdSA8f+AFbOSxfhi19WKgm/HDZX9mYutwdNvH6R2+cJkU1e+TyHZkn0PNtEET1X6OXYePYgRptkD7mkudzpkL4ff5snDhxReYINbQd+xVEcV17/OoK+bbqciXjpGWmBjjp0bDGoPjPrJfMDRTe4Chwia1CVSQy4WV8lPR5tUcPeKf3qUVCrudtd21Cc5D3NbxJzJFy0foXmVKnsZ9UEoZtJFbh0L2yalT/488HM9nR5W/A7Pmgz4tJceEW2eg29HdcQIDAQAB';

// AES加密
export const AESEncrypt = (str: string) => {
  const srcs = CryptoJs.enc.Utf8.parse(str);

  return CryptoJs.AES.encrypt(srcs, aesKey, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7,
  }).toString();
};

// RSA加密
export const RSAEncrypt = (str: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(rsaPublicKey);
  return encrypt.encrypt(str);
};

export function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export const md5 = (str: string) => CryptoJs.MD5(str).toString();

export function copyToClip(text: string) {
    return new Promise((resolve, reject) => {
      try {
        const input: HTMLTextAreaElement = document.createElement('textarea');
        input.setAttribute('readonly', 'readonly');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        if (document.execCommand('copy')) document.execCommand('copy');
        document.body.removeChild(input);
        resolve(text);
      } catch (error) {
        reject(error);
      }
    });
}

export const timeFormate = (time: number, reg = 'YYYY-MM-DD HH:mm:ss') => {
    return time ? moment(new Date(parseInt(time + ''))).format(reg) : '';
};