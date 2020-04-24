const router = require('koa-router')()
const genValidator = require('../../middlewares/validate')
const userValidate = require('../../validator/user')
const { login, register, auth } = require('../../controller/user')
const jwtKoa = require('koa-jwt')
const { security } = require('../../config/scretkey')

router.prefix('/api/user')

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  ctx.body = await login({ username, password })
})

router.post('/register', genValidator(userValidate), async (ctx) => {
  const { username, password, nickname, phone } = ctx.request.body
  ctx.body = await register({ username, password, nickname, phone })
})

/**
 * 验证身份，获取用户信息
 */
router.get(
  '/auth',
  jwtKoa({ secret: security.secretKey, key: 'auth' }),
  async (ctx) => {
    ctx.body = await auth(ctx.state.auth.id)
  }
)

module.exports = router
