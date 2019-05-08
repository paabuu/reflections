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
    time: formatTime(new Date()),
    songCodes: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      names: globalData.orders.map(o => o.name)
    });

    const temp = [];
    const recordData = {
      time: formatTime(new Date()),
      orders: globalData.orders,
      songs: []
    };
    const songCodes = [];
    let wineCount = 0;
    const wines = globalData.menu['jiulei'].map(m => m.id);
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
      if (wines.indexOf(o.id) > -1) {
        wineCount++;
      }

      recordData.songs.push({
        [o.songs[index]]: songData[o.songs[index]]
      });
      songCodes.push(o.songs[index]);
      return `${ i < 9 ? `0${i + 1}` : i + 1 } ${songData[o.songs[index]].slice(5)}`;
    });

    if (wineCount >= 3) {
      songCodes.push('5K');
      recordData.songs.push({
        '5K': songData['5K']
      });
      songs.push(`${songs.length < 9 ? `0${songs.length + 1}`: songs.length + 1 } ${songData['5K'].slice(5)}`);
    }

    this.setData({
      songCodes: this.noRepeatArray(songCodes)
    });
    globalData.songs = this.noRepeatArray(songs);

    wx.request({
      url: 'https://greatwhole90.com/overcook/reflection/record',
      method: 'POST',
      data: { data: recordData },
      success: res => {
        console.log(res);
      }
    });

    wx.loadFontFace({
      family: 'FZBYSK',
      source: 'url("https://greatwhole90.com/overcook/reflection/assets/fonts/FZBYSK.TTF")',
      success: console.log
    });
    wx.loadFontFace({
      family: 'FZBWKSFT',
      source: 'url("https://greatwhole90.com/overcook/reflection/assets/fonts/FZBWKSFT.ttf")',
      success: console.log
    });
  },

  noRepeatArray(arr) {
    const newArr = [];
    arr.forEach(i => {
      if (newArr.indexOf(i) === -1) {
        newArr.push(i);
      }
    });

    return newArr;
  },

  showLoading() {
    this.setData({
      loading: true
    });

    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/songs/songs'
      });
    }, 2000);

    wx.request({
      url: 'https://greatwhole90.com/overcook/reflection/send_songs',
      method: 'POST',
      data: { data: this.data.songCodes },
      success: function(res) {
        console.log(res);
      }
    });
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