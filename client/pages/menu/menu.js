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
    count: globalData.count
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(this.data)
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
    this.setData({
      menu: {
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
      }
    });
  }
})