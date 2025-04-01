import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { ProductionInfoEntity } from '../entities/production-info.entity';

@Injectable()
export class ProductionInfoRepository {
  constructor(
    @InjectRepository(ProductionInfoEntity)
    private productionInfoRepository: Repository<ProductionInfoEntity>,
  ) {}

  async create(productionInfoToCreate: DeepPartial<ProductionInfoEntity>) {
    try {
      return await this.productionInfoRepository.save(
        this.productionInfoRepository.create(productionInfoToCreate),
      );
    } catch (e) {
      console.error({ e });
      return null;
    }
  }

  async createMany(
    productionsInfosToCreate: DeepPartial<ProductionInfoEntity>[],
  ) {
    try {
      return await this.productionInfoRepository.save(
        await this.productionInfoRepository.create(productionsInfosToCreate),
      );
    } catch (e) {
      console.error({ e });
      return null;
    }
  }

  async find(options?: FindManyOptions<ProductionInfoEntity>) {
    try {
      return await this.productionInfoRepository.find(options);
    } catch (e) {
      console.log({ e });
      return [];
    }
  }
}
