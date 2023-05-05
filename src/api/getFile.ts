import { Request, Response } from 'express'

import { ObjFile } from '../types';
import Database from '../database/database';

const getFile = async (req: Request, res: Response): Promise<void> => {
  if (!req.body.fileId) {
    console.log('Missing fileId param');
    res.sendStatus(404);
    return Promise.reject();
  }

  try {
    const file = await Database.getOneFile(req.body.fileId);
    if (file) {
      const output: ObjFile = {
        id: file._id.toString(),
        name: file.realFilename || '',
        creation_date: file.storageDate || new Date(0),
        size: file.size || 0
      };
  
      console.log('Get file success: ', output);
      res.json(output);
    } else {
      console.log('File not found in database');
      res.sendStatus(404);
    }
  } catch (err) {
    console.log('Unable to get file: ', err);
    res.sendStatus(500);
  }
};

export default getFile;
