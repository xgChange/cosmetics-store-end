/**
 * @description 用户数据模型
 */
const Sequelize = require('sequelize')

const seq = require('../seq')

// users
const User = seq.define('t_user', {
  username: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
    comment: '用户名 唯一',
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '密码',
  },
  nickname: {
    type: Sequelize.STRING(20),
    allowNull: false,
    comment: '昵称',
  },
  phone: {
    type: Sequelize.STRING(11),
    allowNull: false,
    comment: '手机号码',
  },
  picture: {
    type: Sequelize.STRING,
    comment: '头像，图片地址',
  },
  address: {
    type: Sequelize.STRING,
    comment: '城市',
  },
  role: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 1,
    comment: '用户身份权限',
  },
})

module.exports = User
