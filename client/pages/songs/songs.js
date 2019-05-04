// pages/songs/songs.js
const { globalData } = getApp();
const { formatTime } = require('../../utils/util');

Page({

  /**
   * Page initial data
   */
  data: {
    songs: [],
    width: 375,
    height: 1000,
    time: formatTime(new Date())
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      songs: globalData.songs
    });
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          width: res.windowWidth,
          height: res.windowHeight
        });
      },
      complete: () => {
        this.draw();
      }
    });

    wx.loadFontFace({
      family: 'FZBYSK',
      source: 'url("https://greatwhole90.com/overcook/reflection/assets/fonts/FZBYSK.TTF")',
      success: console.log
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
  },

  draw() {
    const ctx = wx.createCanvasContext('songs');
    const { width, height, songs }  = this.data;
    const LEFT_CORNER = { x: 110, y: 70 };
    const WIDTH = 532;
    const PADDING = 66;

    let y = LEFT_CORNER.y; // 高度累计

    // 背景
    ctx.setFillStyle('#F9B84F');
    ctx.fillRect(0, 0, width, height);

    const grd = ctx.createLinearGradient(0, 0, 532, 400);
    grd.addColorStop(0, '#FFF6E5')
    grd.addColorStop(1, '#FADFAD')


    ctx.scale(0.5, 0.5);
    ctx.setFillStyle('#FFF6E5');
    ctx.fillRect(LEFT_CORNER.x, LEFT_CORNER.y, WIDTH, height * 2 - 140);

    y += 116;
    ctx.drawImage('../../assets/p5/header1.png', 0, 0, 591, 48, LEFT_CORNER.x + PADDING, y, 403, 42)
    
    y += 130;
    ctx.drawImage('../../assets/p6/header2.png', 0, 0, 132, 66, LEFT_CORNER.x + 210, y, 132, 66)

    y += 80;
    ctx.moveTo(LEFT_CORNER.x + 76, y);
    ctx.lineTo(LEFT_CORNER.x + 76 + 382, y);
    ctx.stroke();

    y += 80;
    ctx.setFontSize(30);
    ctx.setTextAlign('left');
    ctx.setFillStyle('#000');
    songs.forEach(s => {
      ctx.fillText(s, LEFT_CORNER.x + 76, y, 440);
      y += 80;
    });

    const DATE_Y = height * 2 - 140;
    ctx.setFontSize(24);
    ctx.fillText(this.data.time, LEFT_CORNER.x + 160, DATE_Y);

    ctx.moveTo(LEFT_CORNER.x, LEFT_CORNER.y);
    ctx.setFillStyle('#F9B84F');
    ctx.arc(LEFT_CORNER.x, LEFT_CORNER.y, 30, 0, 2 * Math.PI);
    ctx.moveTo(LEFT_CORNER.x + WIDTH / 2, LEFT_CORNER.y);
    ctx.arc(LEFT_CORNER.x + WIDTH / 2, LEFT_CORNER.y, 30, 0, 2 * Math.PI);
    ctx.moveTo(LEFT_CORNER.x + WIDTH, LEFT_CORNER.y);
    ctx.arc(LEFT_CORNER.x + WIDTH, LEFT_CORNER.y, 30, 0, 2 * Math.PI);

    ctx.moveTo(LEFT_CORNER.x, DATE_Y);
    ctx.arc(LEFT_CORNER.x, DATE_Y, 19, 0, 2 * Math.PI);
    ctx.moveTo(LEFT_CORNER.x, DATE_Y);
    ctx.arc(LEFT_CORNER.x + WIDTH, DATE_Y, 19, 0, 2 * Math.PI);

    ctx.fill();

    ctx.draw();
  },

  save() {
    wx.canvasToTempFilePath({
      canvasId: 'songs',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.showToast({
              title: '已保存到相册',
              icon: 'success',
              duration: 2000
            })
          }
        });
      }
    })
  }
})