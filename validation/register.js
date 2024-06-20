const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";

  if (!Validator.isLength(data.username, {min: 2, max: 20})) {
      errors.username = "Username must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.isLength(data.password, {min: 6, max: 20})) {
    errors.password = "Password must be between 6 and 20 characters";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };


}
