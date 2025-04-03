import { Injectable } from '@nestjs/common';

import { DeepPartial } from 'typeorm';
import { ProductionInfoRepository } from '../repositories/production-info.repository';
import { ProductionInfoEntity } from '../entities/production-info.entity';
import { LogService } from 'src/log/services/log.service';
import { EGenericError } from 'src/shared/enums/error.enum';

@Injectable()
export class ProductionInfoService {
  constructor(
    private productionInfoRepository: ProductionInfoRepository,
    private logService: LogService,
  ) {}

  async find() {
    const result = await this.productionInfoRepository.find({
      where: { isActive: true },
      order: { syncAt: 'DESC' },
    });
    console.log({ result });
    return result;
  }

  async create(productionInfoToCreate: DeepPartial<ProductionInfoEntity>) {
    const exist = await this.productionInfoRepository.find({
      where: { id: productionInfoToCreate.id },
    });
    if (exist.length) {
      throw new Error(EGenericError.ID_EXISTS);
    }

    return await this.productionInfoRepository.create({
      ...productionInfoToCreate,
      // createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      syncAt: new Date().getTime(),
    });
  }

  async createMany(
    productionsInfosToCreate: DeepPartial<ProductionInfoEntity>[],
  ) {
    const toSave: DeepPartial<ProductionInfoEntity>[] = [];
    for (const item of productionsInfosToCreate) {
      const exist = await this.productionInfoRepository.find({
        where: { id: item.id },
      });

      if (!exist.length) {
        toSave.push({
          ...item,
          createdAt: new Date(item.createdAt).getTime(),
          updatedAt: new Date().getTime(),
          syncAt: new Date().getTime(),
        });
      }
    }

    if (!toSave.length) {
      throw new Error(EGenericError.ID_EXISTS);
    }

    return (await this.productionInfoRepository.createMany(toSave))
      .sort((a, b) => {
        return a.syncAt > b.syncAt ? 1 : -1;
      })
      .map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        syncAt: new Date(item.syncAt),
        updatedAt: new Date(item.updatedAt),
      }));
  }
}
