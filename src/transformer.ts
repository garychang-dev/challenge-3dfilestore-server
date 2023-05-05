import { Vector3 } from './types';
import readline from 'readline';
import os from 'os';
import path from 'path';
import fs from 'fs';

const tempFileDir = path.join(os.tmpdir(), '3dfilestore', 'transforms');

export default class Transformer {
  storedFullFilepath: string;
  realFilename: string;
  scale: Vector3;
  translation: Vector3;

  constructor(storedFullFilepath: string, realFilename: string, scale: Vector3, translation: Vector3) {
    this.storedFullFilepath = storedFullFilepath;
    this.realFilename = realFilename;
    this.scale = scale;
    this.translation = translation;
  }

  public async createTransformedFile(): Promise<string|any> {

    await this.ensureTempDirExists();
    const readStream = fs.createReadStream(this.storedFullFilepath);
    const transformedFileFullpath = path.join(tempFileDir, this.realFilename);
    const writeStream = fs.createWriteStream(transformedFileFullpath, {flags: 'w'});

    const readlineInterface = readline.createInterface({
      input: readStream,
      output: writeStream,
    });

    return await new Promise(resolve => {
      readlineInterface
      .on('line', (line) => {
        const modifiedLine = this.applyTransformation(line);
        writeStream.write(`${modifiedLine}\n`);
      })
      .on('close', () => {
        console.log(`File created: ${writeStream.path}`);
        resolve(writeStream.path as string);
      });
    });
  }

  private ensureTempDirExists(): Promise<void> {
    if (!fs.existsSync(tempFileDir)) {
      fs.mkdir(tempFileDir, (err) => {
        if(err) {
          return Promise.reject(err);
        }
        return Promise.resolve();
      });
    }
    return Promise.resolve();
  }
  
  private applyTransformation(line: string,): string {
    const regex = /v\s+(.+)\s+(.+)\s+(.+)/
    const regexMatch = line.match(regex);
    if (regexMatch) {
      let x = Number(regexMatch[1]);
      let y = Number(regexMatch[2]);
      let z = Number(regexMatch[3]);

      // Apply scale
      x *= this.scale.x;
      y *= this.scale.y;
      z *= this.scale.z;

      // Apply translation
      x += this.translation.x
      y += this.translation.y
      z += this.translation.z

      return `v ${x} ${y} ${z}`;
    }

    return line;
  }
}