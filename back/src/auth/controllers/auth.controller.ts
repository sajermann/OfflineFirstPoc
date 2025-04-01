import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorManager } from 'src/shared/utils/error-manager';
import { TranslationService } from 'src/translation/service/translation.service';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/login-request.model';
import { UpdatePasswordRequest } from '../models/update-password-request.model';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { CodeGithubRequest } from '../models/code-github-request';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly translationService: TranslationService,
  ) {}

  @Post()
  async login(@Body() data: LoginRequest, @Res() response: Response) {
    try {
      const result = await this.authService.login(data);
      response.send(result);
    } catch (e) {
      ErrorManager.exec(e, this.translationService);
    }
  }

  @UseGuards(AuthGuard)
  @Put('update-password')
  @HttpCode(204)
  async updatePassord(
    @Body() data: UpdatePasswordRequest,
    @Res() response: Response,
  ) {
    try {
      const result = await this.authService.updatePassword(data);
      response.send(result);
    } catch (e) {
      ErrorManager.exec(e, this.translationService);
    }
  }
}
