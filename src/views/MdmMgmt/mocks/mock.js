import Mock from 'mockjs'

// Mock.setup({
//   timeout: '500-2000' // 表示响应时间介于 500 和 2000 毫秒之间，默认值是'10-100'。
// })

const MOCK_API_URL = '/scp-modelmgmtcomponent'

Mock.mock(MOCK_API_URL + '/model/list', function () {
  console.log('mock getTree')
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'total': 19,
      'pageSize': 1000,
      'list': [
        {'id': 1, 'name': '模型名称001', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 2, 'name': '模型名称002', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 3, 'name': '模型名称003', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 4, 'name': '模型名称004', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 5, 'name': '模型名称005', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 6, 'name': '模型名称006', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 7, 'name': '模型名称007', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 8, 'name': '模型名称008', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 9, 'name': '模型名称009', 'address': '这个是模型的描述信息', 'date': '2016-05-02'},
        {'id': 10, 'name': '模型名称010', 'address': '这个是模型的描述信息', 'date': '2016-05-02'}
      ],
      'currentPage': 1
    }
  }
})

Mock.mock(MOCK_API_URL + '/user/login', function () {
  return {
    'status': true,
    'code': 200,
    'message': null,
    'user': {
      userName: 'admin',
      sex: 1,
      age: 18
    }
  }
})

/*
Mock.mock(MOCK_API_URL+'/model/list?page=1&pageSize=10&name=&address=', function () {
  console.log('mock http://localhost:8088/user/list?page=1&pageSize=10&name=&address=')
  return {
    'status': true,
    'code': 200,
    'message': null,
    'data': {
      'total': 19,
      'pageSize': 1000,
      'list': [
        {'id': 1, 'name': '王小虎21_1', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'},
        {'id': 2, 'name': '王小虎21_2', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'},
        {'id': 3, 'name': '王小虎21_3', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'},
        {'id': 4, 'name': '王小虎21_4', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'},
        {'id': 5, 'name': '王小虎21_5', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'},
        {'id': 6, 'name': '王小虎21_6', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'},
        {'id': 7, 'name': '王小虎21_7', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'},
        {'id': 8, 'name': '王小虎21_8', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'},
        {'id': 9, 'name': '王小虎21_9', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'},
        {'id': 10, 'name': '王小虎21_10', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}
      ],
      'currentPage': 1
    }
  }
})
*/
