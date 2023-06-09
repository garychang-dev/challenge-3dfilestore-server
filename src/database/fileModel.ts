import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  realFilename: String,
  storageFilename: String,
  storagePath: String,
  storageDate: Date,
  size: Number,
});

const FileModel = mongoose.model('File', fileSchema);

export default FileModel;
