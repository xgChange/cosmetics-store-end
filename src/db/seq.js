/**
 * @description sequelize的实例
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')

const conf = {
  host: 'localhost',
  dialect: 'mysql',
}

// 在判断线上环境是否需要连接池

const seq = new Sequelize(
  MYSQL_CONF.database,
  MYSQL_CONF.user,
  MYSQL_CONF.password,
  conf
)

module.exports = seq
