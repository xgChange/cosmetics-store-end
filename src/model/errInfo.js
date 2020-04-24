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
    errCode: 10010,
    message: '删除用户失败',
  },
  //json schema 校验失败
  jsonSchemaFileInfo: {
    errCode: 10009,
    message: '数据格式校验错误',
  },
  // 文件
  uploadFileSizeFailInfo: {
    errCode: 10007,
    message: '上传文件尺寸过大',
  },
  // 修改信息
  changeInfoFailInfo: {
    errCode: 10008,
    message: '修改基本信息失败',
  },
  changePasswordFailInfo: {
    errCode: 10006,
    message: '修改密码失败',
  },
}
