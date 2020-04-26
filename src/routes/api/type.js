/**
 * @description 商品类型接口
 */

const router = require('koa-router')()
const { createGoodsType } = require('../../controller/type')
const Auth = require('../../middlewares/authority')

router.prefix('/api/type')

// admin
router.post('/create', new Auth(9).check(), async (ctx) => {
  const { typeInfo } = ctx.request.body
  ctx.body = await createGoodsType(typeInfo)
})

module.exports = router
