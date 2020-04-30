/**
 * @description 评论回复
 */

const {
  createReplyInfo,
  createCommentInfo,
  findCommentInfo,
} = require('../servers/comment')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { createBlogsFailed } = require('../model/errInfo')

async function createComment({ subject_id, user_id, type = 1, content }) {
  try {
    const info = await createCommentInfo({ subject_id, user_id, type, content })
    return new SuccessModel()
  } catch (err) {
    console.log(err)
    return new ErrorModel(createBlogsFailed)
  }
}

async function createReply({ type, to_id, comment_id, content, from_id }) {
  try {
    const info = await createReplyInfo({
      type,
      to_id,
      comment_id,
      content,
      from_id,
    })
    return new SuccessModel()
  } catch (err) {
    console.log(err)
    return new ErrorModel(createBlogsFailed)
  }
}

// 查询blog下的评论和回复
async function findComment(blogId) {
  const info = await findCommentInfo(blogId)
  return new SuccessModel(info)
}

module.exports = {
  createComment,
  createReply,
  findComment,
}
