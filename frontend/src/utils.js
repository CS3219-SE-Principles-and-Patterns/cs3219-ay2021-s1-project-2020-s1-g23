// Utilities

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
