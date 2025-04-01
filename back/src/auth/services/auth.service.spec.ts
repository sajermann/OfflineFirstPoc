import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ContextIdFactory } from '@nestjs/core';
import { hash } from '../utils/cryptography/hash';

const contextId = ContextIdFactory.create();

describe('AuthService', () => {
  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  let service: Promise<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();
    service = module.resolve<AuthService>(AuthService, contextId);
  });

  it('should test login and validateUser with success', async () => {
    jest
      .spyOn(ContextIdFactory, 'getByRequest')
      .mockImplementation(() => contextId);

    mockUserRepository.findOne.mockImplementation(async () => {
      return { password: await hash('12', 5) };
    });

    mockConfigService.get.mockImplementation((data: string) => {
      return `mocked ${data}`;
    });

    jest.spyOn(await service, 'issueTokens').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({ accessToken: 'test_access', refreshToken: 'test_refresh' });
      });
    });

    const result = await (
      await service
    ).login({
      email: 'email@test.com',
      password: '12',
    });
    expect(result).toEqual({
      access_token: 'test_access',
      refresh_token: 'test_refresh',
    });
  });

  it('should test login and validateUser with fail', async () => {
    jest
      .spyOn(ContextIdFactory, 'getByRequest')
      .mockImplementation(() => contextId);

    mockUserRepository.findOne.mockImplementation(async () => {
      return null;
    });

    expect(
      async () =>
        await (
          await service
        ).login({
          email: 'email@test.com',
          password: '12',
        }),
    ).rejects.toThrow();
  });

  it('should test login and issueTokens', async () => {
    jest
      .spyOn(ContextIdFactory, 'getByRequest')
      .mockImplementation(() => contextId);

    mockUserRepository.findOne.mockImplementation(async () => {
      return { password: await hash('12', 5) };
    });

    mockJwtService.sign.mockImplementation(() => {
      return 'test_jtw';
    });

    mockConfigService.get.mockImplementation((data: string) => {
      return `mocked ${data}`;
    });

    const result = await (
      await service
    ).issueTokens({
      email: 'email@test.com',
      name: 'test',
      id: '',
      role: '',
    });
    expect(result).toEqual({
      accessToken: 'test_jtw',
      refreshToken: 'test_jtw',
    });
  });

  it('should test get/set user from request', async () => {
    const userSet = {
      name: 'Test 1',
      email: 'test1@gmail.com',
      sub: 'test-id',
      roles: ['admin'],
    };
    const userGet = {
      name: 'Test 1',
      email: 'test1@gmail.com',
      id: 'test-id',
      roles: ['admin'],
    };
    await (await service).setUserRequest(userSet);
    const result = await (await service).getUserRequest();
    expect(result).toEqual(userGet);
  });
});
