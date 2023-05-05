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

  public static async getOneFile(fileId: string) {
    try {
      const foundFileData = await FileModel.findOne({ _id: fileId }).exec();
      return foundFileData?.toObject();
    } catch (err) {
      console.log('Unable to find one file data in database: ', err);
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
      console.log('Unable to save file data in database: ', err);
      throw err;
    }
  }

  public static async renameFile(fileId: string, newName: string) {
    try {
      // NOTE: We could use FileModel.updateOne(),
      //       but it doesn't seem like we can get the updated file from the result directly.
      //       So, here we simply use findOne() and save().

      const fileData = await FileModel.findOne({ _id: fileId }).exec();
      if (!fileData) {
        throw new Error('Unable to find the file that needs to be renamed');
      }

      fileData.realFilename = newName;
      const savedFileData = await fileData.save();
      return savedFileData.toObject();
    } catch (err) {
      console.log('Unable to rename file in database: ', err);
      throw err;
    }
  }

  public static async deleteFile(fileId: string): Promise<void> {
    try {
      await FileModel.deleteOne({_id: fileId}).exec();
    } catch (err) {
      console.log('Unable to delete file data from database: ', fileId );
      throw err;
    }
  }
}
