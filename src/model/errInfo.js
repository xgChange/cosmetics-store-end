/**
 * @description 错误信息集合
 */

module.exports = {
  // 注册
  registeExist: {
    errCode: 10001,
    message: '用户名已存在',
  },
  registerFailed: {
    errCode: 10002,
    message: '注册失败，请重试',
  },
  registerNotExist: {
    errCode: 10003,
    message: '用户名不存在',
  },
  // 登录
  loginFailed: {
    errCode: 10004,
    message: '用户名不存在或者密码错误',
  },
  loginCheckFailed: {
    errCode: 10005,
    message: '尚未登录',
  },
  // 删除用户
  deleteUserFailInfo: {
    errCode: 10006,
    message: '删除用户失败',
  },
  //json schema 校验失败
  jsonSchemaFileInfo: {
    errCode: 10007,
    message: '数据格式校验错误',
  },
  // 文件
  uploadFileSizeFailInfo: {
    errCode: 10008,
    message: '上传文件尺寸过大',
  },
  // 修改信息
  changeInfoFailed: {
    errCode: 10009,
    message: '修改基本信息失败',
  },
  changePasswordFailInfo: {
    errCode: 10010,
    message: '修改密码失败',
  },
  // 权限不足
  forbiddenMsg: {
    errCode: 10011,
    message: '权限不足',
  },
  // 商品相关
  createGoodsFailed: {
    errCode: 10012,
    message: '创建商品失败',
  },
  deleteGoodsFailed: {
    errCode: 10013,
    message: '删除商品失败',
  },
  goodsExist: {
    errCode: 10014,
    message: '该商品已存在，请勿重复添加',
  },
  goodsNotExist: {
    errCode: 10015,
    message: '该商品不存在',
  },
  updateGoodsFailed: {
    errCode: 10016,
    message: '修改商品失败',
  },
  // 类型相关
  goodsTypeExist: {
    errCode: 10017,
    message: '该类型已存在，请勿重复添加',
  },
  createTypeFailed: {
    errCode: 10018,
    message: '创建该类型失败',
  },
  // 地址相关
  createAddressFailed: {
    errCode: 10019,
    message: '创建地址失败',
  },
  updateAddressFailed: {
    errCode: 10020,
    message: '修改地址失败',
  },
  AuthFailed: {
    errCode: 10021,
    message: '无效的token',
  },
  createOrderFailed: {
    errCode: 10022,
    message: '创建订单失败',
  },
  updateOrderFailed: {
    errCode: 10023,
    message: '状态修改错误',
  },
  createCollectFailed: {
    errCode: 10024,
    message: '创建收藏失败',
  },
}
