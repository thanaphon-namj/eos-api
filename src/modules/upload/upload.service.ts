import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor() {}

  async upload(file: Express.Multer.File) {
    return {
      url: file.filename,
    };
  }
}
