import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '..';
import { IRole } from './user/Role';

@Entity('role')
export class RoleEntity implements IRole {
  static newRole(id: number) {
    const role = new RoleEntity();
    role.id = id;
    return role;
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @OneToMany('UserEntity', 'role')
  users: UserEntity[];
}
