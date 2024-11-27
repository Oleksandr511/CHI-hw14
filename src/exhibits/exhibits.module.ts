import { Module } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { ExhibitsController } from './exhibits.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [ExhibitsController],
  providers: [ExhibitsService, PrismaService, FileService],
})
export class ExhibitsModule {}
