const isEmpty = require("./is-empty");

module.exports = data => {
  let errors = {};

  if (data.username.trim().length <= 5) {
    errors.username = "Username must be greater than 5 characters";
  }

  if (data.password.trim().length <= 8) {
    errors.password = "Password must be greater than 8 characters";
  }

  if (data.password2 !== data.password) {
    errors.password2 = "Passwords must match";
  }

  if (isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Password confirmation field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
