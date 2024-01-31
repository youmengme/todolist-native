/* 应用下方新增按钮栏组件 */

Component({
  // footer 组件有两种功能：打开新建待办页面、为待办添加新附件
  properties: {
    addFile: Boolean,
    // 如用于添加新附件，需传入待办记录 _id 值
    _id: String
  },
  methods: {
    onClick() {
      if (this.properties.addFile) {
        this.showToast({
          title: '暂不支持添加文件',
          icon: 'error'
        })
      } else {
        wx.navigateTo({
          url: '../../pages/add/index',
        })
      }
    },
  }
})
