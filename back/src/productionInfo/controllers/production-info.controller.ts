import {
  Controller,
  Get,
  Res,
  UseGuards,
  Query,
  Body,
  Post,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorManager } from 'src/shared/utils/error-manager';
import { TranslationService } from 'src/translation/service/translation.service';

import { AuthGuard } from 'src/shared/guard/auth.guard';
import { ProductionInfoService } from '../services/production-info.service';
import { ProjectInfoCreateRequest } from '../models/project-info-create-request.model';

@Controller('api/v1/production-info')
export class ProductionInfoController {
  constructor(
    private readonly productionInfoService: ProductionInfoService,
    private readonly translationService: TranslationService,
  ) {}

  // @UseGuards(AuthGuard)
  // // @Roles(['analyst'])
  @Get('')
  async read(@Res() response: Response) {
    try {
      response.send(await this.productionInfoService.find());
    } catch (e) {
      console.log({ e });
      ErrorManager.exec(e, this.translationService);
    }
  }

  // @UseGuards(AuthGuard)
  // @Roles(['analyst'])
  @Post('create')
  // @HttpCode(204)
  async create(
    @Body() data: ProjectInfoCreateRequest,
    @Res() response: Response,
  ) {
    try {
      response.send(await this.productionInfoService.create(data as any));
    } catch (e) {
      console.log({ e });
      ErrorManager.exec(e, this.translationService);
    }
  }

  // @UseGuards(AuthGuard)
  // @Roles(['analyst'])
  @Post('create-many')
  // @HttpCode(204)
  async createMany(
    @Body() data: ProjectInfoCreateRequest[],
    @Res() response: Response,
  ) {
    try {
      response.send(await this.productionInfoService.createMany(data as any));
    } catch (e) {
      console.log({ e });
      ErrorManager.exec(e, this.translationService);
    }
  }
}
