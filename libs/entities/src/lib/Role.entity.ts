import {
  Entity, Column,
  PrimaryGeneratedColumn, BaseEntity,
} from 'typeorm';
// import { UserEntity } from '..';

@Entity('role')
export class RoleEntity {
  static newRole(id: number) {
    const role = new RoleEntity();
    role.id = id;
    return role;
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  // @JoinTable()
  // @OneToMany('UserEntity', 'roles')
  // users: UserEntity[];
}
