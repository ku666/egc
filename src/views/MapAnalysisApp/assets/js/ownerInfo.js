// var app.title = '环形图';
var kindData = ['男', '女']
var ageLevelData = ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60以上']
var data = [] // { value: 335, name: '女' }, { value: 1548, name: '男' }
var optionSex = {
  title: {
    text: '社区男女比例',
    textStyle: {
      fontSize: '14',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  legend: {
    orient: 'horizontal',
    x: 'left',
    y: 'bottom',
    data: kindData
  },
  series: [
    {
      name: '社区男女比例',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '22',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: data
    }
  ]
}

// 小区人员年龄分布 数据
var ageData = [] // 182, 234, 290, 104, 131, 630, 80
var optionAge = {
  title: {
    text: '小区人员年龄分布',
    textStyle: {
      fontSize: '14',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
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
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ageLevelData
  },
  series: [
    {
      name: '年龄',
      type: 'bar',
      data: ageData
    }
  ]
}
/**
 * 更新业主年龄分段数据
 * @param {*} data 时间点的数据 []
 */
var updateAgeLevelData = function (data) {
  if (data instanceof Array && data.length > 0) {
    optionAge.yAxis.data = data
  }
}
/**
 * 更新小区业主性别占比数据
 * @param {*} data 人数的数据 []
 */
var updateSexData = function (data) {
  if (data instanceof Array && data.length > 0) {
    optionSex.series[0].data = data
  }
}
/**
 * 更新小区业主年龄段占比数据
 * @param {*} data 人数的数据 []
 */
var updateAgeData = function (data) {
  if (data instanceof Array && data.length > 0) {
    optionAge.series[0].data = data
  }
}
var ownerOption = {
  optionSex: optionSex,
  optionAge: optionAge,
  kindData: kindData,
  updateSexData: updateSexData,
  updateAgeLevelData: updateAgeLevelData,
  updateAgeData: updateAgeData
}
export default ownerOption
