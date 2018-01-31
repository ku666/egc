// 设备种类数据
var data = [
  // { value: 400, name: '搜索引擎' }
]
var option = {
  // backgroundColor: '#2c343c',
  title: {
    text: '小区设备种类',
    left: 'center',
    top: 5,
    textStyle: {
      // color: '#000',
      fontSize: '14',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  calculable: true,
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      // colorLightness: [0, 1]
    }
  },
  series: [
    {
      name: '小区设备',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      // selectedMode: 'single',
      data: data,
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: '#666'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: '#FF8C00'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200
      }
    }
  ]
}
/**
 * 更新人员入园流量数据
 * @param {*} data 人数的数据 []
 */
var updateData = function (data) {
  if (data instanceof Array && data.length > 0) {
    option.series[0].data = data.sort(function (a, b) {
      return a.value - b.value
    })
  }
}

var equipOption = {
  option: option,
  updateData: updateData
}
export default equipOption
