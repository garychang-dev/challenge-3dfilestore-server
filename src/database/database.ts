import mongoose from 'mongoose';

import FileModel from './fileModel';
import { StorageFileData } from '../types';

export default class Database {
  public static async initialize(): Promise<void> {
    try {
      await mongoose.connect('mongodb://localhost:27017/3dfilestore-mongodb');
      console.log('MongoDB connection success');
    } catch (err) {
      console.log('MongoDB connection error: ', err);
    }
  }

  public static async readFiles() {
    // NOTE: This is not scalable, but it will do for this exercise.
    //       To improve this, we could introduce pagination.
    try {
      const foundFiles = await FileModel.find().exec();
      return foundFiles.map(x => x.toObject());
    } catch (err) {
      console.log('Unable to find files in database: ', err);
      throw err;
    }
  }

  public static async insertFileData(data: StorageFileData) {
    try {
      const fileModel = new FileModel({
        realFilename: data.realFilename,
        storageFilename: data.storageFilename,
        storagePath: data.storagePath,
        storageDate: data.storageDate,
        size: data.size,
      });
      
      const savedData = await fileModel.save();
      return savedData.toObject();
    } catch (err) {
      console.log('Unable to save data: ', err);
      throw err;
    }
  }
}
