//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    // this.fetchPopularRecipes();
    wx.redirectTo({
      url: '/pages/menu/menu'
    });
  },
  fetchPopularRecipes: function() {
    const url = `https://greatwhole90.com/overcook/recipe/popular`;
    this.fetchRecipes(url);
  },
  fetchRecipes: function(url) {
    wx.request({
      url,
      success: res => {
        if (res.data.meta.code == 200) {
          this.setData({
            recipes: res.data.data,
          });
        }
      },
      fail: function() {
        this.setData({
          recipes: []
        });
      }
    });
  }
})
