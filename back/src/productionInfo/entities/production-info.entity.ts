import { BaseEntity } from 'src/shared/entities/base.entitiy';
import { config } from 'src/shared/utils/date-column-params-type-orm';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'ProductionInfo' })
export class ProductionInfoEntity extends BaseEntity {
  @Column('text')
  name: string;
  @Column('text')
  favoriteFood: string;
  @Column(config as any)
  syncAt: number;
}
