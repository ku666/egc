// 车流、人流进出小区的图表数据
var initDataFunction = function (params) {
  var option = {
    title: {
      text: params.title,
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
      data: params.legarr
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
        end: 30
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 1,
        end: 30
      }
    ],
    xAxis: {
      type: 'category',
      data: params.timeData, // timeData
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
        name: params.legarr[0],
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: params.inData, // data1
        areaStyle: {
          normal: {}
        },
        itemStyle: {
          normal: {
            color: '#f7b851'
          }
        },
        lineStyle: {
          normal: {
            width: 3
          }
        }
      },
      {
        name: params.legarr[1],
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: params.outData, // data2
        areaStyle: {
          normal: {}
        },
        itemStyle: {
          normal: {
            color: '#58c8da'
          }
        },
        lineStyle: {
          normal: {
            width: 3
          }
        }
      }
    ]
  } // end option
  return option
}

var carObj = {
  title: '车行流量',
  legarr: ['进园车流量', '出园车流量'],
  colorarr: ['#f7b851', '#58c8da'],
  timeData: [],
  inData: [],
  outData: []
}

var peopleObj = {
  title: '人员流量',
  legarr: ['进园人流量', '出园人流量'],
  colorarr: ['#87CEFA', '#FFE4E1'],
  timeData: [],
  inData: [],
  outData: []
}

var caroption = initDataFunction(carObj)

var peopleoption = initDataFunction(peopleObj)

/**
 * 更新车流图表数据
 * @param {Array} data 时间点的数据 []
 */
export const updateCarData = function (tdata, indata, outdata) {
  caroption.xAxis.data = tdata
  caroption.series[0].data = indata
  caroption.series[1].data = outdata
  return caroption
}
/**
 * 更新人车流图表数据
 * @param {Array} data 人数的数据 []
 */
export const updatePeopleData = function (tdata, indata, outdata) {
  peopleoption.xAxis.data = tdata
  peopleoption.series[0].data = indata
  peopleoption.series[1].data = outdata
  return peopleoption
}
