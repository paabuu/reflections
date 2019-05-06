const { globalData } = getApp();
// pages/detail/deatil.js
Page({

  /**
   * Page initial data
   */
  data: {
    food: null,
    type: '',
    index: '',
    selectedSizeIndex: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const [type, index] = options.id.split('_');
    // const type = 'xiaoshi';
    // const index = 1;

    this.setData({
      food: globalData.menu[type][+index],
      type,
      index: index < 9 ? `0${+index+1}` : +index + 1
    });
  },

  changeSize(e) {
    this.setData({
      selectedSizeIndex: +e.currentTarget.id
    })
  },

  addToShoppingCart() {
    const { type, index, food } = this.data;
    const { menu } = globalData;

    menu[type][+index - 1].count++;
    globalData.menu = menu;

    wx.showToast({
      title: `${food.name}  +1`,
      icon: 'success',
      duration: 2000
    });
  }
})