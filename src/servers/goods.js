/**
 * @description 访问商品方面的数据
 */
const {
  Goods,
  GoodsType,
  Collect,
  Reviews,
  Blogs,
  User,
} = require('../db/model/index')
const { getTree } = require('../utils/utils')
const { formatDataTime } = require('../utils/formatData')
var Sequelize = require('sequelize')
var Op = Sequelize.Op

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

// 通过分类名字 获取 对应的产品
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

// 获取所有分类
async function getGoodsCategoryAllInfo() {
  const result = await GoodsType.findAndCountAll()
  const { count, rows } = result
  const info = rows.map((item) => item.dataValues)
  return {
    categoryNames: getTree(info, 0),
    count,
  }
}

// 通过关键字 模糊查询
async function getGoodsInfoByKey(key) {
  const result = await Goods.findAll({
    where: {
      name: {
        [Op.like]: `%${key}%`,
      },
    },
  })
  const info = result.map((item) => item.dataValues)
  return info
}

// 收藏商品
async function addCollectInfo({ user_id, goods_id, collect }) {
  const info = await Collect.create({
    user_id,
    goods_id,
    collect,
  })
  return info
}

// 更新收藏商品
async function updateCollectInfo({ user_id, goods_id, collect }) {
  await Collect.update(
    {
      collect,
    },
    {
      where: {
        user_id,
        goods_id,
      },
    }
  )
}

async function findCollectInfo({ user_id, goods_id, collect }) {
  let whereObj = {}

  if (user_id) {
    Object.assign(whereObj, { user_id })
  }

  if (goods_id) {
    Object.assign(whereObj, { goods_id })
  }

  const info = await Collect.findOne({
    where: whereObj,
  })
  if (!info) return info
  return info.dataValues
}

// 商品评价
async function createReviewsInfo({ goods_id, grade, blog_id }) {
  const info = await Reviews.create({
    goods_id,
    grade,
    blog_id,
  })
  return info
}

async function findReviewsInfoByGoods(goods_id) {
  const info = await Reviews.findAndCountAll({
    attributes: ['id', 'grade'],
    where: {
      goods_id,
    },
    // order: [['id', 'desc']],
    include: [
      {
        association: Reviews.belongsTo(Blogs, {
          foreignKey: 'blog_id',
          targetKey: 'id',
        }),
        where: {
          type: 2,
        },
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'nickname', 'picture'],
          },
        ],
      },
    ],
  })
  const result = info.rows.map((item) => {
    const detail = item.dataValues
    detail.t_blog = detail.t_blog.dataValues
    detail.t_blog.t_user = detail.t_blog.t_user.dataValues
    return detail
  })
  return result
}

module.exports = {
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
  createReviewsInfo,
  findReviewsInfoByGoods,
}
