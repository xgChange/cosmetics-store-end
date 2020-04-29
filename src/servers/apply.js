/**
 * @description 支付相关 order
 */
const { Order, OrderDetail, Address, Goods } = require('../db/model/index')
const { getTree } = require('../utils/utils')
var Sequelize = require('sequelize')
var Op = Sequelize.Op

//  插入orderdetail表
async function createOrderDetailInfo({
  goods_id,
  goodsDetail,
  goodscount,
  address_id,
  name_id,
}) {
  const result = await OrderDetail.create({
    goods_id,
    goodsDetail: JSON.stringify(goodsDetail),
    goodscount,
    address_id,
    name_id,
  })
  return result
}

// 插入order主表
async function createOrderInfo({
  order_id,
  status,
  apply_status,
  from_user,
  cost,
}) {
  const result = await Order.create({
    order_id,
    status,
    apply_status,
    from_user,
    cost,
  })
  return result
}

// 根据类型查找 订单
async function findOrderInfoByType(type, from_user) {
  const result = await Order.findAndCountAll({
    where: {
      from_user,
      status: type,
    },
    attributes: ['id', 'order_id', 'status', 'apply_status', 'cost'],
    include: [
      {
        association: Order.belongsTo(OrderDetail, {
          foreignKey: 'order_id',
          targetKey: 'name_id',
        }),
        attributes: ['goods_id', 'goodscount', 'goodsDetail', 'address_id'],
        include: [
          {
            association: OrderDetail.belongsTo(Address, {
              foreignKey: 'address_id',
              targetKey: 'id',
            }),
            attributes: ['name', 'tel', 'address'],
          },
          {
            association: OrderDetail.belongsTo(Goods, {
              foreignKey: 'goods_id',
              targetKey: 'id',
            }),
          },
        ],
      },
    ],
  })
  const info = result.rows.map((item) => {
    let detail = item.dataValues
    detail.t_ordertetail = detail.t_ordertetail.dataValues
    detail.t_ordertetail.t_address = detail.t_ordertetail.t_address.dataValues
    detail.t_ordertetail.t_good = detail.t_ordertetail.t_good.dataValues

    return detail
  })

  return info
}

// 修改Order表状态
async function updateOrderInfo({ orderId, apply_status, status }) {
  const result = await Order.update(
    {
      apply_status,
      status,
    },
    {
      where: {
        order_id: orderId,
      },
    }
  )
  return result[0] > 0
}

module.exports = {
  createOrderDetailInfo,
  createOrderInfo,
  findOrderInfoByType,
  updateOrderInfo,
}
