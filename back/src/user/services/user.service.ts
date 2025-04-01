import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { cryptography } from 'src/auth/utils/cryptography';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../entities/user.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async findOne(options?: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findOne(options);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async seedAdminUser() {
    const adminUsername = 'admin';
    const existingAdmin = await this.findOne({
      where: {
        username: adminUsername,
      },
    });

    if (existingAdmin) {
      console.log('User admin already exists. Skipping seeding.');
      return;
    }
    await this.userRepository.create({
      id: crypto.randomUUID(),
      username: adminUsername,
      password: await cryptography.hash(adminUsername),
      role: 'admin',
    });
    console.log('User admin seeded successfully.');
  }
}
