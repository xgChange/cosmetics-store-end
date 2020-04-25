# 数据表设计

## 用户表(t_users)

| 字段     | 类型    | 主键 | 约束              | 备注 |
| -------- | ------- | ---- | ----------------- | ---- |
| id       | int     | Y    | Not null and auto |      |
| username | varchar |      |                   |      |
| password | varchar |      |                   |      |
| nickname | varchar |      |                   |      |
| phone    | varchar |      |                   |      |
| address  | varchar |      |                   |      |
| role     | Int     |      |                   |      |

## 商品表(t_goods)

| 字段    | 类型    | 主键 | 约束              | 备注 |
| ------- | ------- | ---- | ----------------- | ---- |
| id      | int     | Y    | Not null and auto |      |
| name    | varchar |      |                   |      |
| price   | varchar |      | "分"为单位        |      |
| poster  | varchar |      |                   |      |
| title   | varchar |      |                   |      |
| picture | varchar |      |                   |      |
| type_id | int     |      |                   |      |

## 商品分类表(t_type)

| 字段      | 类型    | 主键 | 约束 | 备注 |
| --------- | ------- | ---- | ---- | ---- |
| id        | int     | Y    |      |      |
| name      | varchar |      |      |      |
| parent_id | int     |      |      |      |

## 帖子表(t_blogs)

| 字段    | 类型    | 主键 | 约束              | 备注                                 |
| ------- | ------- | ---- | ----------------- | ------------------------------------ |
| id      | int     | Y    | Not null and auto |                                      |
| content | varchar |      |                   |                                      |
| picture | varchar |      |                   |                                      |
| type    | int     |      |                   | 帖子的类型(1.普通帖子，2.评价的帖子) |
| user_id | int     |      |                   | 谁发的帖子                           |

## 评价表(t_comment)

| 字段     | 类型    | 主键 | 约束 | 备注                                   |
| -------- | ------- | ---- | ---- | -------------------------------------- |
| id       | int     | Y    |      |                                        |
| blogs_id | int     |      | F    |                                        |
| goods_id | int     |      | F    |                                        |
| user_id  | int     |      |      |                                        |
| type     | int     |      |      | 评价的类型(1.普通帖子评论，2.基于商品) |
| grade    | int     |      |      | 分数                                   |
| content  | varchar |      |      | 评论内容                               |

## 回复表(t_reply)

| 字段         | 类型    | 主键 | 约束 | 备注                             |
| ------------ | ------- | ---- | ---- | -------------------------------- |
| id           | int     | Y    |      |                                  |
| content      | varchar |      |      |                                  |
| comment_id   | int     |      |      | 关联的是 comment_id              |
| reply_type   | int     |      |      | 1.基于评论回复，2.基于回复而回复 |
| from_user_id | int     |      |      |                                  |
| to_user_id   |         |      |      |                                  |

## 用户和商品关系表(t_user_goods_relation)

| 字段     | 类型    | 主键 | 约束 | 备注 |
| -------- | ------- | ---- | ---- | ---- |
| id       | int     | Y    |      |      |
| user_id  | int     |      |      |      |
| goods_id | int     |      |      |      |
| collect  | Boolean |      |      |      |

## 完成的接口情况

1. user
   - login
   - register
   - auth
   - changeInfo
2. goods
   - create (admin)
   - update (admin)
   - /detail/:id'
   - delete (admin)
3. type
   - create
