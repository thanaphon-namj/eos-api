import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { randomByte } from '../../utils/generate';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${randomByte(16)}.${file.originalname.split('.').pop()}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 1024 * 1024,
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
