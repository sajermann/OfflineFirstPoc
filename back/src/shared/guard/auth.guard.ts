import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { matchRoles } from '../utils/matchRoles';
import { extractTokensFromHeader } from '../utils/extract-tokens-from-header';
import { AuthService } from 'src/auth/services/auth.service';
import { Roles } from '../decorator/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { token, refresh_token } = extractTokensFromHeader(request);

    // console.log({ request: request.headers, token, refresh_token });

    if (!token || !refresh_token) {
      throw new UnauthorizedException();
    }

    const payload = await this.matchBearerToken(token, refresh_token);
    request['user'] = payload;
    this.authService.setUserRequest(payload);

    if (payload.headers) {
      response.set({
        ...payload.headers,
      });
    }

    const allowRoles = this.reflector.get(Roles, context.getHandler());
    return matchRoles(allowRoles, payload.roles);
  }

  private async matchBearerToken(token: string, refresh_token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });
      return payload;
    } catch (e) {
      console.log({ e });
      if (e.message === 'jwt expired') {
        const payload = await this.matchRefreshToken(refresh_token);
        return payload;
      }
      throw new UnauthorizedException();
    }
  }

  private async matchRefreshToken(refresh_token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });

      const { accessToken, refreshToken } = await this.authService.issueTokens({
        id: payload.sub,
        username: payload.username,
        role: payload.roles.join(''),
      });

      return {
        ...payload,
        headers: {
          accessToken,
          refreshToken,
        },
      };
    } catch (e) {
      console.log('matchRefreshToken', e);
      throw new UnauthorizedException();
    }
  }
}
