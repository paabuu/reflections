// pages/order/order.js
const { globalData } = getApp();
const songData = require('../../assets/data/songs');
const { formatTime } = require('../../utils/util');
Page({

  /**
   * Page initial data
   */
  data: {
    names: globalData.orders.map(o => o.name),
    loading: false,
    time: formatTime(new Date())
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      names: globalData.orders.map(o => o.name)
    });

    const temp = [];
    const songs = globalData.orders.map((o, i) => {
      let index = Math.floor(Math.random() * o.songs.length);
      const key = o.songs[index];
      if (temp.indexOf(key) > -1) {
        for (let j = 0; j < o.songs.length; j++) {
          if (temp.indexOf(key) === -1) {
            temp.push(o.songs[j]);
            index = j;
          }
        }
      }
      return `${ i < 9 ? `0${i + 1}` : i + 1 } ${songData[o.songs[index]].slice(5)}`;
    });

    globalData.songs = songs;

    wx.loadFontFace({
      family: 'FZBYSK',
      source: 'url("https://greatwhole90.com/overcook/reflection/assets/fonts/FZBYSK.TTF")',
      success: console.log
    })
  },

  showLoading() {
    this.setData({
      loading: true
    });

    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/songs/songs'
      });
    }, 2000)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.setData({
      loading: false
    });
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})