var data = [
]
var datachoose = [
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
  { name: '澳门', value: randomValue() },
  { name: '南海诸岛', value: randomValue() }
]

var option = {
  title: {
    text: '全国恒大小区列表',
    x: 'center'
  },
  tooltip: {
    formatter: '{b}<br/>{a} : {c}'
  },
  visualMap: {
    min: 0,
    max: 100,
    left: '90%',
    top: '40%',
    text: ['High', 'Low'],
    seriesIndex: [1],
    inRange: {
      color: [
        'LightSkyBlue',
        'lightgreen',
        'DeepSkyBlue',
        'LimeGreen'
      ]
    },
    calculable: true
  },
  geo: {
    map: 'china',
    roam: true,
    zoom: 1.2,
    scaleLimit: {
      min: 1,
      max: 6
    },
    label: {
      normal: {
        show: true,
        textStyle: {
          color: 'rgba(0,0,0,0.6)'
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
      tooltip: {
        trigger: 'item',
        formatter: '小区名称: {b}'
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false // 是否显示该散点的名称(这里为小区名称)
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
      name: '',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: datachoose, // 搜索出来的，需要强调显示的小区点位
      symbolSize: function (val) {
        return 20
      },
      tooltip: {
        trigger: 'item',
        formatter: '小区名称: {b}'
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
 * @param {Array} data 点的数据
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
 * @param {Array} data 选中的小区点的数据
 * {
 *  name: '',
 *  value: [经度，纬度，数量]
 *  courtID: '小区id'
 * }
 */
var updateChooseData = function (data) {
  if (data instanceof Array) {
    option.series[2].data = data
  }
}

/**
 * 更新全国各省拥有的小区数量
 * @param {Object} data
 * {
 *  name: '广东',
 *  value: 小区数量
 */
var updateProvinceData = function (data) {
  if (data instanceof Object) {
    var max = 0
    for (var i = 0, len = provinceData.length; i < len; i++) {
      for (var key in data) {
        if (key === provinceData[i].name) {
          provinceData[i].value = data[key].value
          provinceData[i].courts = data[key].courts
          if (data[key].value > max) max = data[key].value
        }
      }
    }
    option.series[1].data = provinceData
    option.visualMap.max = max
  }
}

var mapData = {
  updateData: updateData,
  updateChooseData: updateChooseData,
  option: option,
  updateProvinceData: updateProvinceData
}

function randomValue () {
  return 0
}

export default mapData
