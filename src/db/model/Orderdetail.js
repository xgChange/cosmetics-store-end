/**
 * @description 订单详情表
 */

const Sequelize = require('sequelize')

const seq = require('../seq')

const OrderDetail = seq.define('t_ordertetail', {
  name_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '订单编号',
  },
  goods_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '商品id',
  },
  goodscount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '商品数量',
  },
  goodsDetail: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '商品详情',
  },
  address_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '地址',
  },
})

module.exports = OrderDetail
