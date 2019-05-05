//app.js
const MENU = require('/assets/data/menu.js');
const TYPES = [
  { name: '主 食', key: 'zhushi' },
  { name: '热 炒', key: 'rechao' },
  { name: '粥 类', key: 'zhoulei' },
  { name: '汤 类', key: 'tanglei' },
  { name: '汉 堡', key: 'hanbao' },
  { name: '比 萨', key: 'bisa' },
  { name: '意 面', key: 'yimian' },
  { name: '小 吃', key: 'xiaochi' },
  { name: '小 食', key: 'xiaoshi' },
  { name: '甜 品', key: 'tianpin' },
  { name: '饮 品', key: 'yinpin' },
  { name: '酒 类', key: 'jiulei' },
];

let menu = {};
TYPES.forEach(t => {
  menu[t.key] = MENU[t.key].map((f, index) => ({
    ...f, 
    count: 0,
    id: `${t.key}_${index}`,
    imageUrl: `https://greatwhole90.com/overcook/reflection/assets/${t.key}/im_${index < 9 ? `0${index + 1}` : index + 1}@3x.png`
  }))
});

App({
  onLaunch: function () {
  },
  globalData: {
    menu,
    types: TYPES,
    orders: [],
    songs: []
  }
})