/**
 * @description 商品类型
 */
const { addType, getTypeInfo } = require('../servers/type')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { goodsTypeExist, createTypeFailed } = require('../model/errInfo')
const { flap, deepCopy } = require('../utils/utils')

async function createGoodsType(typeInfo) {
  // 检查数据库中是否有相同的 类型名称
  const copyTypeInfo = deepCopy(typeInfo)
  const infoArr = flap(copyTypeInfo) // 扁平化
  let arr = await Promise.all(infoArr.map((item) => getTypeInfo(item.name)))
  if (arr.some((item) => item !== null)) {
    return new ErrorModel(goodsTypeExist)
  }

  // dfs 遍历，执行 插入语句
  let stack = []
  let newArr = []

  for (let i = typeInfo.length - 1; i >= 0; i--) {
    stack.push(typeInfo[i])
  }

  while (stack.length) {
    let item = stack.pop()
    newArr.push(item)
    try {
      const result = await addType({
        name: item.name,
        parent_id: item.parent_id,
      })
      if (item.children && item.children.length > 0) {
        let children = item.children
        for (let i = children.length - 1; i >= 0; i--) {
          children[i].parent_id = result.id
          stack.push(children[i])
        }
      }
    } catch (err) {
      return new ErrorModel(createTypeFailed)
    }
  }
  return new SuccessModel()
}

module.exports = {
  createGoodsType,
}
