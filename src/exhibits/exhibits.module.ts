import { Module } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { ExhibitsController } from './exhibits.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FileService } from 'src/file/file.service';
import { MyGateway } from 'src/gateway/gateway';

@Module({
  controllers: [ExhibitsController],
  providers: [ExhibitsService, PrismaService, FileService, MyGateway],
})
export class ExhibitsModule {}
