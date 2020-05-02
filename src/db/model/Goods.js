/**
 * @description 商品模型
 */
const Sequelize = require('sequelize')

const seq = require('../seq')

// Goods
const Goods = seq.define('t_goods', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '商品名称',
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '商品标题',
  },
  poster: {
    type: Sequelize.STRING,
    comment: '商品海报',
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '商品介绍图片',
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '商品价格',
  },
  type_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '商品类型',
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '商品详情属性',
  },
})

module.exports = Goods
