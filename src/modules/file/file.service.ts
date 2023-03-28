import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { cloudinary } from 'src/util/cloudinary.util';

@Injectable()
export class FileService {
  async createFile(file): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return this.uploadToCloudinary(filePath, fileName);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async uploadToCloudinary(filePath: string, fileName: string) {
    try {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
      const image = await cloudinary.uploader.upload(
        `${filePath}/${fileName}`,
        options,
      );

      return image.url;
    } catch (e) {
      console.log(e);
    }
  }
}
