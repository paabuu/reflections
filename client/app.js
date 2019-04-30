//app.js
const MENU = require('/assets/data/menu.js');
const TYPES = [
  { name: '主 食', key: 'zhushi' },
  { name: '热 炒', key: 'rechao' },
  { name: '粥 类', key: 'zhoulei' },
  { name: '汤 类', key: 'tanglei' },
  { name: '汉 堡', key: 'hanbao' },
  { name: '比 萨', key: 'bisa' },
  { name: '意 面', key: 'yimian' },
  { name: '小 吃', key: 'xiaochi' },
  { name: '小 食', key: 'xiaoshi' },
  { name: '甜 品', key: 'tianpin' },
  { name: '饮 品', key: 'yinpin' },
  { name: '酒 类', key: 'jiulei' },
];

let menu = {};
TYPES.forEach(t => {
  menu[t.key] = MENU[t.key].map(f => ({
    ...f, 
    count: 0
  }))
});

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    menu,
    types: TYPES
  }
})