/**
 * @description 秘钥
 */

module.exports = {
  security: {
    secretKey: 'XmXXg_9854+_qwer',
    expiresIn: 60 * 60,
  },
  unlessPath: [/^\/api\/user\/login/, /^\/api\/user\/register/],
}
