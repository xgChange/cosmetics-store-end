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
const Cors = require('koa2-cors')

onerror(app)

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(json())
app.use(logger())
app.use(KoaStatic(__dirname + '/src/public/dist')) // public下的文件当做静态资源来访问
app.use(KoaStatic(path.join(__dirname, '..', 'uploadFiles')))

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

app.use(
  Cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
      return '*'
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
  })
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
