/**
 * @description goods下的api
 */

const router = require('koa-router')()
const genValidator = require('../../middlewares/validate')
const goodsValidate = require('../../validator/goods')
const {
  addGoods,
  deleteGoods,
  updateGoods,
  getGoodsDetail,
} = require('../../controller/goods')
const Auth = require('../../middlewares/authority')

router.prefix('/api/goods')

router.post(
  '/create',
  new Auth(9).check(),
  genValidator(goodsValidate),
  async (ctx) => {
    const {
      name,
      title,
      poster,
      picture,
      price,
      type_id,
      detail,
    } = ctx.request.body
    ctx.body = await addGoods({
      name,
      title,
      poster,
      picture,
      price,
      type_id,
      detail,
    })
  }
)

router.patch(
  '/update',
  new Auth(9).check(),
  genValidator(goodsValidate),
  async (ctx) => {
    const {
      id,
      name,
      title,
      poster,
      picture,
      price,
      type_id,
      detail,
    } = ctx.request.body
    ctx.body = await updateGoods(
      { name, title, poster, picture, price, type_id, detail },
      id
    )
  }
)

/**
 * @description 获取商品详情
 */
router.get('/detail/:id', async (ctx) => {
  const { id } = ctx.params
  ctx.body = await getGoodsDetail(id)
})

/**
 * @description 管理员删除商品
 */
router.post('/delete', new Auth(9).check(), async (ctx) => {
  ctx.body = await deleteGoods(ctx.request.body.id)
})

module.exports = router
