/**
 * @description goods 数据格式校验
 */

const validate = require('./_validate')

const SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
    },
    poster: {
      type: 'string',
      minLength: 1,
    },
    picture: {
      type: 'string',
      minLength: 1,
    },
    title: {
      type: 'string',
      minLength: 2,
    },
    detail: {
      type: 'object',
      minLength: 1,
    },
    type_id: {
      type: 'number',
      minimum: 1,
    },
    price: {
      type: 'number',
      minimum: 1,
    },
  },
}

// 执行校验
function goodsValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = goodsValidate
