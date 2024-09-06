'use server';

import { getCollection } from '../lib/db';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

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

  //if username already exists

  const usersCollection = await getCollection('users');

  const isUserExist = await usersCollection.findOne({
    username: ourUser.username,
  });

  if (isUserExist) {
    errors.username = 'Username already exists';
  }

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

  const salt = await bcrypt.genSalt(10);
  ourUser.password = await bcrypt.hash(ourUser.password, salt);

  const newUser = await usersCollection.insertOne(ourUser);

  const ourTokenValue = jwt.sign(
    { userId: newUser.insertedId.toString() },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  cookies().set('ourhaikuapp', ourTokenValue, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  return {
    success: true,
  };
};

export const logout = async () => {
  cookies().delete('ourhaikuapp');
  redirect('/');
};

export const login = async (prevState, formData) => {
  const ourUser = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  if (typeof ourUser.username != 'string') ourUser.username = '';
  if (typeof ourUser.password != 'string') ourUser.password = '';

  const collection = await getCollection('users');

  const user = await collection.findOne({ username: ourUser.username });

  if (!user) {
    return {
      success: false,
      message: 'Invalid username / password',
    };
  }

  const isValidPassword = await bcrypt.compare(ourUser.password, user.password);

  if (!isValidPassword) {
    return {
      success: false,
      message: 'Invalid username / password',
    };
  }

  //create jwt value

  const ourTokenValue = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  cookies().set('ourhaikuapp', ourTokenValue, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  return redirect('/');
};
