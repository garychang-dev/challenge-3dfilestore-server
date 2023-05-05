import { Request, Response } from 'express'

import { StorageFileData, ObjFile } from '../types';
import Database from '../database/database';

const recordFile = async (req: Request, res: Response) => {
  if (req.file) {
    const fileData: StorageFileData = {
      originalFilename: req.file.originalname,
      storageFilename: req.file.filename,
      storagePath: req.file.path,
      storageDate: new Date(),
      size: req.file.size,
    };

    const savedData = await Database.insertFileData(fileData);
    const output: ObjFile = {
      id: savedData._id.toString(),
      name: savedData.originalFilename || '',
      creation_date: savedData.storageDate || new Date(0),
      size: savedData.size || 0,
    }

    console.log('Recorded file: ', output);
    res.json(output);
  } else {
    throw new Error('Unable to record file data to database');
  }
};

export default recordFile;
