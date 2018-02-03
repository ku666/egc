// 业主人数图表数据
let owenrOptionData = {
  title: {
    text: '业主画像',
    y: 'top',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    y: 'top',
    data: [] // data: ['20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100']
  },
  series: [{
    name: '参数',
    type: 'pie',
    radius: [0, '35%'],
    center: ['50%', '55%'],
    label: {
      normal: {
        position: 'inner'
      }
    },
    labelLine: {
      normal: {
        show: true
      }
    },
    data: [] // data: [{value: 1300, name: '女',selected: true }, {value: 1564, name: '男' }]
  }, {
    name: '参数',
    type: 'pie',
    radius: ['50%', '70%'],
    center: ['50%', '55%'],
    label: {
      normal: {
        formatter: '{b|{b}：}{c}  {per|{d}%}',
        backgroundColor: '#eee',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: '#999',
            lineHeight: 22,
            align: 'center'
          },
          hr: {
            borderColor: '#aaa',
            width: '100%',
            borderWidth: 0.5,
            height: 0
          },
          b: {
            fontSize: 14,
            lineHeight: 24
          },
          per: {
            color: '#eee',
            backgroundColor: '#334455',
            padding: [2, 4],
            borderRadius: 2
          }
        }
      }
    },
    data: [] // data: [{value: 335, name: '20-30' }, {value: 310, name: '30-40' }, { value: 234, name: '40-50'}]
  }]
}
// 出入频率图表数据
let rateOptionData = {
  title: {
    text: '业主出入率'
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
  toolbox: {
    right: '15',
    feature: {
      magicType: {
        type: ['line', 'bar']
      },
      saveAsImage: {
        show: true,
        right: '20'
      }
    }
  },
  dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
    start: 0, // 左边在 10% 的位置。
    // end: 10 // 滑块结束位置设置。
    // end: this.form.dateList.length > 31 ? 10 : 100 // 滑块结束位置设置。
    end: 20
  }, { // 这个dataZoom组件，也控制x轴。
    type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
    start: 10, // 左边在 10% 的位置。
    end: 60 // 右边在 60% 的位置。
  }],
  legend: {
    x: 'center',
    data: ['进入次数', '出去次数']
  },
  xAxis: {
    type: 'category',
    data: [], // data: ['00:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
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
  series: [{
    name: '进入次数',
    type: 'line',
    smooth: true,
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 6,
    data: [], // data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
    areaStyle: {
      normal: {
        // color: new Vue.prototype.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //   offset: 0,
        //   color: 'rgba(199, 237, 250,0.5)'
        // }, {
        //   offset: 1,
        //   color: 'rgba(199, 237, 250,0.2)'
        // }], false)
      }
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
  }, {
    name: '出去次数',
    type: 'line',
    smooth: true,
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 6,
    data: [], // data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
    areaStyle: {
      normal: {
        // color: new Vue.prototype.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //   offset: 0,
        //   color: 'rgba(216, 244, 247,1)'
        // }, {
        //   offset: 1,
        //   color: 'rgba(216, 244, 247,1)'
        // }], false)
      }
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
  }]
}
let options = {
  owenrOptionData,
  rateOptionData
}
export default options
