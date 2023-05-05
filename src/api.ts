import os from 'os';
import express, { Request, Response } from 'express'
import multer from 'multer';
import path from 'path';
import { FileData, ObjFile } from './types';

const router = express.Router();

const uploadPath = path.join(os.tmpdir(), 'uploads')
const upload = multer({dest: uploadPath });

router.get('/listFiles', async (req: Request, res: Response) => {
  // TODO: Read from database and return data in array format
  res.json([]);
});

router.post('/uploadFile', upload.single('file'), async (req: Request, res: Response) => {

  if (req.file) {
    const fileData: FileData = {
      originalFilename: req.file.originalname,
      storedFilename: req.file.filename,
      storagePath: req.file.path,
      storageDate: new Date(),
      size: req.file.size,
    };

    console.log(fileData);
  }

  // TODO
  const testOutput: ObjFile = {
    id: 'test',
    name: 'test file',
    creation_date: new Date(),
    size: 123,
  }
  res.json(testOutput);
});

export default router;