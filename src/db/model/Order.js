/**
 * @description 订单主表
 */
const Sequelize = require('sequelize')

const seq = require('../seq')

const Order = seq.define('t_order', {
  from_user: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '谁下的单',
  },
  order_id: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '订单编号',
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '订单状态',
  },
  apply_status: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '支付状态',
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '总花费',
  },
})

module.exports = Order
