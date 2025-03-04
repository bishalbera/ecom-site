import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env', '.env.development'],
    load: [configuration]
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
