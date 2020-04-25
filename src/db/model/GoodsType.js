/**
 * @description 商品分类表
 */

const Sequelize = require('sequelize')

const seq = require('../seq')

// Goods
const GoodsType = seq.define('t_type', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '分类名称',
  },
  parent_id: {
    type: Sequelize.INTEGER,
    comment: '父级id',
  },
})

module.exports = GoodsType
