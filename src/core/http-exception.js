/**
 * @description http错误信息
 */

class HttpException extends Error {
  constructor(message = '服务器异常', errCode = 10000, code = 400) {
    super()
    this.message = message
    this.errCode = errCode
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor({ message = '参数错误', errCode, code = 400 }) {
    super({ message, errCode, code })
  }
}

class NotFoundException extends HttpException {
  constructor({ message = '资源未找到', errCode, code = 404 }) {
    super({ message, errCode, code })
  }
}

class AuthFailedException extends HttpException {
  constructor({ message = '未授权', errCode, code = 401 }) {
    super({ message, errCode, code })
  }
}

class ForbiddenException extends HttpException {
  constructor({ message = 'forbidden 禁止访问', errCode, code = 403 }) {
    super({ message, errCode, code })
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFoundException,
  AuthFailedException,
  ForbiddenException,
}
