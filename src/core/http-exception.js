/**
 * @description http错误信息
 */

class HttpException extends Error {
  constructor(msg = '服务器异常', errCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errCode = errCode
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor() {
    super('参数错误', 10001, 400)
  }
}

class NotFoundException extends HttpException {
  constructor() {
    super('资源未找到', 10002, 404)
  }
}

class AuthFailedException extends HttpException {
  constructor() {
    super('授权失败', 10003, 401)
  }
}

class ForbiddenException extends HttpException {
  constructor() {
    super('forbidden 权限不够', 10004, 403)
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFoundException,
  AuthFailedException,
  ForbiddenException,
}
