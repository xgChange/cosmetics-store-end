/**
 * @description 支付相关的api
 */
const router = require('koa-router')()
const {
  createOrder,
  findOrderByType,
  updateOrder,
} = require('../../controller/apply')

router.prefix('/api/order')

router.post('/create', async (ctx) => {
  const {
    id: goods_id,
    color,
    count,
    price,
    addressInfo,
    cancel,
  } = ctx.request.body
  const orderInfo = {
    goods_id,
    goodsDetail: {
      color,
    },
    goodscount: count,
    address_id: addressInfo.id,
    from_user: ctx.state.auth.uid,
    cost: count * price,
  }
  ctx.body = await createOrder(orderInfo, cancel)
})

router.get('/select/:type', async (ctx) => {
  const { type } = ctx.params
  ctx.body = await findOrderByType(type, ctx.state.auth.uid)
})

router.patch('/update/order', async (ctx) => {
  const { id: orderId, apply_status, status } = ctx.request.body
  ctx.body = await updateOrder({ orderId, apply_status, status })
})
module.exports = router
