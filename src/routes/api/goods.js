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
  getGoodsCategoryInfo,
  getGoodsCategoryAll,
  getGoodsByKeyWords,
  addCollect,
  findCollect,
  createReviews,
  findReviewsByGoods,
} = require('../../controller/goods')
const Auth = require('../../middlewares/authority')

router.prefix('/api/goods')

// admin
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

// admin
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

router.get('/detail/:id', async (ctx) => {
  const { id } = ctx.params
  ctx.body = await getGoodsDetail(id)
})

//查询所有分类
router.get('/category/all', async (ctx) => {
  ctx.body = await getGoodsCategoryAll()
})

// 查询特定分类的商品
router.get('/category/info/:id', async (ctx) => {
  let { id } = ctx.params
  id = parseInt(id)

  ctx.body = await getGoodsCategoryInfo(id)
})

// 根据关键字查询特定的商品
router.get('/search', async (ctx) => {
  const { key } = ctx.query
  ctx.body = await getGoodsByKeyWords(key)
})

router.post('/collect', async (ctx) => {
  const { user_id, goods_id, collect } = ctx.request.body
  ctx.body = await addCollect({ user_id, goods_id, collect })
})

router.get('/getcollect', async (ctx) => {
  ctx.body = await findCollect({ user_id: ctx.state.auth.uid })
})

// admin
router.post('/delete', new Auth(9).check(), async (ctx) => {
  ctx.body = await deleteGoods(ctx.request.body.id)
})

// 商品评价
router.post('/reviews/create', async (ctx) => {
  const { goods_id, grade, content, picture, type } = ctx.request.body
  ctx.body = await createReviews({
    goods_id,
    grade,
    content,
    picture,
    type,
    user_id: ctx.state.auth.uid,
  })
})

router.get('/reviews/find/:goods_id', async (ctx) => {
  const goods_id = ctx.params.goods_id
  ctx.body = await findReviewsByGoods(goods_id)
})

module.exports = router
