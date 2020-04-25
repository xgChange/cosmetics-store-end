/**
 * @description 访问商品方面的数据
 */
const { Goods } = require('../db/model/index')

async function createGoods({ name, title, poster, picture, price, type }) {
  const result = await Goods.create({
    name,
    title,
    poster,
    picture,
    price,
    type,
  })
  return result.dataValues
}

async function selectSingleGoods(name) {
  const result = await Goods.findOne({
    where: {
      name,
    },
  })
  return result
}

async function updateGoodsInfo(
  { name, title, poster, picture, price, type },
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
  if (type) {
    updateObj.type = type
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

module.exports = {
  createGoods,
  deleteGoodsInfo,
  selectSingleGoods,
  updateGoodsInfo,
}
