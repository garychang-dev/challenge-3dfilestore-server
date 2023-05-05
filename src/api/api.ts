import os from 'os';
import express, { Request, Response } from 'express'
import multer from 'multer';
import path from 'path';

import recordFile from './recordFile';
import listFiles from './listFiles';
import renameFile from './renameFile';
import deleteFile from './deleteFile';
import downloadFile from './downloadFile';

const router = express.Router();

const uploadPath = path.join(os.tmpdir(), 'uploads')
const upload = multer({dest: uploadPath });

router.get('/listFiles', listFiles);
router.post('/uploadFile', upload.single('file'), recordFile);
router.put('/renameFile', renameFile);
router.delete('/deleteFile', deleteFile);
router.get('/downloadFile', downloadFile);

export default router;