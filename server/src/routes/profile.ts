import { Router, RequestHandler } from 'express';
import User, { IUser } from '../models/user';

const router = Router();

const profileRoutes: RequestHandler<
  {}, {}, 
  { username: string; password: string; name: string; age: number; description?: string; interests: string[]; }
> = async (req, res) => {
  try {
    const { username, password, name, age, description, interests } = req.body;
    if (!username || !password || !name || !age || !interests) {
      res.status(400).json({ error: 'Missing required fields.' });
      return;               // <- return void
    }

    //const existingUser = await User.findOne({ username });

    // if(existingUser){
    //   return res.status(409).json({ error: 'Username already taken.' });
    // }

    const newUser = new User({
      username,
      password,
      name,
      age,
      description,
      interests,
      online: false
    });

    await newUser.save();
    res.status(201).json(newUser);            
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
    return;                // <- return void
  }
};

router.post('/profile', profileRoutes);

export default router;
