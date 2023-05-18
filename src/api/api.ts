import os from 'os';
import express, { Request, Response } from 'express'
import multer from 'multer';
import path from 'path';

import recordFile from './recordFile';
import listFiles from './listFiles';
import renameFile from './renameFile';
import deleteFile from './deleteFile';
import downloadFile from './downloadFile';
import transformFile from './transformFile';

const router = express.Router();

const uploadPath = path.join(os.tmpdir(), '3dfilestore', 'uploads');
const upload = multer({dest: uploadPath });

router.get('/files', listFiles);
router.post('/files', upload.single('file'), recordFile);
router.put('/files', renameFile);
router.delete('/files', deleteFile);
router.get('/files/:fileId', downloadFile);
router.get('/files/transform/:fileId/:scaleX/:scaleY/:scalyZ/:offsetX/:offsetY/:offsetZ', transformFile);

export default router;