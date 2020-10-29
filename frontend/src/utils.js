// Utilities
import { sha256 } from 'js-sha256';

export const trimValue = (val) => {
  if (typeof val === 'string' || val instanceof String) {
    return val.trim();
  }
  return val;
};

export const validateEmail = (email) => {
  const regex = /^([A-Za-z0-9_\-+:.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return regex.test(email);
};

export const generateSessionId = (email1, email2) => {
  const emailArray = [email1, email2];
  emailArray.sort();
  return sha256(emailArray);
};

export const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};
