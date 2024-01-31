/* 新增待办页面 */
const db = require('../../utils/db');

Page({
  // 保存编辑中待办的信息
  data: {
    title: '',
    desc: '',
    files: [],
    fileName: '',
    freqOptions: ['未完成', '已完成'],
    freq: 0
  },

  // 表单输入处理函数
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

  // 响应事件状态选择器
  onChooseFreq(e) {
    this.setData({
      freq: e.detail.value
    })
  },

  // 保存待办
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

    db.add({
      title: this.data.title,       // 待办标题
      desc: this.data.desc,         // 待办描述
      files: this.data.files,       // 待办附件列表
      freq: Number(this.data.freq), // 待办完成情况（提醒频率）
      star: false
    }).then(() => {
      wx.navigateBack({
        delta: 0,
      })
    })
  },

  // 重置所有表单项
  resetTodo() {
    this.setData({
      title: '',
      desc: '',
      files: [],
      fileName: '',
      freqOptions: ['未完成', '已完成'],
      freq: 0
    })
  }
})
