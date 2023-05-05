import os from 'os';
import express, { Request, Response } from 'express'
import multer from 'multer';
import path from 'path';

import recordFile from './recordFile';

const router = express.Router();

const uploadPath = path.join(os.tmpdir(), 'uploads')
const upload = multer({dest: uploadPath });

router.get('/listFiles', async (req: Request, res: Response) => {
  // TODO: Read from database and return data in array format
  res.json([]);
});

router.post('/uploadFile', upload.single('file'), recordFile);

export default router;