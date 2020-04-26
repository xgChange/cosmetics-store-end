/**
 * @description 深拷贝
 */

function deepCopy(obj) {
  if (obj && typeof obj !== 'object') return

  let target = obj.constructor === Array ? [] : {}

  for (let key in obj) {
    // 实例
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        target[key] = obj[key].constructor === Array ? [] : {}
        target[key] = deepCopy(obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}

/**
 * @description 扁平转树
 */
function getTree(arr, parent) {
  let temp = arr.slice()
  let newArr = []

  temp.forEach((item) => {
    if (item.pid === parent) {
      let obj = {}
      obj.id = item.id
      obj.pid = item.pid
      obj.children = getTree(temp, item.id)
      newArr = newArr.concat(obj)
    }
  })
  return newArr
}

/**
 * @description 树转扁平
 */

function flap(arr) {
  let stack = []
  let newArr = []
  for (let i = arr.length - 1; i >= 0; i--) {
    stack.push(arr[i])
  }

  while (stack.length) {
    let item = stack.pop()
    newArr.push(item)
    if (item.children && item.children.length > 0) {
      let children = item.children
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return newArr
}

module.exports = {
  deepCopy,
  getTree,
  flap,
}
