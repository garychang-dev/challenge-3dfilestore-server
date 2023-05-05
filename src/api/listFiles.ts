import { Request, Response } from 'express'

import { ObjFile } from '../types';
import Database from '../database/database';

const listFiles = async (req: Request, res: Response): Promise<void> => {
    const files = await Database.readFiles();
    const output: ObjFile[] = files.map(file => ({
        id: file._id.toString(),
        name: file.realFilename || '',
        creation_date: file.storageDate || new Date(0),
        size: file.size || 0
    }));
    res.json(output);
};

export default listFiles;
