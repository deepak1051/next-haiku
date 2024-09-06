'use server';

function isAlphanumeric(str) {
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(str);
}

export const register = async (prevState, formData) => {
  const errors = {};

  const ourUser = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  if (typeof ourUser.username != 'string') ourUser.username = '';
  if (typeof ourUser.password != 'string') ourUser.password = '';

  ourUser.username = ourUser.username.trim();
  ourUser.password = ourUser.password.trim();

  if (ourUser.username.length < 3)
    errors.username = 'Username must be atleast 3 chars';
  if (ourUser.username.length > 20)
    errors.username = 'Username cannot exceed 20 chars';
  if (!isAlphanumeric(ourUser.username))
    errors.username = 'Username should be alpha numeric';
  if (ourUser.username === '') errors.username = 'You must provide a username';

  if (ourUser.password.length < 4)
    errors.password = 'Password must be atleast 4 chars';
  if (ourUser.password.length > 20)
    errors.password = 'Password cannot exceed 20 chars';

  if (ourUser.password === '') errors.password = 'You must provide a password';

  if (errors.username || errors.password) {
    return {
      errors: errors,
      success: false,
    };
  }

  return {
    success: true,
  };
};
