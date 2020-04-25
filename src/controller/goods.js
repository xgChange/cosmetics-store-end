/**
 * @description 商品的控制器
 */

const {
  createGoods,
  deleteGoodsInfo,
  selectSingleGoods,
  updateGoodsInfo,
} = require('../servers/goods')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  createGoodsField,
  deleteGoodsFailed,
  goodsExist,
  updateGoodsFailed,
} = require('../model/errInfo')

/**
 * @description 创建商品 (管理员)
 */
async function addGoods({ name, title, poster, picture, price, type }) {
  const goodsInfo = await selectSingleGoods(name)
  if (goodsInfo) {
    return new ErrorModel(goodsExist)
  }

  try {
    const goodsInfo = await createGoods({
      name,
      title,
      poster,
      picture,
      price,
      type,
    })
    return new SuccessModel()
  } catch (err) {
    return new ErrorModel(createGoodsField)
  }
}

async function updateGoods({ name, title, poster, picture, price, type }, id) {
  const result = await updateGoodsInfo(
    {
      name,
      title,
      poster,
      picture,
      price,
      type,
    },
    id
  )
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(updateGoodsFailed)
}

async function deleteGoods(id) {
  const result = await deleteGoodsInfo(id)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteGoodsFailed)
}

module.exports = {
  addGoods,
  deleteGoods,
  updateGoods,
}
