/**
 * @description 时间相关的工具函数
 */

const { format } = require('date-fns')

/**
 * 格式化时间 如
 * @param {String} str
 */
function timeFormat(str) {
  return format(new Date(str), 'yyyy-MM-dd HH:mm')
}

module.exports = { timeFormat }
