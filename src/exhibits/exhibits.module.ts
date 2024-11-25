import { Module } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { ExhibitsController } from './exhibits.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ExhibitsController],
  providers: [ExhibitsService, PrismaService],
})
export class ExhibitsModule {}
