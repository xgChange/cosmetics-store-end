const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async (ctx) => {
  ctx.body = '登陆接口'
})

router.post('/register', async (ctx) => {
  const { username, password, nickname, phone } = ctx.request.body
  // console.log(username, password)
  throw new Error('fffaaa')
  ctx.body = 'ff'
})

module.exports = router
