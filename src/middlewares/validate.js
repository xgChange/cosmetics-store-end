/**
 * @description 处理数据校验的 中间件
 */

const { jsonSchemaFileInfo } = require('../model/errInfo')
const { ParameterException } = require('../core/http-exception')

function genValidator(func) {
  return async (ctx, next) => {
    const data = ctx.request.body
    const err = func(data)

    if (err) {
      jsonSchemaFileInfo.message = `字段 ${err.dataPath} ${err.message}`
      throw new ParameterException(jsonSchemaFileInfo)
    }

    await next()
  }
}

module.exports = genValidator
