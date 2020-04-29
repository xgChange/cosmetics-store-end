/**
 * @description 用户和商品的关系表
 */

const Sequelize = require('sequelize')

const seq = require('../seq')

const Collect = seq.define('t_collect', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  goods_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '商品id',
  },
  collect: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '是否收藏(0否 1是)',
  },
})

module.exports = Collect
