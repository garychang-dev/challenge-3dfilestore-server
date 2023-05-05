import { Request, Response } from 'express'

import { ObjFile } from '../types';
import Database from '../database/database';

const renameFile = async (req: Request, res: Response): Promise<void> => {

    if (req.body.fileId && req.body.newName) {
        const renamedFileData = await Database.renameFile(req.body.fileId, req.body.newName);
        const output: ObjFile = {
          id: renamedFileData._id.toString(),
          name: renamedFileData.realFilename || '',
          creation_date: renamedFileData.storageDate || new Date(0),
          size: renamedFileData.size || 0
        };

        console.log('Rename file successful: ', output);
        res.json(output);
    } else {
        throw new Error('Missing params fieldId or newName');
    }
};

export default renameFile;
