import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const getUserFromCookie = async () => {
  const theCookie = cookies().get('ourhaikuapp')?.value;

  if (theCookie) {
    try {
      const decoded = jwt.verify(theCookie, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  }
};
