import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// export const generateToken =(userId ,res ) =>{
//     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//         expiresIn: '7d',
//     });
//     res.cookie("jwt", token, {
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== 'development', // Set to true if using HTTPS
//         sameSite: 'strict', // Adjust as needed
//     });
//     return token;
// }

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return token;
}; 