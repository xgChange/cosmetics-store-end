/**
 * @description 这是user的控制器
 */

const generateToken = require('../core/token')
const {
  getUserInfo,
  createUser,
  updateUserInfo,
  createAddressInfo,
  updateAddressInfo,
} = require('../servers/user')
const { ErrorModel, SuccessModel } = require('../model/resModel')
const {
  registeExist,
  registerFailed,
  loginFailed,
  changeInfoFailed,
  createAddressFailed,
  updateAddressFailed,
} = require('../model/errInfo')

/**
 * @description 注册
 */
async function register({ username, password, nickname, phone, picture }) {
  const oldUserInfo = await getUserInfo({ username })
  if (oldUserInfo) {
    return new ErrorModel(registeExist)
  }
  try {
    await createUser({ username, password, nickname, phone, picture })
    return new SuccessModel()
  } catch (err) {
    return new ErrorModel(registerFailed)
  }
}

/**
 * @description 登录
 */
async function login({ username, password }) {
  const userInfo = await getUserInfo({ username, password })

  if (!userInfo) {
    return new ErrorModel(loginFailed)
  }
  const { id, role } = userInfo
  const token = generateToken(id, role)
  return new SuccessModel({ token })
}

/**
 * @description 获取用户信息
 */
async function auth(id) {
  const userInfo = await getUserInfo({ id })
  return new SuccessModel(userInfo)
}

/**
 * @description 修改用户信息
 */
async function changeInfo({ nickname, phone, picture, address }, id) {
  const result = await updateUserInfo({ nickname, phone, picture, address }, id)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailed)
}

async function createAddress({ name, tel, address }, user_id) {
  try {
    await createAddressInfo({ name, tel, address }, user_id)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(createAddressFailed)
  }
}

async function updateAddress({ name, tel, address, id }) {
  const result = await updateAddressInfo({ name, tel, address, id })
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(updateAddressFailed)
}

module.exports = {
  register,
  login,
  auth,
  changeInfo,
  createAddress,
  updateAddress,
}
