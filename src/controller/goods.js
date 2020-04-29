/**
 * @description 商品的控制器
 */

const {
  createGoods,
  deleteGoodsInfo,
  updateGoodsInfo,
  getGoodsDetailInfo,
  getCategoryInfoByName,
  getGoodsCategoryAllInfo,
  getGoodsInfoByKey,
  addCollectInfo,
  updateCollectInfo,
  findCollectInfo,
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
async function addGoods({
  name,
  title,
  poster,
  picture,
  price,
  type_id,
  detail,
}) {
  const goodsInfo = await getGoodsDetailInfo({ name })
  if (goodsInfo && goodsInfo.length > 0) {
    return new ErrorModel(goodsExist)
  }

  try {
    const goodsInfo = await createGoods({
      name,
      title,
      poster,
      picture,
      price,
      type_id,
      detail,
    })
    return new SuccessModel()
  } catch (err) {
    return new ErrorModel(createGoodsField)
  }
}

async function updateGoods(
  { name, title, poster, picture, price, type_id, detail },
  id
) {
  const result = await updateGoodsInfo(
    {
      name,
      title,
      poster,
      picture,
      price,
      type_id,
      detail,
    },
    id
  )
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(updateGoodsFailed)
}

async function deleteGoods(id) {
  const result = await deleteGoodsInfo({ id })
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteGoodsFailed)
}

async function getGoodsDetail(id) {
  const info = await getGoodsDetailInfo({ id })
  return new SuccessModel(info)
}

async function getGoodsCategoryInfo(id) {
  const info = await getCategoryInfoByName(id)
  return new SuccessModel(info)
}

async function getGoodsCategoryAll() {
  const info = await getGoodsCategoryAllInfo()
  return new SuccessModel(info)
}

// 通过关键字查询 商品
async function getGoodsByKeyWords(key) {
  const info = await getGoodsInfoByKey(key)
  return new SuccessModel(info)
}

// 收藏商品
async function addCollect({ user_id, goods_id, collect }) {
  try {
    const info = await findCollectInfo({ user_id, goods_id, collect })
    if (info) {
      await updateCollectInfo({ user_id, goods_id, collect })
    } else {
      await addCollectInfo({ user_id, goods_id, collect })
    }
    return new SuccessModel()
  } catch (err) {
    return new ErrorModel(updateGoodsFailed)
  }
}

async function findCollect({ user_id, goods_id, collect }) {
  const info = await findCollectInfo({ user_id, goods_id, collect })
  return new SuccessModel(info)
}

module.exports = {
  addGoods,
  deleteGoods,
  updateGoods,
  getGoodsDetail,
  getGoodsCategoryInfo,
  getGoodsCategoryAll,
  getGoodsByKeyWords,
  addCollect,
  findCollect,
}
