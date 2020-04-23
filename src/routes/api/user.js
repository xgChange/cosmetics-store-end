const router = require('koa-router')()

router.prefix('/api/user')

router.get('/login', async (ctx) => {
  ctx.body = '登陆接口'
})

module.exports = router
