/* 待办详情组件 */
const db = require('../../utils/db');

Page({
  // 保存展示待办的 _id 和详细信息
  data: {
    _id: '',
    todo: {
      title: ''
    },
    freqOptions: ['未完成', '已完成'],
  },

  onLoad(options) {
    // 保存上一页传来的 _id 字段，用于后续查询待办记录
    if (options.id !== undefined) {
      this.setData({
        _id: options.id
      })
    }
  },

  // 根据 _id 值查询并显示待办数据
  async onShow() {
    if (this.data._id.length > 0) {
      // 根据 _id 值查询数据库中对应的待办事项
      db.get(this.data._id).then(res => {
        // 将数据保存到本地、更新显示
        this.setData({
          todo: res
        })
      })
    }
  },

  // 跳转响应函数
  toFileList() {
    wx.showToast({
      title: '暂未实现',
      icon: 'error'
    })
  },

  toEditPage() {
    wx.navigateTo({
      url: '../edit/index?id=' + this.data._id,
    })
  }
})
