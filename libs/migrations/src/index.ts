import { baseEntities1633805726014 } from './lib/1633805726014-base-entities'
import { articleEntity1633808461514 } from './lib/1633808461514-article-entity'
import { userUpdate1633809102002 } from './lib/1633809102002-user-update'
import { seed1617183492380 } from './lib/1617183492380-seed'

export const MIGRATIONS = [
  seed1617183492380,
  baseEntities1633805726014,
  articleEntity1633808461514,
  userUpdate1633809102002,
]
