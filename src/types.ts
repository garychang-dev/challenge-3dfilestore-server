export type ObjFile = {
  id: string;
  name: string;
  creation_date: Date;
  size: number;
};

export type StorageFileData = {
	id?: string;
	realFilename: string;
	storageFilename: string;
	storagePath: string;
	storageDate: Date;
	size: number;
}