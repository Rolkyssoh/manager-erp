import { IsOptional } from 'class-validator';
import {
  Column,
  Entity
} from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity('article')
export class ArticleEntity extends AbstractEntity {
  static newArticle() {
    return new ArticleEntity();
  }


  @Column({default:false})
  @IsOptional()
  another:boolean;


}
