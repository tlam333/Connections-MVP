//import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const login = async (req: any, res: any) => {

  //support cookie base authentication  
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');

  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      return res.status(404).json({ message: 'User not found or incorrect password' });
    }

    const passwordMatches = await bcrypt.compare(req.body.password, user.password);
    const userId = String(user._id);

    if (passwordMatches) {
      const accessToken = jwt.sign(
        { sub: userId, username: user.username, },
        config.access_token_secret,
        { expiresIn: '5m' }
      );

      const refreshToken = jwt.sign(
        { sub: userId, username: user.username },
        config.refresh_token_secret,
        { expiresIn: '7d' }
      );

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        sameSite: 'Lax',
        maxAge: 5 * 60 * 1000,
        path: '/',
      });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });

      return res.status(200).send({ id: userId });
    } else {
      return res.status(404).json({ message: 'User not found or incorrect password' });
    }
  } catch (error) {
    return res.status(500).send(`Internal Server Error: "${error}"`);
  }
};
