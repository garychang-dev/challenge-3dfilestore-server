export type ObjFile = {
  id: string;
  name: string;
  creation_date: Date;
  size: number;
};

export type FileData = {
	id?: string;
	originalFilename: string;
	storedFilename: string;
	storagePath: string;
	storageDate: Date;
	size: number;
}