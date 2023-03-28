import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';

@Module({
  exports: [JwtModule],
  imports: [
    UserModule,
    TokenModule,
    AuthorizationModule,
    UserModule,
    JwtModule.register({}),
  ],
  providers: [SecurityService],
  controllers: [SecurityController],
})
export class AuthorizationModule {}
