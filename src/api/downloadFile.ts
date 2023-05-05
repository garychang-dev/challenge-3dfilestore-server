import { Request, Response } from 'express'
import Database from '../database/database';

const downloadFile = async (req: Request, res: Response): Promise<void> => {
  const fileId = req.query.fileId as string;
  if (!fileId) {
    console.log('Missing fileId param');
    res.sendStatus(404);
    return Promise.reject();
  }

  try {
    // Get the stored file path first
    const foundFile = await Database.getOneFile(fileId);
    const storedFilePath = foundFile?.storagePath;

    if (storedFilePath) {
      res.download(storedFilePath);
    } else {
      console.log('Unable to locate file to download');
      res.sendStatus(404);
    }
  } catch (err) {
    console.log('Unable to download file: ', err);
    res.sendStatus(500);
  }
};

export default downloadFile;
