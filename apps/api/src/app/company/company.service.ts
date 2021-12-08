import { COMMERCIAL_DIRECTOR } from '@merp/constants';
import { CompaniesDtoIn, NewCompanyDto, NewCompanyDtoIn } from '@merp/dto';
import { CompanyEntity, RoleEntity, UserEntity } from '@merp/entities';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private _companyRepo: Repository<CompanyEntity>,
    @InjectRepository(UserEntity)
    private _userRepo: Repository<UserEntity>
  ) { }

  async getCompanies(): Promise<CompaniesDtoIn> {
    const [companies, count] = await this._companyRepo.findAndCount()
    return {
      companies, count
    }
  }

  async newCompany(data: NewCompanyDto, commDirector: UserEntity): Promise<NewCompanyDtoIn> {
    const company = CompanyEntity.newCompanyEntity({
      company_name: data.company_name,
      company_phone_number: data.company_phone_number,
      company_address: data.company_address,
    });

    try {
      await this._companyRepo.save(company);

      const user = UserEntity.newUserEntity({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        role: RoleEntity.newRole(COMMERCIAL_DIRECTOR),
        company,
      });
      const userCreated = await this._userRepo.save(user);
      return { company, user: userCreated };
    } catch (error) {
      // Duplicate company_name or company_phone_number
      if (error.code === '23505') {
        throw new ConflictException(
          'User email, Company name or phone number already exist!'
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getCompanyById(id: string): Promise<CompanyEntity> {
    try {
      const companyFound = await this._companyRepo.findOne(id);
      return companyFound;
    } catch (error) {
      if (error.code === '22P02') {
        throw new InternalServerErrorException(
          `Company with ID "${id}" not found!`
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateCompany(id: string, data: NewCompanyDto): Promise<CompanyEntity> {
    const company = await this.getCompanyById(id);
    company.company_name = data.company_name;
    company.company_phone_number = data.company_phone_number;
    company.company_address = data.company_address;

    try {
      return this._companyRepo.save(company);
    } catch (error) {
      // Duplicate company_name or company_phone_number
      if (error.code === '23505') {
        throw new ConflictException(
          'Company name or phone number already exist!'
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteCompany(id: string) {
    const company = await this.getCompanyById(id);
    this._companyRepo.softDelete(id);
    return company;
  }

  async disableCompany(id: string) {
    const company = await this.getCompanyById(id);
    console.log('the company to disable:', company);
    company.disabled = true;
    return this._companyRepo.save(company);
  }

  async enableCompany(id: string) {
    const company = await this.getCompanyById(id);
    company.disabled = false;
    return this._companyRepo.save(company);
  }
}
