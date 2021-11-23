import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
import { classToPlain } from 'class-transformer';
import { IsOptional } from 'class-validator';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ default: false })
  @IsOptional()
  disabled: boolean;

  @DeleteDateColumn()
  deleted_at?: Date;

  toJSON(): any {
    return classToPlain(this);
  }
}
