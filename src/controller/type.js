/**
 * @description 商品类型
 */
const { addType, getTypeInfo } = require('../servers/type')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { goodsTypeExist } = require('../model/errInfo')

async function createGoodsType(name) {
  const info = await getTypeInfo(name)
  if (info) {
    return new ErrorModel(goodsTypeExist)
  }

  try {
    const result = await addType(name)
    return new SuccessModel()
  } catch (error) {
    // console.log(error)
    return new ErrorModel(createTypeFailed)
  }
}

module.exports = {
  createGoodsType,
}
