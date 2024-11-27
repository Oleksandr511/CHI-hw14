import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FileService {
  private s3: S3Client;
  private bucketName: string = 'file-uploader-test';
  constructor(private prisma: PrismaService) {
    this.s3 = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Buffer, fileName: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file,
    });
    try {
      await this.s3.send(command);
      const url = `https://${this.bucketName}.s3.eu-north-1.amazonaws.com/${fileName}`;
      console.log('url', url);

      return url;
    } catch (error) {
      return error;
    }
  }
}
