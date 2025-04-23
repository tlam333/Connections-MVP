import { Router, RequestHandler } from 'express';
import User, { IUser } from '../models/user';

const router = Router();

const profileRoutes: RequestHandler<
  {}, {}, 
  { username: string; name: string; age: number; description?: string; interests: string[]; }
> = async (req, res) => {
  try {
    const { username, name, age, description, interests } = req.body;
    if (!username || !name || !age || !interests) {
      res.status(400).json({ error: 'Missing required fields.' });
      return;               // <- return void
    }

    const user = await User.findOneAndUpdate(
      { username },
      { name, age, description, interests },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(user);        // <- don’t `return` this
    return;                // <- return void
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
    return;                // <- return void
  }
};

router.post('/profile', profileRoutes);

export default router;
