/**
 * @description mysql和redis的配置
 */

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '978489520',
  database: 'cosmetics_store_db',
}

// 生产环境下
if (global.Env) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  }
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '978489520',
    database: 'cosmetics_store_db',
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
}
