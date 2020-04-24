/**
 * @description 生成token
 */

const { security } = require('../config/scretkey')
const jwt = require('jsonwebtoken')

const generateToken = function (uid, scope) {
  const secretKey = security.secretKey
  const expiresIn = security.expiresIn
  const token = jwt.sign(
    {
      uid,
      scope,
    },
    secretKey,
    {
      expiresIn,
    }
  )
  return token
}

module.exports = generateToken
