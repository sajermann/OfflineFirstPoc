import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EGenericError } from '../enums/error.enum';
import { TranslationService } from 'src/translation/service/translation.service';

export class ErrorManager {
  static exec(e: Error, translationService: TranslationService) {
    const config = {
      WrongCredentials: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'login',
              errors: [e.message],
            },
          ],
        });
      },
      [EGenericError.UNAUTHORIZED]: () => {
        throw new UnauthorizedException({
          message: [
            {
              property: 'unauthorized',
              errors: [EGenericError.UNAUTHORIZED],
            },
          ],
        });
      },
      [EGenericError.PROJECT_ID_NOT_FOUND]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'id',
              errors: [
                // TODO: Colocar translate nos demais erros
                translationService.translate(
                  EGenericError.PROJECT_ID_NOT_FOUND,
                ),
              ],
            },
          ],
        });
      },
      [EGenericError.TICKET_HAS_ANALYST]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'id',
              errors: [EGenericError.TICKET_HAS_ANALYST],
            },
          ],
        });
      },
      [EGenericError.TICKET_IS_CLOSED]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'id',
              errors: [EGenericError.TICKET_IS_CLOSED],
            },
          ],
        });
      },
      [EGenericError.TICKET_NOT_SIGN]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'id',
              errors: [EGenericError.TICKET_NOT_SIGN],
            },
          ],
        });
      },
      [EGenericError.TICKET_ALREADY_HAS_AN_OWNER]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'ticket',
              errors: [EGenericError.TICKET_ALREADY_HAS_AN_OWNER],
            },
          ],
        });
      },
      [EGenericError.FORBIDDEN]: () => {
        throw new ForbiddenException({
          message: [
            {
              property: '',
              errors: [EGenericError.FORBIDDEN],
            },
          ],
        });
      },
      [EGenericError.NOT_ALLOWED]: () => {
        throw new ForbiddenException({
          message: [
            {
              property: '',
              errors: [EGenericError.NOT_ALLOWED],
            },
          ],
        });
      },
      [EGenericError.ROUTER_NAME_EXISTS]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'name',
              errors: [
                translationService.translate(EGenericError.ROUTER_NAME_EXISTS),
              ],
            },
          ],
        });
      },
      [EGenericError.ROUTER_NAME_NOT_FOUND]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'name',
              errors: [
                translationService.translate(
                  EGenericError.ROUTER_NAME_NOT_FOUND,
                ),
              ],
            },
          ],
        });
      },
      [EGenericError.SERVICE_NAME_EXISTS]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'name',
              errors: [
                translationService.translate(EGenericError.SERVICE_NAME_EXISTS),
              ],
            },
          ],
        });
      },
      [EGenericError.SERVICE_NAME_NOT_FOUND]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'name',
              errors: [
                translationService.translate(
                  EGenericError.SERVICE_NAME_NOT_FOUND,
                ),
              ],
            },
          ],
        });
      },
      [EGenericError.CURRENT_PASSWORD_INVALID]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'passwordCurrent',
              errors: [
                translationService.translate(
                  EGenericError.CURRENT_PASSWORD_INVALID,
                ),
              ],
            },
          ],
        });
      },
      [EGenericError.GITHUB_USER_NOT_FOUND]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'github-user',
              errors: [
                translationService.translate(
                  EGenericError.GITHUB_USER_NOT_FOUND,
                ),
              ],
            },
          ],
        });
      },
      [EGenericError.NO_ACCOUNT_LINKED]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'github-user-no-linked',
              errors: [
                translationService.translate(EGenericError.NO_ACCOUNT_LINKED),
              ],
            },
          ],
        });
      },
      [EGenericError.ID_EXISTS]: () => {
        throw new BadRequestException({
          message: [
            {
              property: 'id',
              errors: [
                translationService.translate(EGenericError.ID_EXISTS),
              ],
            },
          ],
        });
      },
    };
    const exec = config[e.constructor.name] || config[e.message];
    if (exec) {
      exec();
    } else {
      throw new InternalServerErrorException({
        message: [
          {
            property: '',
            errors: [EGenericError.INTERNAL_SERVER_ERROR],
          },
        ],
      });
    }
  }
}
