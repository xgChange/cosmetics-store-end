/**
 * @description 商品类型 表
 */
const { GoodsType } = require('../db/model/index')

async function addType(name) {
  const result = await GoodsType.create({
    name,
  })
  return result.dataValues
}

async function getTypeInfo(name) {
  const result = await GoodsType.findOne({
    where: {
      name,
    },
  })

  return result
}

module.exports = {
  addType,
  getTypeInfo,
}
