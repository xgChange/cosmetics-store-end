/**
 * @description 商品类型接口
 */

const router = require('koa-router')()
const { createGoodsType } = require('../../controller/type')
const Auth = require('../../middlewares/authority')

router.prefix('/api/type')

router.post('/create', new Auth(9).check(), async (ctx) => {
  const { name } = ctx.request.body
  ctx.body = await createGoodsType(name)
})

module.exports = router
