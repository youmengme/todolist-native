/* 待办重新编辑页面 */
const db = require('../../utils/db');

Page({
  // 类似 add 页面，存储正在编辑的待办信息
  data: {
    _id: '',
    title: '',
    desc: '',
    files: [],
    fileName: '',
    freqOptions: ['未完成', '已完成'],
    freq: 0
  },

  async onLoad(options) {
    // 根据上一页传来的 _id 值更新表单数据
    if (options.id !== undefined) {
      this.setData({
        _id: options.id
      })
      // 根据待办 _id 加载信息
      db.get(this.data._id).then(todo => {
        // 循环拼接展示的文件列表名，文件名过长时截断
        let fileName = ''
        for (let file of todo.files) {
          fileName += file.name.substr(0, 10) + (file.name.length > 10 ? "..." : "") + " "
        }
        // 如果整体文件名字符串过长则整体截断
        fileName = fileName.substr(0, 20) + (fileName.length > 20 ? "..." : "")
        // 更新页面显示
        this.setData({
          title: todo.title,
          desc: todo.desc,
          files: todo.files,
          fileName,
          freq: todo.freq
        })
      })
    }
  },

  //输入响应函数
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  onDescInput(e) {
    this.setData({
      desc: e.detail.value
    })
  },

  // 表单、跳转响应函数
  onChooseFreq(e) {
    this.setData({
      freq: e.detail.value
    })
  },

  // 删除待办事项
  async deleteTodo() {
    // 根据待办 _id 删除待办事项
    await db.remove(this.data._id)
    // 删除完成后，退回首页
    wx.navigateBack({
      delta: 2,
    })
  },

  cancelEdit() {
    wx.navigateBack({
      delta: 0,
    })
  },

  // 保存待办信息
  async saveTodo() {
    // 对输入框内容进行校验
    if (this.data.title === '') {
      wx.showToast({
        title: '事项标题未填写',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.title.length > 10) {
      wx.showToast({
        title: '事项标题过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.desc.length > 100) {
      wx.showToast({
        title: '事项描述过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    // 校验通过后，根据待办 _id，更新待办信息
    db.update(this.data._id, {
      data: {
        title: this.data.title,
        desc: this.data.desc,
        files: this.data.files,
        freq: Number(this.data.freq)
      }
    }).then(() => {
      // 待办更新后，返回详情页
      wx.navigateBack({
        delta: 0,
      })
    })
  }
})
