/**
 * @description 格式化数据
 */

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

module.exports = {
  formatUserInfo,
}
