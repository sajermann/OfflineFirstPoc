import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from 'src/user/repositories/user.repository';
import { cryptography } from '../utils/cryptography';
import { TUser } from '../models/user.model';

import { WrongCredentials } from 'src/shared/errors/WrongCredentials';
import { LoginRequest } from '../models/login-request.model';
import { UpdatePasswordRequest } from '../models/update-password-request.model';
import { EGenericError } from '../../shared/enums/error.enum';

import { CodeGithubRequest } from '../models/code-github-request';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  private userRequest?: {
    id: string;
    name: string;
    email: string;
    roles: string[];
  };

  getUserRequest() {
    return this.userRequest;
  }

  setUserRequest(user: {
    name: string;
    email: string;
    sub: string;
    roles: string[];
  }) {
    this.userRequest = {
      id: user.sub,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
  }

  private async validateUser(data: LoginRequest) {
    const user = await this.userRepository.findOne({
      where: {
        username: data.username,
      },
    });

    if (!user || !(await cryptography.compare(data.password, user.password))) {
      throw new WrongCredentials();
    }
    return user;
  }

  async issueTokens(user: Pick<TUser, 'username' | 'role'> & {id: string}) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: [user.role],
    };

    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '60sec',
      },
    );

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async login(data: LoginRequest) {
    const user = await this.validateUser(data);
    const { accessToken, refreshToken } = await this.issueTokens(user);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updatePassword(data: UpdatePasswordRequest) {
    console.log({ data, user: this.getUserRequest() });
    const user = await this.userRepository.findOne({
      where: {
        id: this.getUserRequest().id,
      },
    });

    const passwordCurrentIsOk = await cryptography.compare(
      data.currentPassword,
      user.password,
    );

    if (!passwordCurrentIsOk) {
      throw new Error(EGenericError.CURRENT_PASSWORD_INVALID);
    }

    const hasNewPassword = await cryptography.hash(data.newPassword);

    user.password = await cryptography.hash(data.newPassword);
    user.updatedAt = new Date().getTime();
    await this.userRepository.save(user);
    console.log({ passwordCurrentIsOk, hasNewPassword });
  }

}
