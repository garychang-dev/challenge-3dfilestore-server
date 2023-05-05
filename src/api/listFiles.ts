import { Request, Response } from 'express'

import { ObjFile } from '../types';
import Database from '../database/database';

const listFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = await Database.readFiles();
    const output: ObjFile[] = files.map(file => ({
      id: file._id.toString(),
      name: file.realFilename || '',
      creation_date: file.storageDate || new Date(0),
      size: file.size || 0
    }));

    console.log('List files success: ', output);
    res.json(output);
  } catch (err) {
    console.log('Unable to list files: ', err);
    res.sendStatus(500);
  }
};

export default listFiles;
