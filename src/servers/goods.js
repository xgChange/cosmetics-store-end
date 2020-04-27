/**
 * @description 访问商品方面的数据
 */
const { Goods, GoodsType } = require('../db/model/index')
const { getTree } = require('../utils/utils')

async function createGoods({
  name,
  title,
  poster,
  picture,
  price,
  type_id,
  detail,
}) {
  const result = await Goods.create({
    name,
    title,
    poster,
    picture,
    price,
    type_id,
    detail,
  })
  return result.dataValues
}

async function updateGoodsInfo(
  { name, title, poster, picture, price, type_id, detail },
  id
) {
  const whereOp = {
    id,
  }
  const updateObj = {}
  if (name) {
    updateObj.name = name
  }
  if (title) {
    updateObj.title = title
  }
  if (poster) {
    updateObj.poster = poster
  }
  if (picture) {
    updateObj.picture = picture
  }
  if (price) {
    updateObj.price = price
  }
  if (type_id) {
    updateObj.type_id = type_id
  }
  if (detail) {
    updateObj.detail = detail
  }
  const result = await Goods.update(updateObj, {
    where: whereOp,
  })

  return result[0] > 0
}

async function deleteGoodsInfo(id) {
  const result = await Goods.destroy({
    where: {
      id,
    },
  })

  return result > 0
}

async function getGoodsDetailInfo({ id, name }) {
  const whereOp = {}
  if (id) {
    whereOp.id = id
  }

  if (name) {
    whereOp.name = name
  }

  const result = await Goods.findAndCountAll({
    where: whereOp,
    include: [
      {
        model: GoodsType,
        attributes: ['name'],
      },
    ],
  })
  const info = result.rows.map((item) => {
    const detail = item.dataValues
    detail.t_type = detail.t_type.dataValues
    return detail
  })
  return info
}

async function getCategoryInfoByName(id) {
  const whereOp = {}
  if (id) {
    whereOp.id = id
  }
  const result = await Goods.findAndCountAll({
    include: [
      {
        model: GoodsType,
        attributes: ['name'],
        where: whereOp,
      },
    ],
  })
  const info = result.rows.map((item) => {
    const goods = item.dataValues
    goods.t_type = goods.t_type.dataValues
    return goods
  })
  return info
}

async function getGoodsCategoryAllInfo() {
  const result = await GoodsType.findAndCountAll()
  const { count, rows } = result
  const info = rows.map((item) => item.dataValues)
  return {
    categoryNames: getTree(info, 0),
    count,
  }
}

module.exports = {
  createGoods,
  deleteGoodsInfo,
  updateGoodsInfo,
  getGoodsDetailInfo,
  getCategoryInfoByName,
  getGoodsCategoryAllInfo,
}
