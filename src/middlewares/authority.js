/**
 * @description 设置权限
 */
const { ForbiddenException } = require('../core/http-exception')
const { forbiddenMsg } = require('../model/errInfo')

class Auth {
  constructor(level) {
    this.level = level // 设置这个路由的权限
  }

  check() {
    return async (ctx, next) => {
      const { scope } = ctx.state.auth
      if (scope < this.level) {
        throw new ForbiddenException(forbiddenMsg)
      }

      await next()
    }
  }
}

module.exports = Auth
