// pages/menu/menu.js
const { globalData } = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    menu: globalData.menu,
    types: globalData.types,
    selectedKey: globalData.types[0].key,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(this.data)
  },

  onShow: function() {
    this.setData({
      menu: globalData.menu
    });
  },

  addToShoppingCart: function(e) {
    const { index, count } = e.currentTarget.dataset;
    this.updateShoppingCart(index, count + 1);
  },

  removeFromShoppingCart(e) {
    const { index, count } = e.currentTarget.dataset;
    this.updateShoppingCart(index, count - 1);
  },

  updateShoppingCart(index, count) {
    const { menu, selectedKey } = this.data;
    const newMenu = {
      ...menu,
      [selectedKey]: menu[selectedKey].map((f, i) => {
        if (index === i) {
          return {
            ...f,
            count
          }
        }
        return f;
      })
    };
    this.setData({
      menu: newMenu
    });

    globalData.menu = newMenu;
  },

  changeSelectedType(e) {
    const { key } = e.currentTarget.dataset;

    this.setData({
      selectedKey: key
    });
  },

  viewFoodDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  navigate() {
    wx.navigateTo({
      url: "/pages/shopping_cart/shopping_cart"
    });
  }
})