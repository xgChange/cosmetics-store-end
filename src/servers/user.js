/**
 * @description user相关的数据操作
 */

const User = require('../db/model/User')
const Address = require('../db/model/Address')
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

  const result = await User.findAndCountAll({
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
    include: [
      {
        model: Address,
        attributes: ['id', 'name', 'tel', 'address'],
      },
    ],
  })
  const info = result.rows.map((item) => {
    const detail = item.dataValues
    detail.t_addresses = detail.t_addresses.map((i) => i.dataValues)
    return detail
  })
  return info
}

async function createUser({ username, password, nickname, phone, picture }) {
  const result = await User.create({
    username,
    password,
    nickname,
    phone,
    picture,
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

async function createAddressInfo({ name, tel, address }, user_id) {
  const result = await Address.create({
    name,
    tel,
    address,
    user_id,
  })
  return result
}

async function updateAddressInfo({ name, tel, address, id }) {
  const whereOp = {
    id,
  }
  const updateObj = {}
  if (name) {
    updateObj.name = name
  }
  if (tel) {
    updateObj.tel = tel
  }
  if (address) {
    updateObj.address = address
  }
  const result = await Address.update(updateObj, {
    where: whereOp,
  })

  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  updateUserInfo,
  createAddressInfo,
  updateAddressInfo,
}
