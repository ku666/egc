// 人流数据
var timeData = [] // '周一', '周二'
var data1 = [] // 120, 132
var data2 = [] // 220, 182
var option = {
  title: {
    text: '人员流量',
    textStyle: {
      fontSize: '14',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#ddd'
      }
    },
    backgroundColor: 'rgba(255,255,255,1)',
    padding: [5, 10],
    textStyle: {
      color: '#7588E4'
    },
    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
  },
  legend: {
    data: ['进园人流量', '出园人流量']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 100
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 1,
      end: 100
    }
  ],
  xAxis: {
    type: 'category',
    data: timeData,
    boundaryGap: false,
    splitLine: {
      show: true,
      interval: 'auto',
      lineStyle: {
        color: ['#D4DFF5']
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#609ee9'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: ['#D4DFF5']
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#609ee9'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    }
  },
  series: [
    {
      name: '进园人流量',
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 6,
      data: data1,
      areaStyle: {
        normal: {}
      },
      itemStyle: {
        normal: {
          color: '#87CEFA'
        }
      },
      lineStyle: {
        normal: {
          width: 3
        }
      }
    },
    {
      name: '出园人流量',
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 6,
      data: data2,
      areaStyle: {
        normal: {}
      },
      itemStyle: {
        normal: {
          color: '#FFE4E1'
        }
      },
      lineStyle: {
        normal: {
          width: 3
        }
      }
    }
  ]
}
/**
 * 更新人员流量时间轴数据
 * @param {*} data 时间点的数据 []
 */
var updateTimeData = function (data) {
  if (data instanceof Array && data.length > 0) {
    option.xAxis.data = data
  }
}
/**
 * 更新人员入园流量数据
 * @param {*} data 人数的数据 []
 */
var updateInData = function (data) {
  if (data instanceof Array && data.length > 0) {
    option.series[0].data = data
  }
}
/**
 * 更新人员出园流量数据
 * @param {*} data 人数的数据 []
 */
var updateOutData = function (data) {
  if (data instanceof Array && data.length > 0) {
    option.series[1].data = data
  }
}

var peopleOption = {
  option: option,
  updateTimeData: updateTimeData,
  updateInData: updateInData,
  updateOutData: updateOutData
}
export default peopleOption
