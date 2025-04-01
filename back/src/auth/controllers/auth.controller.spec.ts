import { TestingModule, Test } from '@nestjs/testing';

import { TranslationService } from 'src/translation/service/translation.service';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import { ErrorManager } from 'src/shared/utils/error-manager';

describe('AuthController', () => {
  let authController: AuthController;
  const mockAuthService = {
    login: jest.fn(),
  };
  const mockTranslateService = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: TranslationService,
          useValue: mockTranslateService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should test login with success', async () => {
    // Arrange
    const data = {
      email: 'email_test',
      password: '12',
    };
    const expectedResult = {
      access_token: 'test_access_token',
      refresh_token: 'test_refresh_token',
    };
    const response = {
      send: jest.fn(),
    };

    jest.spyOn(mockAuthService, 'login').mockResolvedValue(expectedResult);

    // Act
    await authController.login(data, response as any);

    // Assert
    expect(mockAuthService.login).toHaveBeenCalledWith(data);
    expect(response.send).toHaveBeenCalledWith(expectedResult);
  });

  it('should test login with fail', async () => {
    const data = {
      email: 'email_test',
      password: '12',
    };
    const error = new Error('Test');

    const response = {
      send: jest.fn(),
    };

    jest.spyOn(mockAuthService, 'login').mockImplementation(() => {
      throw new Error('Test');
    });

    jest.spyOn(ErrorManager, 'exec');

    expect(async () => {
      await authController.login(data, response as any);
    }).rejects.toThrow();

    expect(ErrorManager.exec).toHaveBeenCalledWith(error, mockTranslateService);
  });
});
