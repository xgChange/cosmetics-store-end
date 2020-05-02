/**
 * @description 管理员接口
 */

const router = require('koa-router')()
const { login, auth } = require('../../controller/user')
const {
  getAllUsers,
  updateInfo,
  findAllBlog,
  deleteBlog,
  getAllGoods,
  getGoodsType,
  deleteGoodsById,
} = require('../../controller/admin')
const { addGoods, updateGoods } = require('../../controller/goods')
const { createGoodsType } = require('../../controller/type')

const Auth = require('../../middlewares/authority')
const { getTypeInfo } = require('../../servers/type')

router.prefix('/api/admin')

// 登录
router.post('/user/login', async (ctx) => {
  const { username, password } = ctx.request.body
  ctx.body = await login({ username, password })
})

// 验证身份
router.get('/user/auth', async (ctx) => {
  ctx.body = await auth(ctx.state.auth.uid)
})

// 获取所有的用户信息
router.get('/user/getusers/:pageIndex', new Auth(9).check(), async (ctx) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  ctx.body = await getAllUsers({ pageIndex })
})

router.patch('/user/updateInfo', new Auth(9).check(), async (ctx) => {
  const { id: user_id, role } = ctx.request.body

  ctx.body = await updateInfo({ user_id, role })
})

router.get('/blog/findAll/:pageIndex', new Auth(9).check(), async (ctx) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  ctx.body = await findAllBlog({ pageIndex })
})

router.post('/blog/delete', new Auth(9).check(), async (ctx) => {
  const { id } = ctx.request.body
  ctx.body = await deleteBlog(id)
})

router.get('/goods/List/:pageIndex', new Auth(9).check(), async (ctx) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  ctx.body = await getAllGoods({ pageIndex })
})

// 查询goodsType
router.get('/goods/type', new Auth(9).check(), async (ctx) => {
  ctx.body = await getGoodsType()
})

router.post('/goods/new', new Auth(9).check(), async (ctx) => {
  let { name, title, picture, price, detail, type } = ctx.request.body
  let info
  let type_id
  if (type) {
    info = await getTypeInfo(type)
    type_id = info.id
  }
  detail = JSON.stringify(detail)
  ctx.body = await addGoods({ name, title, picture, price, detail, type_id })
})

router.post('/goods/delete', new Auth(9).check(), async (ctx) => {
  const { id } = ctx.request.body
  ctx.body = await deleteGoodsById(id)
})

router.patch('/goods/update', new Auth(9).check(), async (ctx) => {
  let { id, name, title, picture, price, detail, type } = ctx.request.body
  let info
  let type_id
  if (type) {
    info = await getTypeInfo(type)
    type_id = info.id
  }
  detail = JSON.stringify(detail)
  ctx.body = await updateGoods(
    { name, title, picture, price, detail, type_id },
    id
  )
})

router.post('/type/create', new Auth(9).check(), async (ctx) => {
  const { typeInfo } = ctx.request.body
  ctx.body = await createGoodsType(typeInfo)
})

module.exports = router
