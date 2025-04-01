import { BaseEntity } from 'src/shared/entities/base.entitiy';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity extends BaseEntity {
  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column()
  role: string;
}
