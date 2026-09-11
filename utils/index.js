export const validateEmail = (email) => {
  if (!email) {
    return false;
  }

  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.trim()
  );
};

export const validateName = (name) => {
  const trimmed = name.trim();
  return trimmed.length > 0 && !/\d/.test(trimmed);
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return true;
  }

  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
};
