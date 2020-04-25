/**
 * @description 访问商品方面的数据
 */
const { Goods, GoodsType } = require('../db/model/index')

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
  console.log(whereOp, updateObj)
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
module.exports = {
  createGoods,
  deleteGoodsInfo,
  updateGoodsInfo,
  getGoodsDetailInfo,
}
