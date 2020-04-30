/**
 * @description 评论和回复相关接口
 */

const router = require('koa-router')()
const {
  createComment,
  createReply,
  findComment,
} = require('../../controller/comment')

router.prefix('/api/comment')

// 创建评论
router.post('/publish', async (ctx) => {
  const { subject_id, type, content } = ctx.request.body
  ctx.body = await createComment({
    subject_id,
    user_id: ctx.state.auth.uid,
    type,
    content,
  })
})

// 创建回复
router.post('/reply/create', async (ctx) => {
  const { type, to_id, comment_id, content } = ctx.request.body
  ctx.body = await createReply({
    type,
    to_id,
    comment_id,
    content,
    from_id: ctx.state.auth.uid,
  })
})

// 查询评论和回复
router.get('/findComment/:blogId', async (ctx) => {
  ctx.body = await findComment(ctx.params.blogId)
})
module.exports = router
