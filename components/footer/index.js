/* 应用下方新增按钮栏组件 */

Component({
  methods: {
    onClick() {
      wx.navigateTo({
        url: '../../pages/add/index',
      })
    },
  }
})
