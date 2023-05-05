import { Request, Response } from 'express'
import Database from '../database/database';

const downloadFile = async (req: Request, res: Response): Promise<void> => {
  const fileId = req.query.fileId;
  if (!fileId) {
    console.log('Missing fileId param');
    res.sendStatus(404);
    return;
  }

  try {
    // Get the stored file path first
    const foundFile = await Database.getOneFile(fileId as string);
    const storedFilePath = foundFile?.storagePath;
    const realFilename = foundFile?.realFilename;

    if (storedFilePath && realFilename) {
      res.download(storedFilePath, realFilename);
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
