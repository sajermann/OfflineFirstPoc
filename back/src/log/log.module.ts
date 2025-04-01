import { Module, forwardRef } from '@nestjs/common';

import { LogService } from './services/log.service';

import { ConfigService } from '@nestjs/config';
import { LogEntity } from './entities/log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRepository } from './repositories/log.repository';
import { LogController } from './controllers/log.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TranslationModule } from 'src/translation/translation.module';

@Module({
  controllers: [LogController],
  imports: [
    TypeOrmModule.forFeature([LogEntity]),
    forwardRef(() => AuthModule),
    TranslationModule,
  ],
  providers: [LogService, ConfigService, LogRepository],
  exports: [TypeOrmModule, LogService, LogRepository],
})
export class LogModule {}
