import express, { Request, Response } from 'express'
const router = express.Router();

router.get('/listFiles', async (req: Request, res: Response) => {
  // TODO: Read from database and return data in array format
  res.json([]);
});

export default router;