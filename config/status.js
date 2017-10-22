/**
 * Created by Zihang Zhang on 2017/10/19.
 */

module.exports = {
  REG_SUCCEEDED: {
    status: 100,
    msg: '注册成功'
  },

  REG_FAILED: {
    status: 101,
    msg: '注册失败'
  },

  LOGIN_SUCCEEDED: {
    status: 200,
    msg: '登录成功'
  },

  LOGIN_FAILED: {
    status: 201,
    msg: '登录失败'
  },

  ALREADY_LOGGED_IN: {
    status: 202,
    msg: '已是登录状态'
  },

  NOT_YET_LOGGED_IN: {
    status: 203,
    msg: '尚未登录状态'
  },

  LOGGED_OUT: {
    status: 300,
    msg: '已退出登录'
  },

  LOG_OUT_ERROR: {
    status: 301,
    msg: '退出异常'
  },

  PROFILE_MOD_SUCCEEDED: {
    status: 400,
    msg: '档案更新成功'
  },

  PROFILE_MOD_FAILED: {
    status: 401,
    msg: '档案更新失败'
  },

  PROFILE_FETCH_FAILED: {
    status: 402,
    msg: '档案获取失败'
  },

  BLOG_PUB_SUCCEEDED: {
    status: 500,
    msg: '博文发布成功'
  },

  BLOG_PUB_FAILED: {
    status: 501,
    msg: '博文发布失败'
  },

  BLOG_LIST_FETCH_FAILED: {
    status: 502,
    msg: '获取博文列表失败'
  },

  BLOG_DETAILS_FETCH_FAILED: {
    status: 503,
    msg: '获取博文详情失败'
  },

  COMMENT_SUCCEEDED: {
    status: 600,
    msg: '评论成功'
  },

  COMMENT_FAILED: {
    status: 601,
    msg: '评论失败'
  },

  FILE_UPLOAD_SUCCEEDED: {
    status: 700,
    msg: '资源文件上传成功'
  },

  FILE_UPLOAD_FAILED: {
    status: 701,
    msg: '资源文件上传失败'
  },

  FILE_RENAME_FAILED: {
    status: 702,
    msg: '资源文件重命名失败'
  },

  FILE_INFO_FETCH_ERROR: {
    status: 703,
    msg: '资源文件信息错误'
  },

  CONNECTION_ERROR: {
    status: 9001,
    msg: '通信故障'
  },

  SERVER_INNER_ERROR: {
    status: 9002,
    msg: '服务器内部错误'
  }
};
