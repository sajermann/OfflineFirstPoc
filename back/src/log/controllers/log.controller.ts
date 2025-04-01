import { Controller, Get, Res, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';

import { ErrorManager } from 'src/shared/utils/error-manager';
import { TranslationService } from 'src/translation/service/translation.service';

import { AuthGuard } from 'src/shared/guard/auth.guard';
import { LogService } from '../services/log.service';

@Controller('api/v1/logs')
export class LogController {
  constructor(
    private readonly logService: LogService,
    private readonly translationService: TranslationService,
  ) {}

  @UseGuards(AuthGuard)
  // @Roles(['analyst'])
  @Get('')
  async read(@Query() data: { whoListen: string }, @Res() response: Response) {
    try {
      console.log({ data });
      response.send(await this.logService.read(data));
    } catch (e) {
      console.log({ e });
      ErrorManager.exec(e, this.translationService);
    }
  }
}
