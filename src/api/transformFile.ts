import { Request, Response } from 'express'
import Database from '../database/database';
import Transformer from '../transformer';

const transformFile = async (req: Request, res: Response): Promise<void> => {

  try {
    const fileId = req.query.fileId as string;
    const scaleX = req.query.scaleX ? Number(req.query.scaleX) : 0;
    const scaleY = req.query.scaleY ? Number(req.query.scaleY) : 0;
    const scaleZ = req.query.scaleZ ? Number(req.query.scaleZ) : 0;
    const offsetX = req.query.offsetX ? Number(req.query.offsetX) : 0;
    const offsetY = req.query.offsetY ? Number(req.query.offsetY) : 0;
    const offsetZ = req.query.offsetZ ? Number(req.query.offsetZ) : 0;

    if (!fileId) {
      console.log('Missing fileId param');
      res.sendStatus(404);
      return;
    }
  
    // Get the stored file path first
    const foundFile = await Database.getOneFile(fileId as string);
    const storedFilepath = foundFile?.storagePath;
    const realFilename = foundFile?.realFilename;

    if (storedFilepath && realFilename) {

      // Create a temporary transformed file
      const transformer = new Transformer(
        storedFilepath,
        realFilename,
        { x: scaleX, y: scaleY, z: scaleZ },
        { x: offsetX, y: offsetY, z: offsetZ },
      );

      const transformedFileFullpath = await transformer.createTransformedFile();
      console.log('File transformation success');

      // Download the file (send it to the user)
      res.download(transformedFileFullpath);

      // NOTE: Consider cleaning up the temporary files after a while
    } else {
      console.log('Unable to locate file to transform');
      res.sendStatus(404);
    }
  } catch (err) {
    console.log('Unable to transform file: ', err);
    res.sendStatus(500);
  }
};

export default transformFile;
