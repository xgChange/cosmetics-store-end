const router = require('koa-router')()
const genValidator = require('../../middlewares/validate')
const userValidate = require('../../validator/user')
const {
  login,
  register,
  auth,
  changeInfo,
  createAddress,
  updateAddress,
} = require('../../controller/user')

router.prefix('/api/user')

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  ctx.body = await login({ username, password })
})

router.post('/register', genValidator(userValidate), async (ctx) => {
  const { username, password, nickname, phone, picture } = ctx.request.body
  ctx.body = await register({ username, password, nickname, phone, picture })
})

/**
 * 验证身份，获取用户信息
 */
router.get('/auth', async (ctx) => {
  ctx.body = await auth(ctx.state.auth.uid)
})

router.patch('/changeInfo', genValidator(userValidate), async (ctx) => {
  const { nickname, phone, picture, address } = ctx.request.body
  ctx.body = await changeInfo(
    {
      nickname,
      phone,
      picture,
      address,
    },
    ctx.state.auth.uid
  )
})

router.post('/address/create', async (ctx) => {
  const { name, tel, address } = ctx.request.body
  ctx.body = await createAddress({ name, tel, address }, ctx.state.auth.uid)
})

router.patch('/address/update', async (ctx) => {
  const { name, tel, address, id } = ctx.request.body
  ctx.body = await updateAddress({ name, tel, address, id })
})
module.exports = router
