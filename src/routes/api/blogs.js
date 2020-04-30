/**
 * @description 相关api
 */
const router = require('koa-router')()
const { createBlogs, getAllBlogs } = require('../../controller/blogs')

router.prefix('/api/blogs')

router.post('/create', async (ctx) => {
  // 创建博客
  const { content, picture, type } = ctx.request.body
  ctx.body = await createBlogs({
    content,
    picture,
    type,
    user_id: ctx.state.auth.uid,
  })
})

// 获取博客,按照分页
router.get('/loadMore/:pageIndex', async (ctx) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getAllBlogs({ pageIndex })
  ctx.body = result
})

// 获取自己的博客
router.get('/loadMore/my/:pageIndex', async (ctx) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getAllBlogs({ pageIndex, user_id: ctx.state.auth.uid })
  ctx.body = result
})

module.exports = router
