/**
 * @description 评论回复相关
 */

const { Blogs, User, Comment, Reply } = require('../db/model/index')

// 处理reply和user的外键关系
const ReplyAndUserFrom = Reply.belongsTo(User, {
  foreignKey: 'from_id',
  targetKey: 'id',
  as: 'from_user',
})

const ReplyAndUserTo = Reply.belongsTo(User, {
  foreignKey: 'to_id',
  targetKey: 'id',
  as: 'to_user',
})

async function createCommentInfo({ subject_id, user_id, type, content }) {
  const info = await Comment.create({
    subject_id,
    user_id,
    type,
    content,
  })
  return info
}

async function createReplyInfo({ type, to_id, comment_id, content, from_id }) {
  const info = await Reply.create({
    type,
    to_id,
    comment_id,
    content,
    from_id,
  })
  return info
}

async function findCommentInfo(blog_id) {
  const info = await Comment.findAndCountAll({
    where: {
      subject_id: blog_id,
      type: 1,
    },
    order: [['createdAt', 'desc']],
    include: [
      {
        association: Comment.belongsTo(User, {
          foreignKey: 'user_id',
          targetKey: 'id',
        }),
        attributes: ['id', 'username', 'nickname', 'picture', 'createdAt'],
        order: [['createdAt', 'desc']],
      },
      {
        association: Comment.hasMany(Reply, {
          foreignKey: 'comment_id',
          targetKey: 'id',
        }),
        attributes: ['id', 'content', 'from_id', 'to_id', 'createdAt', 'type'],
        order: [['createdAt', 'desc']],
        include: [
          {
            association: ReplyAndUserFrom,
            attributes: ['id', 'username', 'nickname'],
          },
          {
            association: ReplyAndUserTo,
            attributes: ['id', 'username', 'nickname'],
          },
        ],
      },
    ],
  })
  const result = info.rows.map((item) => {
    const d = item.dataValues
    d.t_user = d.t_user.dataValues
    d.t_replies = d.t_replies.map((i) => {
      return i.dataValues
    })
    return d
  })
  return result
}

module.exports = {
  createCommentInfo,
  createReplyInfo,
  findCommentInfo,
}
