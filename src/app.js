const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const KoaStatic = require('koa-static')
const logger = require('koa-logger')

const InitManager = require('./core/initRouter')
const CatchError = require('./middlewares/exception')
const Authority = require('./middlewares/authority')
const path = require('path')
const jwtKoa = require('koa-jwt')
const { security, unlessPath } = require('./config/scretkey')

onerror(app)

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(json())
app.use(logger())
app.use(KoaStatic(__dirname + '/src/public/dist')) // public下的文件当做静态资源来访问

// 错误处理
app.use(CatchError)

// jwt
app.use(
  jwtKoa({ secret: security.secretKey, key: 'auth', passthrough: true }).unless(
    {
      path: unlessPath,
    }
  )
)

// app.use(new Authority().checkToken())

// router
InitManager.init(app)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err)
})

module.exports = app
