/**
 * @description 支付相关的api
 */
const router = require('koa-router')()
const {
  createOrder,
  findOrderByType,
  updateOrder,
} = require('../../controller/apply')

const { SuccessModel } = require('../../model/resModel')
const { alipay, formData } = require('../../core/alipay')
const utils = require('util')
const request = require('request')
const getPromise = utils.promisify(request.get)

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
  // const orderId = await createOrder(orderInfo, cancel)

  // formData.setMethod('get')
  // // formData.addField('notifyUrl', 'http://online_serve_url/paycallback') // 回调地址必须为当前服务的线上地址！
  // formData.addField('returnUrl', 'http://localhost:8080/index')
  // formData.addField('notifyUrl', 'http://192.168.43.75/success')
  // formData.addField('bizContent', {
  //   body: '测试商品',
  //   subject: '测试主题',
  //   totalAmount: '0.01',
  //   out_trade_no: orderId,
  //   timeout_express: '90m',
  //   quit_url: 'http://www.taobao.com/product/113714.html',
  //   product_code: 'QUICK_WAP_WAY',
  // })
  // const result = await alipay.exec(
  //   'alipay.trade.wap.pay',
  //   {},
  //   {
  //     formData: formData,
  //     validateSign: true,
  //   }
  // )
  ctx.body = await createOrder(orderInfo, cancel)
})

router.get('/success', async (ctx) => {
  console.log(ctx.request.body)
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
