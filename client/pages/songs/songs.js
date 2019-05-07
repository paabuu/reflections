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
    time: formatTime(new Date()),
    hasDownloaded: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      songs: globalData.songs
    });

    const extraHeight = globalData.songs.length > 9 ? 40 * (globalData.songs.length - 9) : 0;
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          width: res.windowWidth,
          height: res.windowHeight + extraHeight
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
    });
    wx.loadFontFace({
      family: 'FZBWKSFT',
      source: 'url("https://greatwhole90.com/overcook/reflection/assets/fonts/FZBWKSFT.ttf")',
      success: console.log
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
  },

  draw() {
    const ctx = wx.createCanvasContext('songs');
    let { width, height, songs }  = this.data;
    const LEFT_CORNER = { x: 50, y: 100 };
    const WIDTH = 650;
    const PADDING = 66;

    // if (songs.length > 9) {
    //   height += 40 * (songs.length - 9);
    // }

    let y = LEFT_CORNER.y; // 高度累计

    // 背景
    ctx.setFillStyle('#FFFFFF');
    ctx.fillRect(0, 0, width, height);

    // const grd = ctx.createLinearGradient(0, 0, 532, 400);
    // grd.addColorStop(0, '#FFF6E5')
    // grd.addColorStop(1, '#FADFAD')


    ctx.scale(0.5, 0.5);
    // ctx.setFillStyle('#FFF6E5');
    // ctx.fillRect(LEFT_CORNER.x, LEFT_CORNER.y, WIDTH, height * 2 - 140);

    ctx.drawImage('../../assets/p5/header1.png', 0, 0, 591, 48, 177, y, 403, 38)
    
    y += 150;
    ctx.drawImage('../../assets/p6/header2.png', 0, 0, 132, 66, 300, y, 120, 60)

    y += 100;
    ctx.moveTo(50, y);
    ctx.lineTo(700, y);
    ctx.stroke();

    y += 120;
    ctx.setFontSize(30);
    ctx.setTextAlign('left');
    ctx.setFillStyle('#000');
    songs.forEach(s => {
      ctx.fillText(s, 50, y, 650);
      y += 80;
    });

    const DATE_Y = height * 2 - 60;
    ctx.setFontSize(24);
    ctx.fillText(this.data.time, 260, DATE_Y);

    ctx.drawImage('../../assets/p6/footer.png', 0, 0, 801, 57, 100, height * 2 - 48, 538, 48)

    // ctx.moveTo(LEFT_CORNER.x, LEFT_CORNER.y);
    // ctx.setFillStyle('#F9B84F');
    // ctx.arc(LEFT_CORNER.x, LEFT_CORNER.y, 30, 0, 2 * Math.PI);
    // ctx.moveTo(LEFT_CORNER.x + WIDTH / 2, LEFT_CORNER.y);
    // ctx.arc(LEFT_CORNER.x + WIDTH / 2, LEFT_CORNER.y, 30, 0, 2 * Math.PI);
    // ctx.moveTo(LEFT_CORNER.x + WIDTH, LEFT_CORNER.y);
    // ctx.arc(LEFT_CORNER.x + WIDTH, LEFT_CORNER.y, 30, 0, 2 * Math.PI);

    // ctx.moveTo(LEFT_CORNER.x, DATE_Y);
    // ctx.arc(LEFT_CORNER.x, DATE_Y, 19, 0, 2 * Math.PI);
    // ctx.moveTo(LEFT_CORNER.x, DATE_Y);
    // ctx.arc(LEFT_CORNER.x + WIDTH, DATE_Y, 19, 0, 2 * Math.PI);

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
            });
            this.setData({
              hasDownloaded: true
            });
          }
        });
      }
    })
  }
})