import { ENTITIES } from "@merp/entities";
import {MIGRATIONS} from "@merp/migrations"

export const ORM_CONFIG = {
  type: process.env.DATABASE_ENGINE as 'postgres',
  host: process.env.HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
    entities: ENTITIES,
    migrations: MIGRATIONS,
  synchronize: false,
  logging: Boolean(process.env.ORM_LOGGING),
};
