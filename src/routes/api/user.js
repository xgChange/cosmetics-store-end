const router = require('koa-router')()
const genValidator = require('../../middlewares/validate')
const userValidate = require('../../validator/user')

router.prefix('/api/user')

router.post('/login', async (ctx) => {
  ctx.body = '登陆接口'
})

router.post('/register', genValidator(userValidate), async (ctx) => {
  const { username, password, nickname, phone } = ctx.request.body
  ctx.body = 'jj'
})

module.exports = router
