import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from '../..';
import { AbstractEntity } from '../abstract-entity';
import { ICompany } from './Company';

@Entity('company')
export class CompanyEntity extends AbstractEntity implements ICompany {
  static newCompanyEntity(PartialCompany: Partial<CompanyEntity>) {
    const company = new CompanyEntity();
    if (PartialCompany.company_name) company.company_name = PartialCompany.company_name;
    if (PartialCompany.company_phone_number) company.company_phone_number = PartialCompany.company_phone_number;
    if (PartialCompany.company_address) company.company_address = PartialCompany.company_address;
    return company;
  }

  @Column({ nullable: false, unique: true })
  company_name: string;

  @Column({ nullable: false, unique: true })
  company_phone_number: number;

  @Column({ nullable: false })
  company_address: string;

  @OneToMany('UserEntity', 'company')
  users: UserEntity[];
}
