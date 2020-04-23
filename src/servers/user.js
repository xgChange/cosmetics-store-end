/**
 * @description user相关的数据操作
 */

const User = require('../db/model/User')

/**
 * @description 获取用户信息
 */

async function getUserInfo(username, password) {
  let whereObj = {
    username,
  }

  if (password) {
    Object.assign(whereObj, { password })
  }

  const userInfo = await User.findOne({
    attributes: [
      'id',
      'username',
      'password',
      'nickname',
      'phone',
      'picture',
      'address',
      'role',
    ],
    where: whereObj,
  })

  if (!userInfo) return userInfo

  return userInfo
}

module.exports = {
  getUserInfo,
}
