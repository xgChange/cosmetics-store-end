/**
 * @description 支付相关
 */
const {
  createOrderDetailInfo,
  createOrderInfo,
  findOrderInfoByType,
  updateOrderInfo,
} = require('../servers/apply')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { createOrderFailed, updateOrderFailed } = require('../model/errInfo')

async function createOrder(
  { goods_id, goodsDetail, goodscount, address_id, from_user, cost },
  cancel
) {
  try {
    const name_id = Date.now() + from_user
    const result = await createOrderDetailInfo({
      goods_id,
      goodsDetail,
      goodscount,
      address_id,
      name_id,
    })

    let order_id = result.dataValues.name_id // 获取订单编号

    status = '待发货'
    apply_status = '已支付'
    if (cancel) {
      ;(status = '待付款'), (apply_status = '未支付')
    }
    const orderInfo = await createOrderInfo({
      order_id,
      status,
      apply_status,
      from_user,
      cost,
    })
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(createOrderFailed)
  }
}

async function findOrderByType(type, from_user) {
  const result = await findOrderInfoByType(type, from_user)
  return new SuccessModel(result)
}

async function updateOrder({ orderId, apply_status, status }) {
  const result = await updateOrderInfo({ orderId, apply_status, status })
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(updateOrderFailed)
}

module.exports = {
  createOrder,
  findOrderByType,
  updateOrder,
}
