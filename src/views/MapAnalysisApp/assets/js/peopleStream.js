// 人流数据
var timeData = [] // '周一', '周二', '周三', '周四', '周五', '周六', '周日'
var data1 = [] // 120, 132, 101, 134, 90, 230, 210
var data2 = [] // 220, 182, 191, 234, 290, 330, 310
var option = {
  title: {
    text: '人员流量',
    textStyle: {
      fontSize: '14',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['入园人数', '出园人数']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: timeData
  },
  yAxis: {
    type: 'value'
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 5
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 1,
      end: 5
    }
  ],
  series: [
    {
      name: '入园人数',
      type: 'line',
      smooth: true,
      stack: '总量',
      data: data1
    },
    {
      name: '出园人数',
      type: 'line',
      smooth: true,
      stack: '总量',
      data: data2
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
