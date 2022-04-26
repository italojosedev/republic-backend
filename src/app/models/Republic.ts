import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import {
  User
} from './index';

@Entity({ name: 'Republics' })
export class Republic {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    name: 'description',
  })
  description: string;

  @Column('boolean', {
    name: 'actived',
    default: true,
  })
  actived?: boolean;

  @OneToMany(() => User, user => user.republic)
  users: User[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

}
