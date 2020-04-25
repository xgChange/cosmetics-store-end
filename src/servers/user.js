/**
 * @description user相关的数据操作
 */

const User = require('../db/model/User')
const { formatUserInfo } = require('../utils/formatData')

/**
 * @description 获取用户信息
 */
async function getUserInfo({ username, password, id }) {
  let whereObj = {}

  if (password) {
    Object.assign(whereObj, { password })
  }

  if (username) {
    Object.assign(whereObj, { username })
  }

  if (id) {
    Object.assign(whereObj, { id })
  }

  const userInfo = await User.findOne({
    attributes: [
      'id',
      'username',
      'nickname',
      'phone',
      'picture',
      'address',
      'role',
    ],
    where: whereObj,
  })

  if (!userInfo) return userInfo

  return formatUserInfo(userInfo.dataValues)
}

async function createUser({ username, password, nickname, phone }) {
  const result = await User.create({
    username,
    password,
    nickname,
    phone,
  })

  return result
}

async function updateUserInfo({ nickname, phone, picture, address }, id) {
  const whereOp = {
    id,
  }
  const updateObj = {}
  if (nickname) {
    updateObj.nickname = nickname
  }
  if (phone) {
    updateObj.phone = phone
  }
  if (picture) {
    updateObj.picture = picture
  }
  if (address) {
    updateObj.address = address
  }
  const result = await User.update(updateObj, {
    where: whereOp,
  })

  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  updateUserInfo,
}
