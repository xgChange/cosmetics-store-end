/**
 * @description 处理异常的中间件
 */
const { HttpException } = require('../core/http-exception')
const { ErrorModel } = require('../model/resModel')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof HttpException) {
      const { code } = err.message
      ctx.body = new ErrorModel(err.message)
      ctx.response.status = code
    } else if (err.status && err.message) {
      const { status, message } = err
      ctx.body = {
        message,
      }
      ctx.response.status = status
    } else {
      ctx.body = {
        message: '未知错误',
      }
      ctx.response.status = 500
    }
  }
}

module.exports = catchError
