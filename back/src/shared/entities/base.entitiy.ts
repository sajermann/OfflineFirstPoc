import { Column, PrimaryColumn } from 'typeorm';
import { config } from '../utils/date-column-params-type-orm';

export class BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column(config)
  createdAt: number;

  @Column(config)
  updatedAt: number;

  @Column({ default: true })
  isActive: boolean;
}
