import { Request, Response } from 'express'
import fs from 'fs';
import Database from '../database/database';

const deleteFile = async (req: Request, res: Response): Promise<void> => {
  if (!req.body.fileId) {
    console.log('Missing fileId param');
    res.sendStatus(404);
    return Promise.reject();
  }

  try {
    // Get the stored file path first
    const foundFile = await Database.getOneFile(req.body.fileId);
    const storedFilePath = foundFile?.storagePath;

    // Delete the file from the database
    await Database.deleteFile(req.body.fileId);
    console.log('Delete file from database success');

    // Delete the file from hard drive
    if (storedFilePath) {
      fs.unlinkSync(storedFilePath);
      console.log('File removed from storage: ', storedFilePath);
    } else {
      console.log('Cannot remove file from storage because of missing path');
    }

    res.sendStatus(200);
  } catch (err) {
    console.log('Unable to delete file: ', err);
    res.sendStatus(500);
  }
};

export default deleteFile;
