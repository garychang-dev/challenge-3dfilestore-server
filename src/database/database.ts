import mongoose from 'mongoose';

export default class Database {
  public static async initialize(): Promise<void> {
    try {
      await mongoose.connect('mongodb://localhost:27017/3dfilestore-mongodb');
      console.log('MongoDB connection success');
    } catch (err) {
      console.log('MongoDB connection error: ', err);
    }
  }
}
