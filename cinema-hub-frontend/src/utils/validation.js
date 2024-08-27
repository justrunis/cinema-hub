const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateUsername = (username) => {
  return username.length >= 3;
};

const validatePasswordRepeat = (password, passwordRepeat) => {
  return password === passwordRepeat;
};

export const validateRegistrationForm = (formData) => {
  if (!validateUsername(formData.username)) {
    return "Invalid username. Username must be at least 3 characters long.";
  }

  if (!validateEmail(formData.email)) {
    return "Invalid email address.";
  }

  if (!validatePassword(formData.password)) {
    return "Invalid password. Password must be at least 6 characters long.";
  }

  if (!validatePasswordRepeat(formData.password, formData.passwordRepeat)) {
    return "Passwords do not match.";
  }

  return null; // Return null if the form data is valid
};

export const validateLoginForm = (formData) => {
  if (!validateUsername(formData.username)) {
    return "Invalid username. Username must be at least 3 characters long.";
  }

  if (!validatePassword(formData.password)) {
    return "Invalid password. Password must be at least 6 characters long.";
  }

  return null; // Return null if the form data is valid
};
