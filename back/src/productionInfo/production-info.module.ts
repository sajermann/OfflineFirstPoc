import { Module, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { LogModule } from 'src/log/log.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { TranslationModule } from 'src/translation/translation.module';
import { ProductionInfoController } from './controllers/production-info.controller';
import { ProductionInfoService } from './services/production-info.service';
import { ProductionInfoRepository } from './repositories/production-info.repository';
import { ProductionInfoEntity } from './entities/production-info.entity';


@Module({
  controllers: [ProductionInfoController],
  providers: [ProductionInfoService, ProductionInfoRepository, ConfigService],
  imports: [
    TypeOrmModule.forFeature([ProductionInfoEntity]),
    LogModule,
    AuthModule,
    TranslationModule,

  ],
  exports: [TypeOrmModule, ProductionInfoService, ProductionInfoRepository],
})
export class ProductionInfoModule {}
