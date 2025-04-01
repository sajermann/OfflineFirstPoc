import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(dataToCreate: DeepPartial<UserEntity>) {
    const date = new Date().getTime();
    try {
      return await this.usersRepository.save(
        await this.usersRepository.create({
          ...dataToCreate,
          createdAt: date,
          updatedAt: date,
        }),
      );
    } catch (e) {
      console.error({ e });
      return null;
    }
  }

  async findOne(options?: FindOneOptions<UserEntity>) {
    try {
      return await this.usersRepository.findOne(options);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }

  async findAndCount(options?: FindManyOptions<UserEntity>) {
    try {
      return await this.usersRepository.findAndCount(options);
    } catch (e) {
      console.log({ e });
      return [];
    }
  }

  async save(dataToUpdate: DeepPartial<UserEntity>) {
    try {
      return await this.usersRepository.save(dataToUpdate);
    } catch (e) {
      console.log({ e });
      return null;
    }
  }
}
