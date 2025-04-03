import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import path from 'path';
import { extractErrors } from './shared/utils/extract-errors';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  console.log(`sajermann`, process.env.DATABASE_URL);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.enableCors({
    origin: [
      'http://localhost:5000',
      'http://127.0.0.1:5000',
      'http://localhost:5001',
      'http://127.0.0.1:5001',
      // 'http://192.168.15.5:5173',
      // 'http://localhost:4200',
    ],
    credentials: true,
    exposedHeaders: ['Accesstoken', 'Refreshtoken'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalPipes(new I18nValidationPipe());

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      errorFormatter: extractErrors,
    }),
  );

  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.use((req, res, next) => {
  //   console.log(`Request...`, { req }, { res });
  //   setTimeout(() => {
  //     next();
  //   }, 2000);
  // });
  await app.listen(3000);
}

bootstrap();
