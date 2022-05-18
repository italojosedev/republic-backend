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
import { compare, hash } from 'bcrypt';

import {
  Republic
} from './index';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'email',
  })
  email: string;

  @Column({
    name: 'password',
    select: false,
  })
  password: string;

  @Column('varchar', {
    name: 'first_name',
  })
  firstName: string;

  @Column('varchar', {
    name: 'last_name',
  })
  lastName: string;

  @Column('varchar', {
    name: 'profile_image',
    nullable: true,
  })
  profileImage?: string;


  @Column('varchar', {
    name: 'phone',
    nullable: true,
  })
  phone?: string;

  @Column('boolean', {
    name: 'validatedEmail',
    default: false,
  })
  validatedEmail?: boolean;

  @Column('boolean', {
    name: 'isAdmin',
    default: false,
  })
  isAdmin?: boolean;
  @Column('boolean', {
    name: 'isActived',
    default: true,
  })
  isActived?: boolean;

  @ManyToOne(() => Republic, republic => republic.users)
  republic: number ;

  @Column('int', {
    name: 'code',
    nullable: true,
    select: false,
  })
  code?: number | null;

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

  @BeforeInsert()
  async hashPassword(password?: string): Promise<string> {
    if (password) return hash(password, 10);
    this.password = await hash(this.password, 10);
    return this.password;
  }

  comparePassword(password: string) {
    return compare(password, this.password);
  }
}
