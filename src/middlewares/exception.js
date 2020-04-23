/**
 * @description 处理异常的中间件
 */

const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log('asdsadadasdsadsadserr')
    if (err instanceof HttpException) {
      ctx.body = {
        msg: err.msg,
        err_code: err.errCode,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.response.status = err.code
    } else {
      ctx.body = {
        msg: '未知错误',
      }
      ctx.response.status = 500
    }
  }
}

module.exports = catchError
