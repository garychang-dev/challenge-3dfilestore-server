import { Request, Response } from 'express'

import { StorageFileData, ObjFile } from '../types';
import Database from '../database/database';

const recordFile = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    console.log('Missing file param');
    res.sendStatus(400);
    return Promise.reject(new Error('Missing file param'));
  }

  try {
    const fileData: StorageFileData = {
      realFilename: req.file.originalname,
      storageFilename: req.file.filename,
      storagePath: req.file.path,
      storageDate: new Date(),
      size: req.file.size,
    };

    const savedData = await Database.insertFileData(fileData);
    const output: ObjFile = {
      id: savedData._id.toString(),
      name: savedData.realFilename || '',
      creation_date: savedData.storageDate || new Date(0),
      size: savedData.size || 0,
    }

    console.log('Record file success: ', output);
    res.json(output);
  } catch (err) {
    console.log('Unable to record file: ', err);
    res.sendStatus(500);
  }
};

export default recordFile;
