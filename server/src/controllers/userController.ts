import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

exports.register = async (req: any,res: any) => {
  try {
    const { username, password, name, age, description, interests } = req.body;

    if (!username || !password || !name || !age || !interests) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Optional: Check for existing user
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.status(409).json({ error: 'Username already taken.' });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      age,
      description,
      interests,
      online: false
    });

    await newUser.save();
    return res.status(201).json(newUser);
    
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
};
