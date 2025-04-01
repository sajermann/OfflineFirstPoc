import { BaseEntity } from 'src/shared/entities/base.entitiy';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'Log' })
export class LogEntity extends BaseEntity {
  @Column('text')
  message: string;

  @Column('text')
  type: string;

  @Column('text')
  context: string;

  @Column('text', { nullable: true })
  whoListen: string;

  @Column('text', { nullable: true })
  data: string;
}
