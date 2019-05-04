// pages/shopping_cart/shopping_cart.js
const { globalData } = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    list: [],
    count: 0,
    sum: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.transformOrderedList();
  },

  transformOrderedList() {
    const { types, menu } = globalData;
    const list = [];
    types.forEach(t => {
      list.push(...menu[t.key].map(f => ({...f, type: t.key})).filter(f => f.count > 0));
    });

    this.setData({
      list,
      count: list.reduce((a, b) => a + b.count, 0),
      sum: list.reduce((a, b) => a + b.count * b.price, 0)
    });
  },

  update(e) {
    const { id, flag, price } = e.currentTarget.dataset;
    const newList = this.data.list.map(d => {
      if (d.id === id) {
        return {
          ...d,
          count: d.count + flag
        }
      }

      return d;
    }).filter(d => d.count > 0);

    this.setData({
      list: newList,
      count: this.data.count + flag,
      sum: this.data.sum + flag * price     
    });

    this.updateMenu(newList);
  },

  updateMenu(list) {
    const { types, menu } = globalData;

    list.forEach(d => {
      const index = d.id.split('_')[1];
      menu[d.type][index].count = d.count;
    });
    globalData.menu = menu;
  },

  getOrder() {
    if ( this.data.count === 0) return;
    globalData.orders = this.data.list;
    wx.navigateTo({
      url: '/pages/order/order'
    });
  }
})