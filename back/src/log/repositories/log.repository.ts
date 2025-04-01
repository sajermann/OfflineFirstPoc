import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { LogEntity } from '../entities/log.entity';

@Injectable()
export class LogRepository {
  constructor(
    @InjectRepository(LogEntity)
    private logRepository: Repository<LogEntity>,
  ) {}

  async create(dataToCreate: DeepPartial<LogEntity>) {
    try {
      return await this.logRepository.save(
        await this.logRepository.create({
          ...dataToCreate,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        }),
      );
    } catch (e) {
      console.error({ e });
      return null;
    }
  }

  async findAndCount(options?: FindManyOptions<LogEntity>) {
    try {
      return await this.logRepository.findAndCount(options);
    } catch (e) {
      console.log({ e });
      return [];
    }
  }
}
