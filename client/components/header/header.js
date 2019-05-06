// components/header/header.js
Component({
  /**
   * Component properties
   */
  properties: {
    showBackArrow: {
      type: Boolean,
      value: true
    },
    text: String,
    textStyle: String,
    bgc: {
      type: String,
      value: '#ffffff'
    },
    height: {
      type: String,
      value: '10vh'
    },
    headerStyle: String
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    goBack: function() {
      wx.navigateBack();
    }
  }
})
