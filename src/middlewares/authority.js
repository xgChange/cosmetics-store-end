/**
 * @description 设置权限
 */
const {
  ForbiddenException,
  AuthFailedException,
} = require('../core/http-exception')
const { forbiddenMsg, AuthFailed } = require('../model/errInfo')

class Auth {
  constructor(level) {
    this.level = level // 设置这个路由的权限
  }

  check() {
    return async (ctx, next) => {
      if (ctx.state.auth) {
        const { scope } = ctx.state.auth
        if (scope < this.level) {
          throw new ForbiddenException(forbiddenMsg)
        }
        await next()
      } else {
        throw new AuthFailedException(AuthFailed)
      }
    }
  }

  checkToken() {
    return async (ctx, next) => {
      if (!ctx.state.auth) {
        throw new AuthFailedException(AuthFailed)
      }
      next()
    }
  }
}

module.exports = Auth
