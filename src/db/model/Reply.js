/**
 * @description 回复表
 */
const Sequelize = require('sequelize')

const seq = require('../seq')

const Reply = seq.define('t_reply', {
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '回复的类型(1. 基于评论去回复, 2. 基于回复而回复)',
  },
  from_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '谁发的回复(from)',
  },
  to_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '发给谁(to)',
  },
  comment_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '基于评论的回复',
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '回复的内容',
  },
})

module.exports = Reply
