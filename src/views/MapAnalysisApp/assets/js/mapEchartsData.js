var data = [
  // { name: '海门', value: [121.15, 31.89, 9] },
  // { name: '鄂尔多斯', value: [109.781327, 39.608266, 12] },
  // { name: '招远', value: [120.38, 37.35, 12] },
  // { name: '舟山', value: [122.207216, 29.985295, 12] },
  // { name: '莱西', value: [120.53, 36.86, 23] },
  // { name: '南通', value: [121.05, 32.08, 23] },
  // { name: '拉萨', value: [91.11, 29.97, 24] },
  // { name: '云浮', value: [112.02, 22.93, 24] },
  // { name: '上海', value: [121.48, 31.22, 25] },
  // { name: '攀枝花', value: [101.718637, 26.582347, 25] },
  // { name: '承德', value: [117.93, 40.97, 25] },
  // { name: '威海', value: [122.1, 37.5, 25] },
  // { name: '汕尾', value: [115.375279, 22.786211, 26] },
  // { name: '丹东', value: [124.37, 40.13, 27] },
  // { name: '瓦房店', value: [121.979603, 39.627114, 30] },
  // { name: '延安', value: [109.47, 36.6, 38] },
  // { name: '咸阳', value: [108.72, 34.36, 43] },
  // { name: '南昌', value: [115.89, 28.68, 54] },
  // { name: '柳州', value: [109.4, 24.33, 54] },
  // { name: '三亚', value: [109.511909, 18.252847, 54] },
  // { name: '泸州', value: [105.39, 28.91, 57] },
  // { name: '克拉玛依', value: [84.77, 45.59, 72] }
]
var datachoose = [
  // { name: '齐齐哈尔', value: [123.97, 47.33, 14] },
  // { name: '盐城', value: [120.13, 33.38, 15] },
  // { name: '赤峰', value: [118.87, 42.28, 16] },
  // { name: '青岛', value: [120.33, 36.07, 18] },
  // { name: '乳山', value: [121.52, 36.89, 18] },
  // { name: '金昌', value: [102.188043, 38.520089, 19] },
  // { name: '泉州', value: [118.58, 24.93, 21] }
]
var provinceData = [
  { name: '北京', value: randomValue() },
  { name: '天津', value: randomValue() },
  { name: '上海', value: randomValue() },
  { name: '重庆', value: randomValue() },
  { name: '河北', value: randomValue() },
  { name: '河南', value: randomValue() },
  { name: '云南', value: randomValue() },
  { name: '辽宁', value: randomValue() },
  { name: '黑龙江', value: randomValue() },
  { name: '湖南', value: randomValue() },
  { name: '安徽', value: randomValue() },
  { name: '山东', value: randomValue() },
  { name: '新疆', value: randomValue() },
  { name: '江苏', value: randomValue() },
  { name: '浙江', value: randomValue() },
  { name: '江西', value: randomValue() },
  { name: '湖北', value: randomValue() },
  { name: '广西', value: randomValue() },
  { name: '甘肃', value: randomValue() },
  { name: '山西', value: randomValue() },
  { name: '内蒙古', value: randomValue() },
  { name: '陕西', value: randomValue() },
  { name: '吉林', value: randomValue() },
  { name: '福建', value: randomValue() },
  { name: '贵州', value: randomValue() },
  { name: '广东', value: randomValue() },
  { name: '青海', value: randomValue() },
  { name: '西藏', value: randomValue() },
  { name: '四川', value: randomValue() },
  { name: '宁夏', value: randomValue() },
  { name: '海南', value: randomValue() },
  { name: '台湾', value: randomValue() },
  { name: '香港', value: randomValue() },
  { name: '澳门', value: randomValue() }
]

var option = {
  title: {
    text: '全国恒大小区列表',
    x: 'center'
  },
  tooltip: {},
  visualMap: {
    min: 0,
    max: 1500,
    left: 'left',
    top: 'bottom',
    text: ['High', 'Low'],
    seriesIndex: [1],
    inRange: {
      color: ['#e0ffff', '#006edd']
    },
    calculable: true
  },
  geo: {
    map: 'china',
    roam: true,
    label: {
      normal: {
        show: true,
        textStyle: {
          color: 'rgba(0,0,0,0.4)'
        }
      }
    },
    itemStyle: {
      normal: {
        borderColor: 'rgba(0, 0, 0, 0.2)'
      },
      emphasis: {
        areaColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 20,
        borderWidth: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      data: data,
      symbolSize: 12,
      symbol: '', // 点的图片地址
      symbolRotate: 35,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#F06C00'
        }
      }
    },
    {
      name: '小区数量',
      type: 'map',
      geoIndex: 0,
      data: provinceData
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: datachoose, // 搜索出来的，需要强调显示的小区点位
      symbolSize: function (val) {
        return 20
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    }
  ]
}
/**
 * 更新地图散点数据
 * @param {*} data 点的数据
 * {
 *  name: '',
 *  value: [经度，纬度，数量]
 *  courtID: '小区id'
 * }
 */
var updateData = function (data) {
  if (data instanceof Array && data.length > 0) {
    option.series[0].data = data
  }
}
/**
 * 更新已选中的小区的数据
 * @param {*} data 选中的小区点的数据
 * {
 *  name: '',
 *  value: [经度，纬度，数量]
 *  courtID: '小区id'
 * }
 */
var updateChooseData = function (data) {
  if (data instanceof Array && data.length > 0) {
    option.series[2].data = data
  }
}

var mapData = {
  updateData: updateData,
  provinceData: provinceData,
  updateChooseData: updateChooseData,
  option: option
}

function randomValue () {
  // return 0
  return Math.round(Math.random() * 1000)
}

// window.mapData = mapData
export default mapData
