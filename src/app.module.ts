import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { FileService } from './file/file.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [AuthModule, UserModule, ExhibitsModule],
  controllers: [],
  providers: [FileService, PrismaService],
})
export class AppModule {}
