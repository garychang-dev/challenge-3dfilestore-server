import { Request, Response } from 'express'
import Database from '../database/database';
import Transformer from '../transformer';

const transformFile = async (req: Request, res: Response): Promise<void> => {

  try {
    const fileId = req.params.fileId as string;
    const scaleX = req.params.scaleX ? Number(req.params.scaleX) : 0;
    const scaleY = req.params.scaleY ? Number(req.params.scaleY) : 0;
    const scaleZ = req.params.scaleZ ? Number(req.params.scaleZ) : 0;
    const offsetX = req.params.offsetX ? Number(req.params.offsetX) : 0;
    const offsetY = req.params.offsetY ? Number(req.params.offsetY) : 0;
    const offsetZ = req.params.offsetZ ? Number(req.params.offsetZ) : 0;

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
