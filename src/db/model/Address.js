/**
 * @description 地址表
 */
const Sequelize = require('sequelize')

const seq = require('../seq')

// users
const Address = seq.define('t_address', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '收件人',
  },
  tel: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '收件人手机号码',
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '地址',
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '用户id',
  },
})

module.exports = Address
