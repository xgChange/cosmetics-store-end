const {
  User,
  Blogs,
  Comment,
  Reply,
  GoodsType,
  Goods,
} = require('../db/model/index')
var Sequelize = require('sequelize')
var Op = Sequelize.Op

async function getAllUsersInfo({ pageIndex = 1, pageSize = 5 }) {
  const result = await User.findAndCountAll({
    limit: pageSize,
    offset: (pageIndex - 1) * pageSize,
    where: {
      role: {
        [Op.lt]: 9,
      },
    },
    attributes: ['id', 'username', 'nickname', 'role'],
    order: [['id', 'asc']],
  })
  return {
    users: result.rows,
    count: result.count,
  }
}

async function updateInfoByUser({ user_id, role }) {
  if (role > 6) {
    return 0
  }
  const result = await User.update(
    {
      role,
    },
    {
      where: {
        id: user_id,
      },
    }
  )

  return result > 0
}

// 删除 博客
async function deleteBlogInfo(id) {
  const info = await Blogs.destroy({
    where: {
      id,
    },
  })
  return info > 0
}

// 删除 博客下的评论
async function findCommentInfo(id) {
  const info = await Comment.findAndCountAll({
    where: {
      subject_id: id,
      type: 1,
    },
    order: [['createdAt', 'desc']],
    include: [
      {
        association: Comment.hasMany(Reply, {
          foreignKey: 'comment_id',
          targetKey: 'id',
          as: 'childrens',
        }),
        attributes: ['id', 'content', 'from_id', 'to_id', 'createdAt', 'type'],
        order: [['createdAt', 'desc']],
      },
    ],
  })

  for (item of info.rows) {
    for (child of item.childrens) {
      child.destroy()
    }
    item.destroy()
  }
}

async function getAllGoodsInfo({ pageIndex = 1, pageSize = 10 }) {
  const result = await Goods.findAndCountAll({
    limit: pageSize,
    offset: (pageIndex - 1) * pageSize,
    include: [
      {
        model: GoodsType,
        attributes: ['name'],
      },
    ],
    order: [['id', 'asc']],
  })
  const info = result.rows.map((item) => {
    const detail = item.dataValues
    detail.t_type = detail.t_type.dataValues
    return detail
  })
  return {
    goodsList: info,
    count: result.count,
  }
}

async function getGoodsTypeInfo() {
  const result = await GoodsType.findAll()

  const info = result.map((item) => {
    item.dataValues.value = item.dataValues.name
    item.dataValues.label = item.dataValues.name
    return item.dataValues
  })
  return info
}

module.exports = {
  getAllUsersInfo,
  updateInfoByUser,
  deleteBlogInfo,
  findCommentInfo,
  getAllGoodsInfo,
  getGoodsTypeInfo,
}
