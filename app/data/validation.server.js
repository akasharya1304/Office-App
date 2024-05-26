function isValidEmail(value) {
  return value && value.includes('@');
}

function isValidPassword(value) {
  return value && value.trim().length >= 7;
}

export function validateCredentials(input) {
  let validationErrors = {};

  if (!isValidEmail(input.email)) {
    validationErrors.email = 'Invalid email address.'
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}