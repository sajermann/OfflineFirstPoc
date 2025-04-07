import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TranslationModule } from './translation/translation.module';
import { LogModule } from './log/log.module';
import { UserService } from './user/services/user.service';
import { ProductionInfoModule } from './productionInfo/production-info.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        authPlugin: 'sha256_password',
        url: configService.get('DATABASE_URL'),
        // host: configService.get('DATABASE_HOST'),
        // port: configService.get('DATABASE_PORT'),
        // username: configService.get('DATABASE_USERNAME'),
        // password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true, // TODO: deixaar apenas em desenvolvimento
        driver: require('mysql2'),
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),

    WinstonModule.forRoot({
      level: 'silly',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
              processId: true,
            }),
          ),
        }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    }),
    JwtModule.register({ global: true, secret: 'hard!to-guess_secret' }),
    NestjsFormDataModule,
    AuthModule,
    ProductionInfoModule,
    LogModule,
    TranslationModule,
    UserModule,
  ],
  providers: [ConfigService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService) {}

  async onApplicationBootstrap() {
    // await this.userService.seedAdminUser();
  }
}
