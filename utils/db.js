const dbName = 'todolist'
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = Math.random() * 16 | 0
    // eslint-disable-next-line no-bitwise,no-mixed-operators
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

class DB {
  async add(data) {
    const list = wx.getStorageSync(dbName) || []
    wx.setStorageSync(dbName, [...list, {
      ...data,
      _id: uuid()
    }])
  }
  async update(id, data) {
    const list = wx.getStorageSync(dbName) || []
    const index = list.findIndex(item => item._id === id)
    if (index > -1) {
      list[index] = {
        ...list[index],
        ...data,
      }
    }
    wx.setStorageSync(dbName, list)

    return true
  }

  async get(id) {
    const list = wx.getStorageSync(dbName) || []
    const todo = list.find(item => item._id === id)
    return todo || undefined
  }

  async remove(id) {
    const list = wx.getStorageSync(dbName) || []
    const todos = list.filter(item => item._id !== id)
    wx.setStorageSync(dbName, todos)
    return true
  }

  async list() {
    const todos = wx.getStorageSync(dbName) || []
    return todos
  }
}

const db = new DB()

module.exports = db
