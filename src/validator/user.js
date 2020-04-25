/**
 * @description user 数据格式校验
 */

const validate = require('./_validate')

const SCHEMA = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 6,
    },
    newpassword: {
      type: 'string',
      maxLength: 255,
      minLength: 6,
    },
    nickname: {
      type: 'string',
      minLength: 2,
      maxLength: 255,
    },
    picture: {
      type: 'string',
      maxLength: 255,
    },
    phone: {
      type: 'string',
      maxLength: 11,
    },
    address: {
      type: 'string',
      maxLength: 255,
    },
    role: {
      type: 'number',
      maximum: 9,
      minimum: 1,
    },
  },
}

// 执行校验
function userValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = userValidate
