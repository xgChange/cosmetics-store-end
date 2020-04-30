/**
 * @description 格式化数据
 */
const { timeFormat } = require('./_formatTime')

function formatUserInfo(data) {
  if (data === null) return null
  // 用户列表
  if (Array.isArray(data)) {
    return data.map(_formatObj)
  }
  // 单独用户
  return _formatObj(data)
}

function _formatObj(item) {
  if (item.picture === null) {
    item.picture = '默认'
  }
  return item
}

function formatDataTime(data) {
  if (data === null) return null
  if (Array.isArray(data)) {
    return data.map(_formatDBTime)
  }
  return _formatObj(data)
}

function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

module.exports = {
  formatUserInfo,
  formatDataTime,
}
