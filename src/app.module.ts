import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExhibitsModule } from './exhibits/exhibits.module';

@Module({
  imports: [AuthModule, UserModule, ExhibitsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
