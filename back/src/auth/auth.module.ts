import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthGuard } from 'src/shared/guard/auth.guard';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from 'src/user/user.module';
import { TranslationModule } from 'src/translation/translation.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TranslationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
