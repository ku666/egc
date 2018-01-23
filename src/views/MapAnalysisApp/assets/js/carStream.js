var timeData = [] // '周一', '周二', '周三', '周四', '周五', '周六', '周日'
var data1 = [] // 120, 132, 101, 134, 90, 230, 210
var data2 = [] // 820, 932, 901, 934, 1290, 1330, 1320
var option = {
  title: {
    text: '车行流量',
    textStyle: {
      fontSize: '14',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['进园区流量', '出园区流量']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: timeData
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 10
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 1,
      end: 10
    }
  ],
  series: [
    {
      name: '进园区流量',
      type: 'line',
      smooth: true,
      stack: '总量',
      // areaStyle: { normal: {} },
      data: data1
    },
    {
      name: '出园区流量',
      type: 'line',
      smooth: true,
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      // areaStyle: { normal: {} },
      data: data2
    }
  ]
}

/**
 * 更新车行流量时间轴数据
 * @param {*} data 时间点的数据 []
 */
var updateTimeData = function (data) {
  if (data instanceof Array && data.length > 0) {
    option.xAxis.data = data
  }
}
/**
 * 更新车行入园流量数据
 * @param {*} data 人数的数据 []
 */
var updateInData = function (data) {
  if (data instanceof Array && data.length > 0) {
    option.series[0].data = data
  }
}
/**
 * 更新车行出园流量数据
 * @param {*} data 人数的数据 []
 */
var updateOutData = function (data) {
  if (data instanceof Array && data.length > 0) {
    option.series[1].data = data
  }
}

var carOption = {
  option: option,
  updateTimeData: updateTimeData,
  updateInData: updateInData,
  updateOutData: updateOutData
}
export default carOption
