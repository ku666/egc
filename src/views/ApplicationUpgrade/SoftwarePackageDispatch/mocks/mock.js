import Mock from 'mockjs'

let contextPath = '/scp-upgradecomponent'

/** ====================硬件服务器信息================================ */

Mock.mock(contextPath + '/aupackagedispatches/listCourts', function () {
  console.log('软件下发mock数据 -->   ')
  return {
    testData: [{
      'pageNo': 1,
      'pageSize': 10,
      'batchId': null,
      'batchName': '软件包1.0更新',
      'packageDataList': [
        {
          'pageNo': 1,
          'pageSize': 10,
          'packageId': null,
          'packageDispNo': '2',
          'name': '王者荣耀1.0.jar',
          'version': '1.0.0',
          'provider': '腾讯有限公司',
          'hostname': 'server name 1',
          'path': '/tmp/upgrade',
          'registerTime': '2017-01-02 12:30:00',
          'register': 'SystemAdmin',
          'lastestPreName': '仙剑奇缘',
          'latestPreVer': '0.09',
          'remark': '本版本纯粹为了测试，没有任何意义！'
        },
        {
          'pageNo': 1,
          'pageSize': 10,
          'packageId': null,
          'packageDispNo': '2',
          'name': '霜之哀伤.jar',
          'version': '1.0.0',
          'provider': 'Blizza Co. Ltd. ',
          'hostname': 'server name 1',
          'path': '/tmp/upgrade',
          'registerTime': '2010-12-12 00:20:30',
          'register': '系统管理员',
          'lastestPreName': '绝地求生',
          'latestPreVer': '0.02',
          'remark': '本版本是为了SIT做准备，毫无任何意义！'
        }
      ]
    }]
  }
})

Mock.mock(contextPath + '/aupackagedispatches/listOrgTree', function () {
  console.log('软件下发mock数据 -->   ')
  return {
    testData: [
      {
        'uuid': '1321313131313213131313213123213',
        'province': '广东省',
        'label': '广东省',
        'provinceAbbr': 'gds',
        'labelAbbr': 'gds',
        'cityList': [
          {
            'city': '深圳市',
            'label': '深圳市',
            'cityAbbr': 'szs',
            'labelAbbr': 'szs',
            'districtList': [
              {
                'district': '盐田区',
                'label': '盐田区',
                'districtAbbr': 'ytq',
                'labelAbbr': 'ytq',
                'courtList': [
                  {
                    'courtUid': '7deffc718bc748c180dae0d30e159324',
                    'courtName': '恒大小桂湾',
                    'label': '恒大小桂湾',
                    'courtNameAbbr': 'hdxgw',
                    'labelAbbr': 'hdxgw'
                  }
                ],
                'children': [
                  {
                    'courtUid': '7deffc718bc748c180dae0d30e159324',
                    'courtName': '恒大小桂湾',
                    'label': '恒大小桂湾',
                    'courtNameAbbr': 'hdxgw',
                    'labelAbbr': 'hdxgw'
                  }
                ]
              },
              {
                'district': '福田区',
                'label': '福田区',
                'districtAbbr': 'ftq',
                'labelAbbr': 'ftq',
                'courtList': [
                  {
                    'courtUid': '222b79f4a7b44d03b6f55f028992851f',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ],
                'children': [
                  {
                    'courtUid': '222b79f4a7b44d03b6f55f028992851f',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ]
              },
              {
                'district': '宝安区',
                'label': '宝安区',
                'districtAbbr': 'ba',
                'labelAbbr': 'ba',
                'courtList': [
                  {
                    'courtUid': '0c1ba49c74774414a21ce91b66b79a2d',
                    'courtName': '锦秀江南',
                    'label': '锦秀江南',
                    'courtNameAbbr': 'jxjn',
                    'labelAbbr': 'jxjn'
                  }
                ],
                'children': [
                  {
                    'courtUid': '0c1ba49c74774414a21ce91b66b79a2d',
                    'courtName': '锦秀江南',
                    'label': '锦秀江南',
                    'courtNameAbbr': 'jxjn',
                    'labelAbbr': 'jxjn'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '盐田区',
                'label': '盐田区',
                'districtAbbr': 'ytq',
                'labelAbbr': 'ytq',
                'courtList': [
                  {
                    'courtUid': '7deffc718bc748c180dae0d30e159324',
                    'courtName': '恒大小桂湾',
                    'label': '恒大小桂湾',
                    'courtNameAbbr': 'hdxgw',
                    'labelAbbr': 'hdxgw'
                  }
                ],
                'children': [
                  {
                    'courtUid': '7deffc718bc748c180dae0d30e159324',
                    'courtName': '恒大小桂湾',
                    'label': '恒大小桂湾',
                    'courtNameAbbr': 'hdxgw',
                    'labelAbbr': 'hdxgw'
                  }
                ]
              },
              {
                'district': '福田区',
                'label': '福田区',
                'districtAbbr': 'ftq',
                'labelAbbr': 'ftq',
                'courtList': [
                  {
                    'courtUid': '222b79f4a7b44d03b6f55f028992851f',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ],
                'children': [
                  {
                    'courtUid': '222b79f4a7b44d03b6f55f028992851f',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ]
              },
              {
                'district': '宝安区',
                'label': '宝安区',
                'districtAbbr': 'ba',
                'labelAbbr': 'ba',
                'courtList': [
                  {
                    'courtUid': '0c1ba49c74774414a21ce91b66b79a2d',
                    'courtName': '锦秀江南',
                    'label': '锦秀江南',
                    'courtNameAbbr': 'jxjn',
                    'labelAbbr': 'jxjn'
                  }
                ],
                'children': [
                  {
                    'courtUid': '0c1ba49c74774414a21ce91b66b79a2d',
                    'courtName': '锦秀江南',
                    'label': '锦秀江南',
                    'courtNameAbbr': 'jxjn',
                    'labelAbbr': 'jxjn'
                  }
                ]
              }
            ]
          },
          {
            'city': '广州市',
            'label': '广州市',
            'cityAbbr': 'gzs',
            'labelAbbr': 'gzs',
            'districtList': [
              {
                'district': '增城区',
                'label': '增城区',
                'districtAbbr': 'zcq',
                'labelAbbr': 'zcq',
                'courtList': [
                  {
                    'courtUid': '4c12aee6d522412fa8d9d47d6a39cc82',
                    'courtName': '增城恒大山水城',
                    'label': '增城恒大山水城',
                    'courtNameAbbr': 'zchdssc',
                    'labelAbbr': 'zchdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4c12aee6d522412fa8d9d47d6a39cc82',
                    'courtName': '增城恒大山水城',
                    'label': '增城恒大山水城',
                    'courtNameAbbr': 'zchdssc',
                    'labelAbbr': 'zchdssc'
                  }
                ]
              },
              {
                'district': '海珠区',
                'label': '海珠区',
                'districtAbbr': 'hzq',
                'labelAbbr': 'hzq',
                'courtList': [
                  {
                    'courtUid': '5b582ec922814be780c926629cf8dee7',
                    'courtName': '阳光斯坦福',
                    'label': '阳光斯坦福',
                    'courtNameAbbr': 'ygstf',
                    'labelAbbr': 'ygstf'
                  },
                  {
                    'courtUid': '66063674755d4a3caff989b1e2d76e7c',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5b582ec922814be780c926629cf8dee7',
                    'courtName': '阳光斯坦福',
                    'label': '阳光斯坦福',
                    'courtNameAbbr': 'ygstf',
                    'labelAbbr': 'ygstf'
                  },
                  {
                    'courtUid': '66063674755d4a3caff989b1e2d76e7c',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              },
              {
                'district': '从化市',
                'label': '从化市',
                'districtAbbr': 'chs',
                'labelAbbr': 'chs',
                'courtList': [
                  {
                    'courtUid': '6307ad8e16034b39bbf981817ce46db3',
                    'courtName': '荣上居',
                    'label': '荣上居',
                    'courtNameAbbr': 'rsj',
                    'labelAbbr': 'rsj'
                  }
                ],
                'children': [
                  {
                    'courtUid': '6307ad8e16034b39bbf981817ce46db3',
                    'courtName': '荣上居',
                    'label': '荣上居',
                    'courtNameAbbr': 'rsj',
                    'labelAbbr': 'rsj'
                  }
                ]
              },
              {
                'district': '南沙区',
                'label': '南沙区',
                'districtAbbr': 'nsq',
                'labelAbbr': 'nsq',
                'courtList': [
                  {
                    'courtUid': 'c70aeede4f6341929721e2832beec3ca',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'c70aeede4f6341929721e2832beec3ca',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ]
              },
              {
                'district': '越秀区',
                'label': '越秀区',
                'districtAbbr': 'yxq',
                'labelAbbr': 'yxq',
                'courtList': [
                  {
                    'courtUid': '311dfd7cdbe04ff0890c0b42dd49612d',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '311dfd7cdbe04ff0890c0b42dd49612d',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ]
              },
              {
                'district': '增城市',
                'label': '增城市',
                'districtAbbr': 'zcs',
                'labelAbbr': 'zcs',
                'courtList': [
                  {
                    'courtUid': 'c69aeede4f6341929721e2892beec3cb',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'c69aeede4f6341929721e2892beec3cb',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '增城区',
                'label': '增城区',
                'districtAbbr': 'zcq',
                'labelAbbr': 'zcq',
                'courtList': [
                  {
                    'courtUid': '4c12aee6d522412fa8d9d47d6a39cc82',
                    'courtName': '增城恒大山水城',
                    'label': '增城恒大山水城',
                    'courtNameAbbr': 'zchdssc',
                    'labelAbbr': 'zchdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4c12aee6d522412fa8d9d47d6a39cc82',
                    'courtName': '增城恒大山水城',
                    'label': '增城恒大山水城',
                    'courtNameAbbr': 'zchdssc',
                    'labelAbbr': 'zchdssc'
                  }
                ]
              },
              {
                'district': '海珠区',
                'label': '海珠区',
                'districtAbbr': 'hzq',
                'labelAbbr': 'hzq',
                'courtList': [
                  {
                    'courtUid': '5b582ec922814be780c926629cf8dee7',
                    'courtName': '阳光斯坦福',
                    'label': '阳光斯坦福',
                    'courtNameAbbr': 'ygstf',
                    'labelAbbr': 'ygstf'
                  },
                  {
                    'courtUid': '66063674755d4a3caff989b1e2d76e7c',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5b582ec922814be780c926629cf8dee7',
                    'courtName': '阳光斯坦福',
                    'label': '阳光斯坦福',
                    'courtNameAbbr': 'ygstf',
                    'labelAbbr': 'ygstf'
                  },
                  {
                    'courtUid': '66063674755d4a3caff989b1e2d76e7c',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              },
              {
                'district': '从化市',
                'label': '从化市',
                'districtAbbr': 'chs',
                'labelAbbr': 'chs',
                'courtList': [
                  {
                    'courtUid': '6307ad8e16034b39bbf981817ce46db3',
                    'courtName': '荣上居',
                    'label': '荣上居',
                    'courtNameAbbr': 'rsj',
                    'labelAbbr': 'rsj'
                  }
                ],
                'children': [
                  {
                    'courtUid': '6307ad8e16034b39bbf981817ce46db3',
                    'courtName': '荣上居',
                    'label': '荣上居',
                    'courtNameAbbr': 'rsj',
                    'labelAbbr': 'rsj'
                  }
                ]
              },
              {
                'district': '南沙区',
                'label': '南沙区',
                'districtAbbr': 'nsq',
                'labelAbbr': 'nsq',
                'courtList': [
                  {
                    'courtUid': 'c70aeede4f6341929721e2832beec3ca',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'c70aeede4f6341929721e2832beec3ca',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ]
              },
              {
                'district': '越秀区',
                'label': '越秀区',
                'districtAbbr': 'yxq',
                'labelAbbr': 'yxq',
                'courtList': [
                  {
                    'courtUid': '311dfd7cdbe04ff0890c0b42dd49612d',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '311dfd7cdbe04ff0890c0b42dd49612d',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ]
              },
              {
                'district': '增城市',
                'label': '增城市',
                'districtAbbr': 'zcs',
                'labelAbbr': 'zcs',
                'courtList': [
                  {
                    'courtUid': 'c69aeede4f6341929721e2892beec3cb',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'c69aeede4f6341929721e2892beec3cb',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ]
              }
            ]
          },
          {
            'city': '东莞市',
            'label': '东莞市',
            'cityAbbr': 'dws',
            'labelAbbr': 'dws',
            'districtList': [
              {
                'district': '莞城',
                'label': '莞城',
                'districtAbbr': 'wc',
                'labelAbbr': 'wc',
                'courtList': [
                  {
                    'courtUid': 'b5e86a5c951c4d30a653ec964364664d',
                    'courtName': '金坛金谷华城',
                    'label': '金坛金谷华城',
                    'courtNameAbbr': 'jtjghc',
                    'labelAbbr': 'jtjghc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'b5e86a5c951c4d30a653ec964364664d',
                    'courtName': '金坛金谷华城',
                    'label': '金坛金谷华城',
                    'courtNameAbbr': 'jtjghc',
                    'labelAbbr': 'jtjghc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '莞城',
                'label': '莞城',
                'districtAbbr': 'wc',
                'labelAbbr': 'wc',
                'courtList': [
                  {
                    'courtUid': 'b5e86a5c951c4d30a653ec964364664d',
                    'courtName': '金坛金谷华城',
                    'label': '金坛金谷华城',
                    'courtNameAbbr': 'jtjghc',
                    'labelAbbr': 'jtjghc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'b5e86a5c951c4d30a653ec964364664d',
                    'courtName': '金坛金谷华城',
                    'label': '金坛金谷华城',
                    'courtNameAbbr': 'jtjghc',
                    'labelAbbr': 'jtjghc'
                  }
                ]
              }
            ]
          },
          {
            'city': '江门市',
            'label': '江门市',
            'cityAbbr': 'jms',
            'labelAbbr': 'jms',
            'districtList': [
              {
                'district': '鹤山市',
                'label': '鹤山市',
                'districtAbbr': 'hss',
                'labelAbbr': 'hss',
                'courtList': [
                  {
                    'courtUid': '37ba2b46513f470b92c44ee05392fe18',
                    'courtName': '市聚福园',
                    'label': '市聚福园',
                    'courtNameAbbr': 'sjfy',
                    'labelAbbr': 'sjfy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '37ba2b46513f470b92c44ee05392fe18',
                    'courtName': '市聚福园',
                    'label': '市聚福园',
                    'courtNameAbbr': 'sjfy',
                    'labelAbbr': 'sjfy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '鹤山市',
                'label': '鹤山市',
                'districtAbbr': 'hss',
                'labelAbbr': 'hss',
                'courtList': [
                  {
                    'courtUid': '37ba2b46513f470b92c44ee05392fe18',
                    'courtName': '市聚福园',
                    'label': '市聚福园',
                    'courtNameAbbr': 'sjfy',
                    'labelAbbr': 'sjfy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '37ba2b46513f470b92c44ee05392fe18',
                    'courtName': '市聚福园',
                    'label': '市聚福园',
                    'courtNameAbbr': 'sjfy',
                    'labelAbbr': 'sjfy'
                  }
                ]
              }
            ]
          },
          {
            'city': '珠海市',
            'label': '珠海市',
            'cityAbbr': 'zhs',
            'labelAbbr': 'zhs',
            'districtList': [
              {
                'district': '金湾区',
                'label': '金湾区',
                'districtAbbr': 'jwq',
                'labelAbbr': 'jwq',
                'courtList': [
                  {
                    'courtUid': '1b9f77dfbaba4511a26c4d9aec314aa4',
                    'courtName': '瑞雪华庭',
                    'label': '瑞雪华庭',
                    'courtNameAbbr': 'rxht',
                    'labelAbbr': 'rxht'
                  }
                ],
                'children': [
                  {
                    'courtUid': '1b9f77dfbaba4511a26c4d9aec314aa4',
                    'courtName': '瑞雪华庭',
                    'label': '瑞雪华庭',
                    'courtNameAbbr': 'rxht',
                    'labelAbbr': 'rxht'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '金湾区',
                'label': '金湾区',
                'districtAbbr': 'jwq',
                'labelAbbr': 'jwq',
                'courtList': [
                  {
                    'courtUid': '1b9f77dfbaba4511a26c4d9aec314aa4',
                    'courtName': '瑞雪华庭',
                    'label': '瑞雪华庭',
                    'courtNameAbbr': 'rxht',
                    'labelAbbr': 'rxht'
                  }
                ],
                'children': [
                  {
                    'courtUid': '1b9f77dfbaba4511a26c4d9aec314aa4',
                    'courtName': '瑞雪华庭',
                    'label': '瑞雪华庭',
                    'courtNameAbbr': 'rxht',
                    'labelAbbr': 'rxht'
                  }
                ]
              }
            ]
          },
          {
            'city': '湛江市',
            'label': '湛江市',
            'cityAbbr': 'zjs',
            'labelAbbr': 'zjs',
            'districtList': [
              {
                'district': '吴川市',
                'label': '吴川市',
                'districtAbbr': 'wcs',
                'labelAbbr': 'wcs',
                'courtList': [
                  {
                    'courtUid': '302afb47df444a998d61585c2138de3d',
                    'courtName': '北苑家园',
                    'label': '北苑家园',
                    'courtNameAbbr': 'byjy',
                    'labelAbbr': 'byjy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '302afb47df444a998d61585c2138de3d',
                    'courtName': '北苑家园',
                    'label': '北苑家园',
                    'courtNameAbbr': 'byjy',
                    'labelAbbr': 'byjy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '吴川市',
                'label': '吴川市',
                'districtAbbr': 'wcs',
                'labelAbbr': 'wcs',
                'courtList': [
                  {
                    'courtUid': '302afb47df444a998d61585c2138de3d',
                    'courtName': '北苑家园',
                    'label': '北苑家园',
                    'courtNameAbbr': 'byjy',
                    'labelAbbr': 'byjy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '302afb47df444a998d61585c2138de3d',
                    'courtName': '北苑家园',
                    'label': '北苑家园',
                    'courtNameAbbr': 'byjy',
                    'labelAbbr': 'byjy'
                  }
                ]
              }
            ]
          },
          {
            'city': '惠州市',
            'label': '惠州市',
            'cityAbbr': 'hzs',
            'labelAbbr': 'hzs',
            'districtList': [
              {
                'district': '惠阳区',
                'label': '惠阳区',
                'districtAbbr': 'hyq',
                'labelAbbr': 'hyq',
                'courtList': [
                  {
                    'courtUid': '7c0d6807745c400bb4c45940f61153c6',
                    'courtName': '建东苑',
                    'label': '建东苑',
                    'courtNameAbbr': 'jdy',
                    'labelAbbr': 'jdy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '7c0d6807745c400bb4c45940f61153c6',
                    'courtName': '建东苑',
                    'label': '建东苑',
                    'courtNameAbbr': 'jdy',
                    'labelAbbr': 'jdy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '惠阳区',
                'label': '惠阳区',
                'districtAbbr': 'hyq',
                'labelAbbr': 'hyq',
                'courtList': [
                  {
                    'courtUid': '7c0d6807745c400bb4c45940f61153c6',
                    'courtName': '建东苑',
                    'label': '建东苑',
                    'courtNameAbbr': 'jdy',
                    'labelAbbr': 'jdy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '7c0d6807745c400bb4c45940f61153c6',
                    'courtName': '建东苑',
                    'label': '建东苑',
                    'courtNameAbbr': 'jdy',
                    'labelAbbr': 'jdy'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '深圳市',
            'label': '深圳市',
            'cityAbbr': 'szs',
            'labelAbbr': 'szs',
            'districtList': [
              {
                'district': '盐田区',
                'label': '盐田区',
                'districtAbbr': 'ytq',
                'labelAbbr': 'ytq',
                'courtList': [
                  {
                    'courtUid': '7deffc718bc748c180dae0d30e159324',
                    'courtName': '恒大小桂湾',
                    'label': '恒大小桂湾',
                    'courtNameAbbr': 'hdxgw',
                    'labelAbbr': 'hdxgw'
                  }
                ],
                'children': [
                  {
                    'courtUid': '7deffc718bc748c180dae0d30e159324',
                    'courtName': '恒大小桂湾',
                    'label': '恒大小桂湾',
                    'courtNameAbbr': 'hdxgw',
                    'labelAbbr': 'hdxgw'
                  }
                ]
              },
              {
                'district': '福田区',
                'label': '福田区',
                'districtAbbr': 'ftq',
                'labelAbbr': 'ftq',
                'courtList': [
                  {
                    'courtUid': '222b79f4a7b44d03b6f55f028992851f',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ],
                'children': [
                  {
                    'courtUid': '222b79f4a7b44d03b6f55f028992851f',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ]
              },
              {
                'district': '宝安区',
                'label': '宝安区',
                'districtAbbr': 'ba',
                'labelAbbr': 'ba',
                'courtList': [
                  {
                    'courtUid': '0c1ba49c74774414a21ce91b66b79a2d',
                    'courtName': '锦秀江南',
                    'label': '锦秀江南',
                    'courtNameAbbr': 'jxjn',
                    'labelAbbr': 'jxjn'
                  }
                ],
                'children': [
                  {
                    'courtUid': '0c1ba49c74774414a21ce91b66b79a2d',
                    'courtName': '锦秀江南',
                    'label': '锦秀江南',
                    'courtNameAbbr': 'jxjn',
                    'labelAbbr': 'jxjn'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '盐田区',
                'label': '盐田区',
                'districtAbbr': 'ytq',
                'labelAbbr': 'ytq',
                'courtList': [
                  {
                    'courtUid': '7deffc718bc748c180dae0d30e159324',
                    'courtName': '恒大小桂湾',
                    'label': '恒大小桂湾',
                    'courtNameAbbr': 'hdxgw',
                    'labelAbbr': 'hdxgw'
                  }
                ],
                'children': [
                  {
                    'courtUid': '7deffc718bc748c180dae0d30e159324',
                    'courtName': '恒大小桂湾',
                    'label': '恒大小桂湾',
                    'courtNameAbbr': 'hdxgw',
                    'labelAbbr': 'hdxgw'
                  }
                ]
              },
              {
                'district': '福田区',
                'label': '福田区',
                'districtAbbr': 'ftq',
                'labelAbbr': 'ftq',
                'courtList': [
                  {
                    'courtUid': '222b79f4a7b44d03b6f55f028992851f',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ],
                'children': [
                  {
                    'courtUid': '222b79f4a7b44d03b6f55f028992851f',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ]
              },
              {
                'district': '宝安区',
                'label': '宝安区',
                'districtAbbr': 'ba',
                'labelAbbr': 'ba',
                'courtList': [
                  {
                    'courtUid': '0c1ba49c74774414a21ce91b66b79a2d',
                    'courtName': '锦秀江南',
                    'label': '锦秀江南',
                    'courtNameAbbr': 'jxjn',
                    'labelAbbr': 'jxjn'
                  }
                ],
                'children': [
                  {
                    'courtUid': '0c1ba49c74774414a21ce91b66b79a2d',
                    'courtName': '锦秀江南',
                    'label': '锦秀江南',
                    'courtNameAbbr': 'jxjn',
                    'labelAbbr': 'jxjn'
                  }
                ]
              }
            ]
          },
          {
            'city': '广州市',
            'label': '广州市',
            'cityAbbr': 'gzs',
            'labelAbbr': 'gzs',
            'districtList': [
              {
                'district': '增城区',
                'label': '增城区',
                'districtAbbr': 'zcq',
                'labelAbbr': 'zcq',
                'courtList': [
                  {
                    'courtUid': '4c12aee6d522412fa8d9d47d6a39cc82',
                    'courtName': '增城恒大山水城',
                    'label': '增城恒大山水城',
                    'courtNameAbbr': 'zchdssc',
                    'labelAbbr': 'zchdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4c12aee6d522412fa8d9d47d6a39cc82',
                    'courtName': '增城恒大山水城',
                    'label': '增城恒大山水城',
                    'courtNameAbbr': 'zchdssc',
                    'labelAbbr': 'zchdssc'
                  }
                ]
              },
              {
                'district': '海珠区',
                'label': '海珠区',
                'districtAbbr': 'hzq',
                'labelAbbr': 'hzq',
                'courtList': [
                  {
                    'courtUid': '5b582ec922814be780c926629cf8dee7',
                    'courtName': '阳光斯坦福',
                    'label': '阳光斯坦福',
                    'courtNameAbbr': 'ygstf',
                    'labelAbbr': 'ygstf'
                  },
                  {
                    'courtUid': '66063674755d4a3caff989b1e2d76e7c',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5b582ec922814be780c926629cf8dee7',
                    'courtName': '阳光斯坦福',
                    'label': '阳光斯坦福',
                    'courtNameAbbr': 'ygstf',
                    'labelAbbr': 'ygstf'
                  },
                  {
                    'courtUid': '66063674755d4a3caff989b1e2d76e7c',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              },
              {
                'district': '从化市',
                'label': '从化市',
                'districtAbbr': 'chs',
                'labelAbbr': 'chs',
                'courtList': [
                  {
                    'courtUid': '6307ad8e16034b39bbf981817ce46db3',
                    'courtName': '荣上居',
                    'label': '荣上居',
                    'courtNameAbbr': 'rsj',
                    'labelAbbr': 'rsj'
                  }
                ],
                'children': [
                  {
                    'courtUid': '6307ad8e16034b39bbf981817ce46db3',
                    'courtName': '荣上居',
                    'label': '荣上居',
                    'courtNameAbbr': 'rsj',
                    'labelAbbr': 'rsj'
                  }
                ]
              },
              {
                'district': '南沙区',
                'label': '南沙区',
                'districtAbbr': 'nsq',
                'labelAbbr': 'nsq',
                'courtList': [
                  {
                    'courtUid': 'c70aeede4f6341929721e2832beec3ca',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'c70aeede4f6341929721e2832beec3ca',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ]
              },
              {
                'district': '越秀区',
                'label': '越秀区',
                'districtAbbr': 'yxq',
                'labelAbbr': 'yxq',
                'courtList': [
                  {
                    'courtUid': '311dfd7cdbe04ff0890c0b42dd49612d',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '311dfd7cdbe04ff0890c0b42dd49612d',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ]
              },
              {
                'district': '增城市',
                'label': '增城市',
                'districtAbbr': 'zcs',
                'labelAbbr': 'zcs',
                'courtList': [
                  {
                    'courtUid': 'c69aeede4f6341929721e2892beec3cb',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'c69aeede4f6341929721e2892beec3cb',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '增城区',
                'label': '增城区',
                'districtAbbr': 'zcq',
                'labelAbbr': 'zcq',
                'courtList': [
                  {
                    'courtUid': '4c12aee6d522412fa8d9d47d6a39cc82',
                    'courtName': '增城恒大山水城',
                    'label': '增城恒大山水城',
                    'courtNameAbbr': 'zchdssc',
                    'labelAbbr': 'zchdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4c12aee6d522412fa8d9d47d6a39cc82',
                    'courtName': '增城恒大山水城',
                    'label': '增城恒大山水城',
                    'courtNameAbbr': 'zchdssc',
                    'labelAbbr': 'zchdssc'
                  }
                ]
              },
              {
                'district': '海珠区',
                'label': '海珠区',
                'districtAbbr': 'hzq',
                'labelAbbr': 'hzq',
                'courtList': [
                  {
                    'courtUid': '5b582ec922814be780c926629cf8dee7',
                    'courtName': '阳光斯坦福',
                    'label': '阳光斯坦福',
                    'courtNameAbbr': 'ygstf',
                    'labelAbbr': 'ygstf'
                  },
                  {
                    'courtUid': '66063674755d4a3caff989b1e2d76e7c',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5b582ec922814be780c926629cf8dee7',
                    'courtName': '阳光斯坦福',
                    'label': '阳光斯坦福',
                    'courtNameAbbr': 'ygstf',
                    'labelAbbr': 'ygstf'
                  },
                  {
                    'courtUid': '66063674755d4a3caff989b1e2d76e7c',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              },
              {
                'district': '从化市',
                'label': '从化市',
                'districtAbbr': 'chs',
                'labelAbbr': 'chs',
                'courtList': [
                  {
                    'courtUid': '6307ad8e16034b39bbf981817ce46db3',
                    'courtName': '荣上居',
                    'label': '荣上居',
                    'courtNameAbbr': 'rsj',
                    'labelAbbr': 'rsj'
                  }
                ],
                'children': [
                  {
                    'courtUid': '6307ad8e16034b39bbf981817ce46db3',
                    'courtName': '荣上居',
                    'label': '荣上居',
                    'courtNameAbbr': 'rsj',
                    'labelAbbr': 'rsj'
                  }
                ]
              },
              {
                'district': '南沙区',
                'label': '南沙区',
                'districtAbbr': 'nsq',
                'labelAbbr': 'nsq',
                'courtList': [
                  {
                    'courtUid': 'c70aeede4f6341929721e2832beec3ca',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'c70aeede4f6341929721e2832beec3ca',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ]
              },
              {
                'district': '越秀区',
                'label': '越秀区',
                'districtAbbr': 'yxq',
                'labelAbbr': 'yxq',
                'courtList': [
                  {
                    'courtUid': '311dfd7cdbe04ff0890c0b42dd49612d',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '311dfd7cdbe04ff0890c0b42dd49612d',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ]
              },
              {
                'district': '增城市',
                'label': '增城市',
                'districtAbbr': 'zcs',
                'labelAbbr': 'zcs',
                'courtList': [
                  {
                    'courtUid': 'c69aeede4f6341929721e2892beec3cb',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'c69aeede4f6341929721e2892beec3cb',
                    'courtName': '恒大山水城',
                    'label': '恒大山水城',
                    'courtNameAbbr': 'hdssc',
                    'labelAbbr': 'hdssc'
                  }
                ]
              }
            ]
          },
          {
            'city': '东莞市',
            'label': '东莞市',
            'cityAbbr': 'dws',
            'labelAbbr': 'dws',
            'districtList': [
              {
                'district': '莞城',
                'label': '莞城',
                'districtAbbr': 'wc',
                'labelAbbr': 'wc',
                'courtList': [
                  {
                    'courtUid': 'b5e86a5c951c4d30a653ec964364664d',
                    'courtName': '金坛金谷华城',
                    'label': '金坛金谷华城',
                    'courtNameAbbr': 'jtjghc',
                    'labelAbbr': 'jtjghc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'b5e86a5c951c4d30a653ec964364664d',
                    'courtName': '金坛金谷华城',
                    'label': '金坛金谷华城',
                    'courtNameAbbr': 'jtjghc',
                    'labelAbbr': 'jtjghc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '莞城',
                'label': '莞城',
                'districtAbbr': 'wc',
                'labelAbbr': 'wc',
                'courtList': [
                  {
                    'courtUid': 'b5e86a5c951c4d30a653ec964364664d',
                    'courtName': '金坛金谷华城',
                    'label': '金坛金谷华城',
                    'courtNameAbbr': 'jtjghc',
                    'labelAbbr': 'jtjghc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'b5e86a5c951c4d30a653ec964364664d',
                    'courtName': '金坛金谷华城',
                    'label': '金坛金谷华城',
                    'courtNameAbbr': 'jtjghc',
                    'labelAbbr': 'jtjghc'
                  }
                ]
              }
            ]
          },
          {
            'city': '江门市',
            'label': '江门市',
            'cityAbbr': 'jms',
            'labelAbbr': 'jms',
            'districtList': [
              {
                'district': '鹤山市',
                'label': '鹤山市',
                'districtAbbr': 'hss',
                'labelAbbr': 'hss',
                'courtList': [
                  {
                    'courtUid': '37ba2b46513f470b92c44ee05392fe18',
                    'courtName': '市聚福园',
                    'label': '市聚福园',
                    'courtNameAbbr': 'sjfy',
                    'labelAbbr': 'sjfy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '37ba2b46513f470b92c44ee05392fe18',
                    'courtName': '市聚福园',
                    'label': '市聚福园',
                    'courtNameAbbr': 'sjfy',
                    'labelAbbr': 'sjfy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '鹤山市',
                'label': '鹤山市',
                'districtAbbr': 'hss',
                'labelAbbr': 'hss',
                'courtList': [
                  {
                    'courtUid': '37ba2b46513f470b92c44ee05392fe18',
                    'courtName': '市聚福园',
                    'label': '市聚福园',
                    'courtNameAbbr': 'sjfy',
                    'labelAbbr': 'sjfy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '37ba2b46513f470b92c44ee05392fe18',
                    'courtName': '市聚福园',
                    'label': '市聚福园',
                    'courtNameAbbr': 'sjfy',
                    'labelAbbr': 'sjfy'
                  }
                ]
              }
            ]
          },
          {
            'city': '珠海市',
            'label': '珠海市',
            'cityAbbr': 'zhs',
            'labelAbbr': 'zhs',
            'districtList': [
              {
                'district': '金湾区',
                'label': '金湾区',
                'districtAbbr': 'jwq',
                'labelAbbr': 'jwq',
                'courtList': [
                  {
                    'courtUid': '1b9f77dfbaba4511a26c4d9aec314aa4',
                    'courtName': '瑞雪华庭',
                    'label': '瑞雪华庭',
                    'courtNameAbbr': 'rxht',
                    'labelAbbr': 'rxht'
                  }
                ],
                'children': [
                  {
                    'courtUid': '1b9f77dfbaba4511a26c4d9aec314aa4',
                    'courtName': '瑞雪华庭',
                    'label': '瑞雪华庭',
                    'courtNameAbbr': 'rxht',
                    'labelAbbr': 'rxht'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '金湾区',
                'label': '金湾区',
                'districtAbbr': 'jwq',
                'labelAbbr': 'jwq',
                'courtList': [
                  {
                    'courtUid': '1b9f77dfbaba4511a26c4d9aec314aa4',
                    'courtName': '瑞雪华庭',
                    'label': '瑞雪华庭',
                    'courtNameAbbr': 'rxht',
                    'labelAbbr': 'rxht'
                  }
                ],
                'children': [
                  {
                    'courtUid': '1b9f77dfbaba4511a26c4d9aec314aa4',
                    'courtName': '瑞雪华庭',
                    'label': '瑞雪华庭',
                    'courtNameAbbr': 'rxht',
                    'labelAbbr': 'rxht'
                  }
                ]
              }
            ]
          },
          {
            'city': '湛江市',
            'label': '湛江市',
            'cityAbbr': 'zjs',
            'labelAbbr': 'zjs',
            'districtList': [
              {
                'district': '吴川市',
                'label': '吴川市',
                'districtAbbr': 'wcs',
                'labelAbbr': 'wcs',
                'courtList': [
                  {
                    'courtUid': '302afb47df444a998d61585c2138de3d',
                    'courtName': '北苑家园',
                    'label': '北苑家园',
                    'courtNameAbbr': 'byjy',
                    'labelAbbr': 'byjy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '302afb47df444a998d61585c2138de3d',
                    'courtName': '北苑家园',
                    'label': '北苑家园',
                    'courtNameAbbr': 'byjy',
                    'labelAbbr': 'byjy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '吴川市',
                'label': '吴川市',
                'districtAbbr': 'wcs',
                'labelAbbr': 'wcs',
                'courtList': [
                  {
                    'courtUid': '302afb47df444a998d61585c2138de3d',
                    'courtName': '北苑家园',
                    'label': '北苑家园',
                    'courtNameAbbr': 'byjy',
                    'labelAbbr': 'byjy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '302afb47df444a998d61585c2138de3d',
                    'courtName': '北苑家园',
                    'label': '北苑家园',
                    'courtNameAbbr': 'byjy',
                    'labelAbbr': 'byjy'
                  }
                ]
              }
            ]
          },
          {
            'city': '惠州市',
            'label': '惠州市',
            'cityAbbr': 'hzs',
            'labelAbbr': 'hzs',
            'districtList': [
              {
                'district': '惠阳区',
                'label': '惠阳区',
                'districtAbbr': 'hyq',
                'labelAbbr': 'hyq',
                'courtList': [
                  {
                    'courtUid': '7c0d6807745c400bb4c45940f61153c6',
                    'courtName': '建东苑',
                    'label': '建东苑',
                    'courtNameAbbr': 'jdy',
                    'labelAbbr': 'jdy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '7c0d6807745c400bb4c45940f61153c6',
                    'courtName': '建东苑',
                    'label': '建东苑',
                    'courtNameAbbr': 'jdy',
                    'labelAbbr': 'jdy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '惠阳区',
                'label': '惠阳区',
                'districtAbbr': 'hyq',
                'labelAbbr': 'hyq',
                'courtList': [
                  {
                    'courtUid': '7c0d6807745c400bb4c45940f61153c6',
                    'courtName': '建东苑',
                    'label': '建东苑',
                    'courtNameAbbr': 'jdy',
                    'labelAbbr': 'jdy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '7c0d6807745c400bb4c45940f61153c6',
                    'courtName': '建东苑',
                    'label': '建东苑',
                    'courtNameAbbr': 'jdy',
                    'labelAbbr': 'jdy'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '浙江省',
        'label': '浙江省',
        'provinceAbbr': 'zjs',
        'labelAbbr': 'zjs',
        'cityList': [
          {
            'city': '杭州市',
            'label': '杭州市',
            'cityAbbr': 'hzs',
            'labelAbbr': 'hzs',
            'districtList': [
              {
                'district': '富阳市',
                'label': '富阳市',
                'districtAbbr': 'fys',
                'labelAbbr': 'fys',
                'courtList': [
                  {
                    'courtUid': 'd624790820d243f28212407383d34d6a',
                    'courtName': '山水倾城',
                    'label': '山水倾城',
                    'courtNameAbbr': 'ssqc',
                    'labelAbbr': 'ssqc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd624790820d243f28212407383d34d6a',
                    'courtName': '山水倾城',
                    'label': '山水倾城',
                    'courtNameAbbr': 'ssqc',
                    'labelAbbr': 'ssqc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '富阳市',
                'label': '富阳市',
                'districtAbbr': 'fys',
                'labelAbbr': 'fys',
                'courtList': [
                  {
                    'courtUid': 'd624790820d243f28212407383d34d6a',
                    'courtName': '山水倾城',
                    'label': '山水倾城',
                    'courtNameAbbr': 'ssqc',
                    'labelAbbr': 'ssqc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd624790820d243f28212407383d34d6a',
                    'courtName': '山水倾城',
                    'label': '山水倾城',
                    'courtNameAbbr': 'ssqc',
                    'labelAbbr': 'ssqc'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '杭州市',
            'label': '杭州市',
            'cityAbbr': 'hzs',
            'labelAbbr': 'hzs',
            'districtList': [
              {
                'district': '富阳市',
                'label': '富阳市',
                'districtAbbr': 'fys',
                'labelAbbr': 'fys',
                'courtList': [
                  {
                    'courtUid': 'd624790820d243f28212407383d34d6a',
                    'courtName': '山水倾城',
                    'label': '山水倾城',
                    'courtNameAbbr': 'ssqc',
                    'labelAbbr': 'ssqc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd624790820d243f28212407383d34d6a',
                    'courtName': '山水倾城',
                    'label': '山水倾城',
                    'courtNameAbbr': 'ssqc',
                    'labelAbbr': 'ssqc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '富阳市',
                'label': '富阳市',
                'districtAbbr': 'fys',
                'labelAbbr': 'fys',
                'courtList': [
                  {
                    'courtUid': 'd624790820d243f28212407383d34d6a',
                    'courtName': '山水倾城',
                    'label': '山水倾城',
                    'courtNameAbbr': 'ssqc',
                    'labelAbbr': 'ssqc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd624790820d243f28212407383d34d6a',
                    'courtName': '山水倾城',
                    'label': '山水倾城',
                    'courtNameAbbr': 'ssqc',
                    'labelAbbr': 'ssqc'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '河北省',
        'label': '河北省',
        'provinceAbbr': 'hbs',
        'labelAbbr': 'hbs',
        'cityList': [
          {
            'city': '石家庄市',
            'label': '石家庄市',
            'cityAbbr': 'sjzs',
            'labelAbbr': 'sjzs',
            'districtList': [
              {
                'district': '晋州市',
                'label': '晋州市',
                'districtAbbr': 'jzs',
                'labelAbbr': 'jzs',
                'courtList': [
                  {
                    'courtUid': '2566ef014b7843bf8fdbef65555ac043',
                    'courtName': '文鼎苑',
                    'label': '文鼎苑',
                    'courtNameAbbr': 'wdy',
                    'labelAbbr': 'wdy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '2566ef014b7843bf8fdbef65555ac043',
                    'courtName': '文鼎苑',
                    'label': '文鼎苑',
                    'courtNameAbbr': 'wdy',
                    'labelAbbr': 'wdy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '晋州市',
                'label': '晋州市',
                'districtAbbr': 'jzs',
                'labelAbbr': 'jzs',
                'courtList': [
                  {
                    'courtUid': '2566ef014b7843bf8fdbef65555ac043',
                    'courtName': '文鼎苑',
                    'label': '文鼎苑',
                    'courtNameAbbr': 'wdy',
                    'labelAbbr': 'wdy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '2566ef014b7843bf8fdbef65555ac043',
                    'courtName': '文鼎苑',
                    'label': '文鼎苑',
                    'courtNameAbbr': 'wdy',
                    'labelAbbr': 'wdy'
                  }
                ]
              }
            ]
          },
          {
            'city': '秦皇岛市',
            'label': '秦皇岛市',
            'cityAbbr': 'qhds',
            'labelAbbr': 'qhds',
            'districtList': [
              {
                'district': '抚宁县',
                'label': '抚宁县',
                'districtAbbr': 'fnx',
                'labelAbbr': 'fnx',
                'courtList': [
                  {
                    'courtUid': 'd1496b75c1014423937050018558d90e',
                    'courtName': '聚福园',
                    'label': '聚福园',
                    'courtNameAbbr': 'jfy',
                    'labelAbbr': 'jfy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd1496b75c1014423937050018558d90e',
                    'courtName': '聚福园',
                    'label': '聚福园',
                    'courtNameAbbr': 'jfy',
                    'labelAbbr': 'jfy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '抚宁县',
                'label': '抚宁县',
                'districtAbbr': 'fnx',
                'labelAbbr': 'fnx',
                'courtList': [
                  {
                    'courtUid': 'd1496b75c1014423937050018558d90e',
                    'courtName': '聚福园',
                    'label': '聚福园',
                    'courtNameAbbr': 'jfy',
                    'labelAbbr': 'jfy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd1496b75c1014423937050018558d90e',
                    'courtName': '聚福园',
                    'label': '聚福园',
                    'courtNameAbbr': 'jfy',
                    'labelAbbr': 'jfy'
                  }
                ]
              }
            ]
          },
          {
            'city': '邯郸市',
            'label': '邯郸市',
            'cityAbbr': 'hds',
            'labelAbbr': 'hds',
            'districtList': [
              {
                'district': '武安市',
                'label': '武安市',
                'districtAbbr': 'was',
                'labelAbbr': 'was',
                'courtList': [
                  {
                    'courtUid': '4e017dd857f5423c96fbad56f05bf9a8',
                    'courtName': '欧园·北欧印象',
                    'label': '欧园·北欧印象',
                    'courtNameAbbr': 'oy·boyx',
                    'labelAbbr': 'oy·boyx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4e017dd857f5423c96fbad56f05bf9a8',
                    'courtName': '欧园·北欧印象',
                    'label': '欧园·北欧印象',
                    'courtNameAbbr': 'oy·boyx',
                    'labelAbbr': 'oy·boyx'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '武安市',
                'label': '武安市',
                'districtAbbr': 'was',
                'labelAbbr': 'was',
                'courtList': [
                  {
                    'courtUid': '4e017dd857f5423c96fbad56f05bf9a8',
                    'courtName': '欧园·北欧印象',
                    'label': '欧园·北欧印象',
                    'courtNameAbbr': 'oy·boyx',
                    'labelAbbr': 'oy·boyx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4e017dd857f5423c96fbad56f05bf9a8',
                    'courtName': '欧园·北欧印象',
                    'label': '欧园·北欧印象',
                    'courtNameAbbr': 'oy·boyx',
                    'labelAbbr': 'oy·boyx'
                  }
                ]
              }
            ]
          },
          {
            'city': '廊坊市',
            'label': '廊坊市',
            'cityAbbr': 'lfs',
            'labelAbbr': 'lfs',
            'districtList': [
              {
                'district': '三河市',
                'label': '三河市',
                'districtAbbr': 'shs',
                'labelAbbr': 'shs',
                'courtList': [
                  {
                    'courtUid': 'bf0e7c22af3e47fba67b83841cc9fa0e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'bf0e7c22af3e47fba67b83841cc9fa0e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '三河市',
                'label': '三河市',
                'districtAbbr': 'shs',
                'labelAbbr': 'shs',
                'courtList': [
                  {
                    'courtUid': 'bf0e7c22af3e47fba67b83841cc9fa0e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'bf0e7c22af3e47fba67b83841cc9fa0e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '石家庄市',
            'label': '石家庄市',
            'cityAbbr': 'sjzs',
            'labelAbbr': 'sjzs',
            'districtList': [
              {
                'district': '晋州市',
                'label': '晋州市',
                'districtAbbr': 'jzs',
                'labelAbbr': 'jzs',
                'courtList': [
                  {
                    'courtUid': '2566ef014b7843bf8fdbef65555ac043',
                    'courtName': '文鼎苑',
                    'label': '文鼎苑',
                    'courtNameAbbr': 'wdy',
                    'labelAbbr': 'wdy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '2566ef014b7843bf8fdbef65555ac043',
                    'courtName': '文鼎苑',
                    'label': '文鼎苑',
                    'courtNameAbbr': 'wdy',
                    'labelAbbr': 'wdy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '晋州市',
                'label': '晋州市',
                'districtAbbr': 'jzs',
                'labelAbbr': 'jzs',
                'courtList': [
                  {
                    'courtUid': '2566ef014b7843bf8fdbef65555ac043',
                    'courtName': '文鼎苑',
                    'label': '文鼎苑',
                    'courtNameAbbr': 'wdy',
                    'labelAbbr': 'wdy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '2566ef014b7843bf8fdbef65555ac043',
                    'courtName': '文鼎苑',
                    'label': '文鼎苑',
                    'courtNameAbbr': 'wdy',
                    'labelAbbr': 'wdy'
                  }
                ]
              }
            ]
          },
          {
            'city': '秦皇岛市',
            'label': '秦皇岛市',
            'cityAbbr': 'qhds',
            'labelAbbr': 'qhds',
            'districtList': [
              {
                'district': '抚宁县',
                'label': '抚宁县',
                'districtAbbr': 'fnx',
                'labelAbbr': 'fnx',
                'courtList': [
                  {
                    'courtUid': 'd1496b75c1014423937050018558d90e',
                    'courtName': '聚福园',
                    'label': '聚福园',
                    'courtNameAbbr': 'jfy',
                    'labelAbbr': 'jfy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd1496b75c1014423937050018558d90e',
                    'courtName': '聚福园',
                    'label': '聚福园',
                    'courtNameAbbr': 'jfy',
                    'labelAbbr': 'jfy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '抚宁县',
                'label': '抚宁县',
                'districtAbbr': 'fnx',
                'labelAbbr': 'fnx',
                'courtList': [
                  {
                    'courtUid': 'd1496b75c1014423937050018558d90e',
                    'courtName': '聚福园',
                    'label': '聚福园',
                    'courtNameAbbr': 'jfy',
                    'labelAbbr': 'jfy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd1496b75c1014423937050018558d90e',
                    'courtName': '聚福园',
                    'label': '聚福园',
                    'courtNameAbbr': 'jfy',
                    'labelAbbr': 'jfy'
                  }
                ]
              }
            ]
          },
          {
            'city': '邯郸市',
            'label': '邯郸市',
            'cityAbbr': 'hds',
            'labelAbbr': 'hds',
            'districtList': [
              {
                'district': '武安市',
                'label': '武安市',
                'districtAbbr': 'was',
                'labelAbbr': 'was',
                'courtList': [
                  {
                    'courtUid': '4e017dd857f5423c96fbad56f05bf9a8',
                    'courtName': '欧园·北欧印象',
                    'label': '欧园·北欧印象',
                    'courtNameAbbr': 'oy·boyx',
                    'labelAbbr': 'oy·boyx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4e017dd857f5423c96fbad56f05bf9a8',
                    'courtName': '欧园·北欧印象',
                    'label': '欧园·北欧印象',
                    'courtNameAbbr': 'oy·boyx',
                    'labelAbbr': 'oy·boyx'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '武安市',
                'label': '武安市',
                'districtAbbr': 'was',
                'labelAbbr': 'was',
                'courtList': [
                  {
                    'courtUid': '4e017dd857f5423c96fbad56f05bf9a8',
                    'courtName': '欧园·北欧印象',
                    'label': '欧园·北欧印象',
                    'courtNameAbbr': 'oy·boyx',
                    'labelAbbr': 'oy·boyx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4e017dd857f5423c96fbad56f05bf9a8',
                    'courtName': '欧园·北欧印象',
                    'label': '欧园·北欧印象',
                    'courtNameAbbr': 'oy·boyx',
                    'labelAbbr': 'oy·boyx'
                  }
                ]
              }
            ]
          },
          {
            'city': '廊坊市',
            'label': '廊坊市',
            'cityAbbr': 'lfs',
            'labelAbbr': 'lfs',
            'districtList': [
              {
                'district': '三河市',
                'label': '三河市',
                'districtAbbr': 'shs',
                'labelAbbr': 'shs',
                'courtList': [
                  {
                    'courtUid': 'bf0e7c22af3e47fba67b83841cc9fa0e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'bf0e7c22af3e47fba67b83841cc9fa0e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '三河市',
                'label': '三河市',
                'districtAbbr': 'shs',
                'labelAbbr': 'shs',
                'courtList': [
                  {
                    'courtUid': 'bf0e7c22af3e47fba67b83841cc9fa0e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'bf0e7c22af3e47fba67b83841cc9fa0e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '福建省',
        'label': '福建省',
        'provinceAbbr': 'fjs',
        'labelAbbr': 'fjs',
        'cityList': [
          {
            'city': '莆田市',
            'label': '莆田市',
            'cityAbbr': 'pts',
            'labelAbbr': 'pts',
            'districtList': [
              {
                'district': '涵江区',
                'label': '涵江区',
                'districtAbbr': 'hjq',
                'labelAbbr': 'hjq',
                'courtList': [
                  {
                    'courtUid': 'd1227f10bb834357bc75c7c0aec8b578',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd1227f10bb834357bc75c7c0aec8b578',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '涵江区',
                'label': '涵江区',
                'districtAbbr': 'hjq',
                'labelAbbr': 'hjq',
                'courtList': [
                  {
                    'courtUid': 'd1227f10bb834357bc75c7c0aec8b578',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd1227f10bb834357bc75c7c0aec8b578',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ]
              }
            ]
          },
          {
            'city': '福州市',
            'label': '福州市',
            'cityAbbr': 'fzs',
            'labelAbbr': 'fzs',
            'districtList': [
              {
                'district': '平潭县',
                'label': '平潭县',
                'districtAbbr': 'ptx',
                'labelAbbr': 'ptx',
                'courtList': [
                  {
                    'courtUid': '4102bbca8bbb45c58c0d3c2975a66790',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4102bbca8bbb45c58c0d3c2975a66790',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '平潭县',
                'label': '平潭县',
                'districtAbbr': 'ptx',
                'labelAbbr': 'ptx',
                'courtList': [
                  {
                    'courtUid': '4102bbca8bbb45c58c0d3c2975a66790',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4102bbca8bbb45c58c0d3c2975a66790',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ]
              }
            ]
          },
          {
            'city': '宁德市',
            'label': '宁德市',
            'cityAbbr': 'nds',
            'labelAbbr': 'nds',
            'districtList': [
              {
                'district': '屏南县',
                'label': '屏南县',
                'districtAbbr': 'pnx',
                'labelAbbr': 'pnx',
                'courtList': [
                  {
                    'courtUid': '59a251394fa5488bba5669ea7e08b5b7',
                    'courtName': '紫竹轩',
                    'label': '紫竹轩',
                    'courtNameAbbr': 'zzx',
                    'labelAbbr': 'zzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '59a251394fa5488bba5669ea7e08b5b7',
                    'courtName': '紫竹轩',
                    'label': '紫竹轩',
                    'courtNameAbbr': 'zzx',
                    'labelAbbr': 'zzx'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '屏南县',
                'label': '屏南县',
                'districtAbbr': 'pnx',
                'labelAbbr': 'pnx',
                'courtList': [
                  {
                    'courtUid': '59a251394fa5488bba5669ea7e08b5b7',
                    'courtName': '紫竹轩',
                    'label': '紫竹轩',
                    'courtNameAbbr': 'zzx',
                    'labelAbbr': 'zzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '59a251394fa5488bba5669ea7e08b5b7',
                    'courtName': '紫竹轩',
                    'label': '紫竹轩',
                    'courtNameAbbr': 'zzx',
                    'labelAbbr': 'zzx'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '莆田市',
            'label': '莆田市',
            'cityAbbr': 'pts',
            'labelAbbr': 'pts',
            'districtList': [
              {
                'district': '涵江区',
                'label': '涵江区',
                'districtAbbr': 'hjq',
                'labelAbbr': 'hjq',
                'courtList': [
                  {
                    'courtUid': 'd1227f10bb834357bc75c7c0aec8b578',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd1227f10bb834357bc75c7c0aec8b578',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '涵江区',
                'label': '涵江区',
                'districtAbbr': 'hjq',
                'labelAbbr': 'hjq',
                'courtList': [
                  {
                    'courtUid': 'd1227f10bb834357bc75c7c0aec8b578',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'd1227f10bb834357bc75c7c0aec8b578',
                    'courtName': '锦秀绣江',
                    'label': '锦秀绣江',
                    'courtNameAbbr': 'jxxj',
                    'labelAbbr': 'jxxj'
                  }
                ]
              }
            ]
          },
          {
            'city': '福州市',
            'label': '福州市',
            'cityAbbr': 'fzs',
            'labelAbbr': 'fzs',
            'districtList': [
              {
                'district': '平潭县',
                'label': '平潭县',
                'districtAbbr': 'ptx',
                'labelAbbr': 'ptx',
                'courtList': [
                  {
                    'courtUid': '4102bbca8bbb45c58c0d3c2975a66790',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4102bbca8bbb45c58c0d3c2975a66790',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '平潭县',
                'label': '平潭县',
                'districtAbbr': 'ptx',
                'labelAbbr': 'ptx',
                'courtList': [
                  {
                    'courtUid': '4102bbca8bbb45c58c0d3c2975a66790',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4102bbca8bbb45c58c0d3c2975a66790',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ]
              }
            ]
          },
          {
            'city': '宁德市',
            'label': '宁德市',
            'cityAbbr': 'nds',
            'labelAbbr': 'nds',
            'districtList': [
              {
                'district': '屏南县',
                'label': '屏南县',
                'districtAbbr': 'pnx',
                'labelAbbr': 'pnx',
                'courtList': [
                  {
                    'courtUid': '59a251394fa5488bba5669ea7e08b5b7',
                    'courtName': '紫竹轩',
                    'label': '紫竹轩',
                    'courtNameAbbr': 'zzx',
                    'labelAbbr': 'zzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '59a251394fa5488bba5669ea7e08b5b7',
                    'courtName': '紫竹轩',
                    'label': '紫竹轩',
                    'courtNameAbbr': 'zzx',
                    'labelAbbr': 'zzx'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '屏南县',
                'label': '屏南县',
                'districtAbbr': 'pnx',
                'labelAbbr': 'pnx',
                'courtList': [
                  {
                    'courtUid': '59a251394fa5488bba5669ea7e08b5b7',
                    'courtName': '紫竹轩',
                    'label': '紫竹轩',
                    'courtNameAbbr': 'zzx',
                    'labelAbbr': 'zzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '59a251394fa5488bba5669ea7e08b5b7',
                    'courtName': '紫竹轩',
                    'label': '紫竹轩',
                    'courtNameAbbr': 'zzx',
                    'labelAbbr': 'zzx'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '山西省',
        'label': '山西省',
        'provinceAbbr': 'sxs',
        'labelAbbr': 'sxs',
        'cityList': [
          {
            'city': '吕梁市',
            'label': '吕梁市',
            'cityAbbr': 'lls',
            'labelAbbr': 'lls',
            'districtList': [
              {
                'district': '离石区',
                'label': '离石区',
                'districtAbbr': 'lsq',
                'labelAbbr': 'lsq',
                'courtList': [
                  {
                    'courtUid': 'da7f945ed90a4ac7ae52bdad0fba8fb7',
                    'courtName': '世纪东方城',
                    'label': '世纪东方城',
                    'courtNameAbbr': 'sjdfc',
                    'labelAbbr': 'sjdfc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'da7f945ed90a4ac7ae52bdad0fba8fb7',
                    'courtName': '世纪东方城',
                    'label': '世纪东方城',
                    'courtNameAbbr': 'sjdfc',
                    'labelAbbr': 'sjdfc'
                  }
                ]
              },
              {
                'district': '交城县',
                'label': '交城县',
                'districtAbbr': 'jcx',
                'labelAbbr': 'jcx',
                'courtList': [
                  {
                    'courtUid': '1446251759bb46d49138012c6fdf6e87',
                    'courtName': '新乡博筑花园（西园）',
                    'label': '新乡博筑花园（西园）',
                    'courtNameAbbr': 'xxbzhy（xy）',
                    'labelAbbr': 'xxbzhy（xy）'
                  }
                ],
                'children': [
                  {
                    'courtUid': '1446251759bb46d49138012c6fdf6e87',
                    'courtName': '新乡博筑花园（西园）',
                    'label': '新乡博筑花园（西园）',
                    'courtNameAbbr': 'xxbzhy（xy）',
                    'labelAbbr': 'xxbzhy（xy）'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '离石区',
                'label': '离石区',
                'districtAbbr': 'lsq',
                'labelAbbr': 'lsq',
                'courtList': [
                  {
                    'courtUid': 'da7f945ed90a4ac7ae52bdad0fba8fb7',
                    'courtName': '世纪东方城',
                    'label': '世纪东方城',
                    'courtNameAbbr': 'sjdfc',
                    'labelAbbr': 'sjdfc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'da7f945ed90a4ac7ae52bdad0fba8fb7',
                    'courtName': '世纪东方城',
                    'label': '世纪东方城',
                    'courtNameAbbr': 'sjdfc',
                    'labelAbbr': 'sjdfc'
                  }
                ]
              },
              {
                'district': '交城县',
                'label': '交城县',
                'districtAbbr': 'jcx',
                'labelAbbr': 'jcx',
                'courtList': [
                  {
                    'courtUid': '1446251759bb46d49138012c6fdf6e87',
                    'courtName': '新乡博筑花园（西园）',
                    'label': '新乡博筑花园（西园）',
                    'courtNameAbbr': 'xxbzhy（xy）',
                    'labelAbbr': 'xxbzhy（xy）'
                  }
                ],
                'children': [
                  {
                    'courtUid': '1446251759bb46d49138012c6fdf6e87',
                    'courtName': '新乡博筑花园（西园）',
                    'label': '新乡博筑花园（西园）',
                    'courtNameAbbr': 'xxbzhy（xy）',
                    'labelAbbr': 'xxbzhy（xy）'
                  }
                ]
              }
            ]
          },
          {
            'city': '长治市',
            'label': '长治市',
            'cityAbbr': 'czs',
            'labelAbbr': 'czs',
            'districtList': [
              {
                'district': '城  区',
                'label': '城  区',
                'districtAbbr': 'c  q',
                'labelAbbr': 'c  q',
                'courtList': [
                  {
                    'courtUid': 'ed6ddeaf2de7440eb91dc0f81d29e8fc',
                    'courtName': '华腾园',
                    'label': '华腾园',
                    'courtNameAbbr': 'hty',
                    'labelAbbr': 'hty'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'ed6ddeaf2de7440eb91dc0f81d29e8fc',
                    'courtName': '华腾园',
                    'label': '华腾园',
                    'courtNameAbbr': 'hty',
                    'labelAbbr': 'hty'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '城  区',
                'label': '城  区',
                'districtAbbr': 'c  q',
                'labelAbbr': 'c  q',
                'courtList': [
                  {
                    'courtUid': 'ed6ddeaf2de7440eb91dc0f81d29e8fc',
                    'courtName': '华腾园',
                    'label': '华腾园',
                    'courtNameAbbr': 'hty',
                    'labelAbbr': 'hty'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'ed6ddeaf2de7440eb91dc0f81d29e8fc',
                    'courtName': '华腾园',
                    'label': '华腾园',
                    'courtNameAbbr': 'hty',
                    'labelAbbr': 'hty'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '吕梁市',
            'label': '吕梁市',
            'cityAbbr': 'lls',
            'labelAbbr': 'lls',
            'districtList': [
              {
                'district': '离石区',
                'label': '离石区',
                'districtAbbr': 'lsq',
                'labelAbbr': 'lsq',
                'courtList': [
                  {
                    'courtUid': 'da7f945ed90a4ac7ae52bdad0fba8fb7',
                    'courtName': '世纪东方城',
                    'label': '世纪东方城',
                    'courtNameAbbr': 'sjdfc',
                    'labelAbbr': 'sjdfc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'da7f945ed90a4ac7ae52bdad0fba8fb7',
                    'courtName': '世纪东方城',
                    'label': '世纪东方城',
                    'courtNameAbbr': 'sjdfc',
                    'labelAbbr': 'sjdfc'
                  }
                ]
              },
              {
                'district': '交城县',
                'label': '交城县',
                'districtAbbr': 'jcx',
                'labelAbbr': 'jcx',
                'courtList': [
                  {
                    'courtUid': '1446251759bb46d49138012c6fdf6e87',
                    'courtName': '新乡博筑花园（西园）',
                    'label': '新乡博筑花园（西园）',
                    'courtNameAbbr': 'xxbzhy（xy）',
                    'labelAbbr': 'xxbzhy（xy）'
                  }
                ],
                'children': [
                  {
                    'courtUid': '1446251759bb46d49138012c6fdf6e87',
                    'courtName': '新乡博筑花园（西园）',
                    'label': '新乡博筑花园（西园）',
                    'courtNameAbbr': 'xxbzhy（xy）',
                    'labelAbbr': 'xxbzhy（xy）'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '离石区',
                'label': '离石区',
                'districtAbbr': 'lsq',
                'labelAbbr': 'lsq',
                'courtList': [
                  {
                    'courtUid': 'da7f945ed90a4ac7ae52bdad0fba8fb7',
                    'courtName': '世纪东方城',
                    'label': '世纪东方城',
                    'courtNameAbbr': 'sjdfc',
                    'labelAbbr': 'sjdfc'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'da7f945ed90a4ac7ae52bdad0fba8fb7',
                    'courtName': '世纪东方城',
                    'label': '世纪东方城',
                    'courtNameAbbr': 'sjdfc',
                    'labelAbbr': 'sjdfc'
                  }
                ]
              },
              {
                'district': '交城县',
                'label': '交城县',
                'districtAbbr': 'jcx',
                'labelAbbr': 'jcx',
                'courtList': [
                  {
                    'courtUid': '1446251759bb46d49138012c6fdf6e87',
                    'courtName': '新乡博筑花园（西园）',
                    'label': '新乡博筑花园（西园）',
                    'courtNameAbbr': 'xxbzhy（xy）',
                    'labelAbbr': 'xxbzhy（xy）'
                  }
                ],
                'children': [
                  {
                    'courtUid': '1446251759bb46d49138012c6fdf6e87',
                    'courtName': '新乡博筑花园（西园）',
                    'label': '新乡博筑花园（西园）',
                    'courtNameAbbr': 'xxbzhy（xy）',
                    'labelAbbr': 'xxbzhy（xy）'
                  }
                ]
              }
            ]
          },
          {
            'city': '长治市',
            'label': '长治市',
            'cityAbbr': 'czs',
            'labelAbbr': 'czs',
            'districtList': [
              {
                'district': '城  区',
                'label': '城  区',
                'districtAbbr': 'c  q',
                'labelAbbr': 'c  q',
                'courtList': [
                  {
                    'courtUid': 'ed6ddeaf2de7440eb91dc0f81d29e8fc',
                    'courtName': '华腾园',
                    'label': '华腾园',
                    'courtNameAbbr': 'hty',
                    'labelAbbr': 'hty'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'ed6ddeaf2de7440eb91dc0f81d29e8fc',
                    'courtName': '华腾园',
                    'label': '华腾园',
                    'courtNameAbbr': 'hty',
                    'labelAbbr': 'hty'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '城  区',
                'label': '城  区',
                'districtAbbr': 'c  q',
                'labelAbbr': 'c  q',
                'courtList': [
                  {
                    'courtUid': 'ed6ddeaf2de7440eb91dc0f81d29e8fc',
                    'courtName': '华腾园',
                    'label': '华腾园',
                    'courtNameAbbr': 'hty',
                    'labelAbbr': 'hty'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'ed6ddeaf2de7440eb91dc0f81d29e8fc',
                    'courtName': '华腾园',
                    'label': '华腾园',
                    'courtNameAbbr': 'hty',
                    'labelAbbr': 'hty'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '辽宁省',
        'label': '辽宁省',
        'provinceAbbr': 'lns',
        'labelAbbr': 'lns',
        'cityList': [
          {
            'city': '锦州市',
            'label': '锦州市',
            'cityAbbr': 'jzs',
            'labelAbbr': 'jzs',
            'districtList': [
              {
                'district': '北宁市',
                'label': '北宁市',
                'districtAbbr': 'bns',
                'labelAbbr': 'bns',
                'courtList': [
                  {
                    'courtUid': 'f4cc985808304b7eb53952a32fec4686',
                    'courtName': '宏城苑',
                    'label': '宏城苑',
                    'courtNameAbbr': 'hcy',
                    'labelAbbr': 'hcy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'f4cc985808304b7eb53952a32fec4686',
                    'courtName': '宏城苑',
                    'label': '宏城苑',
                    'courtNameAbbr': 'hcy',
                    'labelAbbr': 'hcy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '北宁市',
                'label': '北宁市',
                'districtAbbr': 'bns',
                'labelAbbr': 'bns',
                'courtList': [
                  {
                    'courtUid': 'f4cc985808304b7eb53952a32fec4686',
                    'courtName': '宏城苑',
                    'label': '宏城苑',
                    'courtNameAbbr': 'hcy',
                    'labelAbbr': 'hcy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'f4cc985808304b7eb53952a32fec4686',
                    'courtName': '宏城苑',
                    'label': '宏城苑',
                    'courtNameAbbr': 'hcy',
                    'labelAbbr': 'hcy'
                  }
                ]
              }
            ]
          },
          {
            'city': '辽阳市',
            'label': '辽阳市',
            'cityAbbr': 'lys',
            'labelAbbr': 'lys',
            'districtList': [
              {
                'district': '辽阳县',
                'label': '辽阳县',
                'districtAbbr': 'lyx',
                'labelAbbr': 'lyx',
                'courtList': [
                  {
                    'courtUid': 'b902cd6f082a402189ffbbd91b1e721a',
                    'courtName': '世纪小区',
                    'label': '世纪小区',
                    'courtNameAbbr': 'sjxq',
                    'labelAbbr': 'sjxq'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'b902cd6f082a402189ffbbd91b1e721a',
                    'courtName': '世纪小区',
                    'label': '世纪小区',
                    'courtNameAbbr': 'sjxq',
                    'labelAbbr': 'sjxq'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '辽阳县',
                'label': '辽阳县',
                'districtAbbr': 'lyx',
                'labelAbbr': 'lyx',
                'courtList': [
                  {
                    'courtUid': 'b902cd6f082a402189ffbbd91b1e721a',
                    'courtName': '世纪小区',
                    'label': '世纪小区',
                    'courtNameAbbr': 'sjxq',
                    'labelAbbr': 'sjxq'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'b902cd6f082a402189ffbbd91b1e721a',
                    'courtName': '世纪小区',
                    'label': '世纪小区',
                    'courtNameAbbr': 'sjxq',
                    'labelAbbr': 'sjxq'
                  }
                ]
              }
            ]
          },
          {
            'city': '丹东市',
            'label': '丹东市',
            'cityAbbr': 'dds',
            'labelAbbr': 'dds',
            'districtList': [
              {
                'district': '东港市',
                'label': '东港市',
                'districtAbbr': 'dgs',
                'labelAbbr': 'dgs',
                'courtList': [
                  {
                    'courtUid': '2942902e28b44b5fa69669e086b566a5',
                    'courtName': '龙泉华庭',
                    'label': '龙泉华庭',
                    'courtNameAbbr': 'lqht',
                    'labelAbbr': 'lqht'
                  }
                ],
                'children': [
                  {
                    'courtUid': '2942902e28b44b5fa69669e086b566a5',
                    'courtName': '龙泉华庭',
                    'label': '龙泉华庭',
                    'courtNameAbbr': 'lqht',
                    'labelAbbr': 'lqht'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '东港市',
                'label': '东港市',
                'districtAbbr': 'dgs',
                'labelAbbr': 'dgs',
                'courtList': [
                  {
                    'courtUid': '2942902e28b44b5fa69669e086b566a5',
                    'courtName': '龙泉华庭',
                    'label': '龙泉华庭',
                    'courtNameAbbr': 'lqht',
                    'labelAbbr': 'lqht'
                  }
                ],
                'children': [
                  {
                    'courtUid': '2942902e28b44b5fa69669e086b566a5',
                    'courtName': '龙泉华庭',
                    'label': '龙泉华庭',
                    'courtNameAbbr': 'lqht',
                    'labelAbbr': 'lqht'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '锦州市',
            'label': '锦州市',
            'cityAbbr': 'jzs',
            'labelAbbr': 'jzs',
            'districtList': [
              {
                'district': '北宁市',
                'label': '北宁市',
                'districtAbbr': 'bns',
                'labelAbbr': 'bns',
                'courtList': [
                  {
                    'courtUid': 'f4cc985808304b7eb53952a32fec4686',
                    'courtName': '宏城苑',
                    'label': '宏城苑',
                    'courtNameAbbr': 'hcy',
                    'labelAbbr': 'hcy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'f4cc985808304b7eb53952a32fec4686',
                    'courtName': '宏城苑',
                    'label': '宏城苑',
                    'courtNameAbbr': 'hcy',
                    'labelAbbr': 'hcy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '北宁市',
                'label': '北宁市',
                'districtAbbr': 'bns',
                'labelAbbr': 'bns',
                'courtList': [
                  {
                    'courtUid': 'f4cc985808304b7eb53952a32fec4686',
                    'courtName': '宏城苑',
                    'label': '宏城苑',
                    'courtNameAbbr': 'hcy',
                    'labelAbbr': 'hcy'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'f4cc985808304b7eb53952a32fec4686',
                    'courtName': '宏城苑',
                    'label': '宏城苑',
                    'courtNameAbbr': 'hcy',
                    'labelAbbr': 'hcy'
                  }
                ]
              }
            ]
          },
          {
            'city': '辽阳市',
            'label': '辽阳市',
            'cityAbbr': 'lys',
            'labelAbbr': 'lys',
            'districtList': [
              {
                'district': '辽阳县',
                'label': '辽阳县',
                'districtAbbr': 'lyx',
                'labelAbbr': 'lyx',
                'courtList': [
                  {
                    'courtUid': 'b902cd6f082a402189ffbbd91b1e721a',
                    'courtName': '世纪小区',
                    'label': '世纪小区',
                    'courtNameAbbr': 'sjxq',
                    'labelAbbr': 'sjxq'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'b902cd6f082a402189ffbbd91b1e721a',
                    'courtName': '世纪小区',
                    'label': '世纪小区',
                    'courtNameAbbr': 'sjxq',
                    'labelAbbr': 'sjxq'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '辽阳县',
                'label': '辽阳县',
                'districtAbbr': 'lyx',
                'labelAbbr': 'lyx',
                'courtList': [
                  {
                    'courtUid': 'b902cd6f082a402189ffbbd91b1e721a',
                    'courtName': '世纪小区',
                    'label': '世纪小区',
                    'courtNameAbbr': 'sjxq',
                    'labelAbbr': 'sjxq'
                  }
                ],
                'children': [
                  {
                    'courtUid': 'b902cd6f082a402189ffbbd91b1e721a',
                    'courtName': '世纪小区',
                    'label': '世纪小区',
                    'courtNameAbbr': 'sjxq',
                    'labelAbbr': 'sjxq'
                  }
                ]
              }
            ]
          },
          {
            'city': '丹东市',
            'label': '丹东市',
            'cityAbbr': 'dds',
            'labelAbbr': 'dds',
            'districtList': [
              {
                'district': '东港市',
                'label': '东港市',
                'districtAbbr': 'dgs',
                'labelAbbr': 'dgs',
                'courtList': [
                  {
                    'courtUid': '2942902e28b44b5fa69669e086b566a5',
                    'courtName': '龙泉华庭',
                    'label': '龙泉华庭',
                    'courtNameAbbr': 'lqht',
                    'labelAbbr': 'lqht'
                  }
                ],
                'children': [
                  {
                    'courtUid': '2942902e28b44b5fa69669e086b566a5',
                    'courtName': '龙泉华庭',
                    'label': '龙泉华庭',
                    'courtNameAbbr': 'lqht',
                    'labelAbbr': 'lqht'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '东港市',
                'label': '东港市',
                'districtAbbr': 'dgs',
                'labelAbbr': 'dgs',
                'courtList': [
                  {
                    'courtUid': '2942902e28b44b5fa69669e086b566a5',
                    'courtName': '龙泉华庭',
                    'label': '龙泉华庭',
                    'courtNameAbbr': 'lqht',
                    'labelAbbr': 'lqht'
                  }
                ],
                'children': [
                  {
                    'courtUid': '2942902e28b44b5fa69669e086b566a5',
                    'courtName': '龙泉华庭',
                    'label': '龙泉华庭',
                    'courtNameAbbr': 'lqht',
                    'labelAbbr': 'lqht'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '吉林省',
        'label': '吉林省',
        'provinceAbbr': 'jls',
        'labelAbbr': 'jls',
        'cityList': [
          {
            'city': '白山市',
            'label': '白山市',
            'cityAbbr': 'bss',
            'labelAbbr': 'bss',
            'districtList': [
              {
                'district': '靖宇县',
                'label': '靖宇县',
                'districtAbbr': 'jyx',
                'labelAbbr': 'jyx',
                'courtList': [
                  {
                    'courtUid': '02cf4937528d4974b7b890dfdbaeaa57',
                    'courtName': '新都庄园',
                    'label': '新都庄园',
                    'courtNameAbbr': 'xdzy',
                    'labelAbbr': 'xdzy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '02cf4937528d4974b7b890dfdbaeaa57',
                    'courtName': '新都庄园',
                    'label': '新都庄园',
                    'courtNameAbbr': 'xdzy',
                    'labelAbbr': 'xdzy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '靖宇县',
                'label': '靖宇县',
                'districtAbbr': 'jyx',
                'labelAbbr': 'jyx',
                'courtList': [
                  {
                    'courtUid': '02cf4937528d4974b7b890dfdbaeaa57',
                    'courtName': '新都庄园',
                    'label': '新都庄园',
                    'courtNameAbbr': 'xdzy',
                    'labelAbbr': 'xdzy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '02cf4937528d4974b7b890dfdbaeaa57',
                    'courtName': '新都庄园',
                    'label': '新都庄园',
                    'courtNameAbbr': 'xdzy',
                    'labelAbbr': 'xdzy'
                  }
                ]
              }
            ]
          },
          {
            'city': '白城市',
            'label': '白城市',
            'cityAbbr': 'bcs',
            'labelAbbr': 'bcs',
            'districtList': [
              {
                'district': '洮南市',
                'label': '洮南市',
                'districtAbbr': 'tns',
                'labelAbbr': 'tns',
                'courtList': [
                  {
                    'courtUid': '51bd318add4142a58b4addc2f4606f52',
                    'courtName': '上层建筑-果岭里',
                    'label': '上层建筑-果岭里',
                    'courtNameAbbr': 'scjz-gll',
                    'labelAbbr': 'scjz-gll'
                  }
                ],
                'children': [
                  {
                    'courtUid': '51bd318add4142a58b4addc2f4606f52',
                    'courtName': '上层建筑-果岭里',
                    'label': '上层建筑-果岭里',
                    'courtNameAbbr': 'scjz-gll',
                    'labelAbbr': 'scjz-gll'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '洮南市',
                'label': '洮南市',
                'districtAbbr': 'tns',
                'labelAbbr': 'tns',
                'courtList': [
                  {
                    'courtUid': '51bd318add4142a58b4addc2f4606f52',
                    'courtName': '上层建筑-果岭里',
                    'label': '上层建筑-果岭里',
                    'courtNameAbbr': 'scjz-gll',
                    'labelAbbr': 'scjz-gll'
                  }
                ],
                'children': [
                  {
                    'courtUid': '51bd318add4142a58b4addc2f4606f52',
                    'courtName': '上层建筑-果岭里',
                    'label': '上层建筑-果岭里',
                    'courtNameAbbr': 'scjz-gll',
                    'labelAbbr': 'scjz-gll'
                  }
                ]
              }
            ]
          },
          {
            'city': '辽源市',
            'label': '辽源市',
            'cityAbbr': 'lys',
            'labelAbbr': 'lys',
            'districtList': [
              {
                'district': '龙山区',
                'label': '龙山区',
                'districtAbbr': 'lsq',
                'labelAbbr': 'lsq',
                'courtList': [
                  {
                    'courtUid': '3cde3b21e4d74f118b8c74f0f0124094',
                    'courtName': '丽港·美度',
                    'label': '丽港·美度',
                    'courtNameAbbr': 'lg·md',
                    'labelAbbr': 'lg·md'
                  }
                ],
                'children': [
                  {
                    'courtUid': '3cde3b21e4d74f118b8c74f0f0124094',
                    'courtName': '丽港·美度',
                    'label': '丽港·美度',
                    'courtNameAbbr': 'lg·md',
                    'labelAbbr': 'lg·md'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '龙山区',
                'label': '龙山区',
                'districtAbbr': 'lsq',
                'labelAbbr': 'lsq',
                'courtList': [
                  {
                    'courtUid': '3cde3b21e4d74f118b8c74f0f0124094',
                    'courtName': '丽港·美度',
                    'label': '丽港·美度',
                    'courtNameAbbr': 'lg·md',
                    'labelAbbr': 'lg·md'
                  }
                ],
                'children': [
                  {
                    'courtUid': '3cde3b21e4d74f118b8c74f0f0124094',
                    'courtName': '丽港·美度',
                    'label': '丽港·美度',
                    'courtNameAbbr': 'lg·md',
                    'labelAbbr': 'lg·md'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '白山市',
            'label': '白山市',
            'cityAbbr': 'bss',
            'labelAbbr': 'bss',
            'districtList': [
              {
                'district': '靖宇县',
                'label': '靖宇县',
                'districtAbbr': 'jyx',
                'labelAbbr': 'jyx',
                'courtList': [
                  {
                    'courtUid': '02cf4937528d4974b7b890dfdbaeaa57',
                    'courtName': '新都庄园',
                    'label': '新都庄园',
                    'courtNameAbbr': 'xdzy',
                    'labelAbbr': 'xdzy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '02cf4937528d4974b7b890dfdbaeaa57',
                    'courtName': '新都庄园',
                    'label': '新都庄园',
                    'courtNameAbbr': 'xdzy',
                    'labelAbbr': 'xdzy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '靖宇县',
                'label': '靖宇县',
                'districtAbbr': 'jyx',
                'labelAbbr': 'jyx',
                'courtList': [
                  {
                    'courtUid': '02cf4937528d4974b7b890dfdbaeaa57',
                    'courtName': '新都庄园',
                    'label': '新都庄园',
                    'courtNameAbbr': 'xdzy',
                    'labelAbbr': 'xdzy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '02cf4937528d4974b7b890dfdbaeaa57',
                    'courtName': '新都庄园',
                    'label': '新都庄园',
                    'courtNameAbbr': 'xdzy',
                    'labelAbbr': 'xdzy'
                  }
                ]
              }
            ]
          },
          {
            'city': '白城市',
            'label': '白城市',
            'cityAbbr': 'bcs',
            'labelAbbr': 'bcs',
            'districtList': [
              {
                'district': '洮南市',
                'label': '洮南市',
                'districtAbbr': 'tns',
                'labelAbbr': 'tns',
                'courtList': [
                  {
                    'courtUid': '51bd318add4142a58b4addc2f4606f52',
                    'courtName': '上层建筑-果岭里',
                    'label': '上层建筑-果岭里',
                    'courtNameAbbr': 'scjz-gll',
                    'labelAbbr': 'scjz-gll'
                  }
                ],
                'children': [
                  {
                    'courtUid': '51bd318add4142a58b4addc2f4606f52',
                    'courtName': '上层建筑-果岭里',
                    'label': '上层建筑-果岭里',
                    'courtNameAbbr': 'scjz-gll',
                    'labelAbbr': 'scjz-gll'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '洮南市',
                'label': '洮南市',
                'districtAbbr': 'tns',
                'labelAbbr': 'tns',
                'courtList': [
                  {
                    'courtUid': '51bd318add4142a58b4addc2f4606f52',
                    'courtName': '上层建筑-果岭里',
                    'label': '上层建筑-果岭里',
                    'courtNameAbbr': 'scjz-gll',
                    'labelAbbr': 'scjz-gll'
                  }
                ],
                'children': [
                  {
                    'courtUid': '51bd318add4142a58b4addc2f4606f52',
                    'courtName': '上层建筑-果岭里',
                    'label': '上层建筑-果岭里',
                    'courtNameAbbr': 'scjz-gll',
                    'labelAbbr': 'scjz-gll'
                  }
                ]
              }
            ]
          },
          {
            'city': '辽源市',
            'label': '辽源市',
            'cityAbbr': 'lys',
            'labelAbbr': 'lys',
            'districtList': [
              {
                'district': '龙山区',
                'label': '龙山区',
                'districtAbbr': 'lsq',
                'labelAbbr': 'lsq',
                'courtList': [
                  {
                    'courtUid': '3cde3b21e4d74f118b8c74f0f0124094',
                    'courtName': '丽港·美度',
                    'label': '丽港·美度',
                    'courtNameAbbr': 'lg·md',
                    'labelAbbr': 'lg·md'
                  }
                ],
                'children': [
                  {
                    'courtUid': '3cde3b21e4d74f118b8c74f0f0124094',
                    'courtName': '丽港·美度',
                    'label': '丽港·美度',
                    'courtNameAbbr': 'lg·md',
                    'labelAbbr': 'lg·md'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '龙山区',
                'label': '龙山区',
                'districtAbbr': 'lsq',
                'labelAbbr': 'lsq',
                'courtList': [
                  {
                    'courtUid': '3cde3b21e4d74f118b8c74f0f0124094',
                    'courtName': '丽港·美度',
                    'label': '丽港·美度',
                    'courtNameAbbr': 'lg·md',
                    'labelAbbr': 'lg·md'
                  }
                ],
                'children': [
                  {
                    'courtUid': '3cde3b21e4d74f118b8c74f0f0124094',
                    'courtName': '丽港·美度',
                    'label': '丽港·美度',
                    'courtNameAbbr': 'lg·md',
                    'labelAbbr': 'lg·md'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '河南省',
        'label': '河南省',
        'provinceAbbr': 'hns',
        'labelAbbr': 'hns',
        'cityList': [
          {
            'city': '郑州市',
            'label': '郑州市',
            'cityAbbr': 'zzs',
            'labelAbbr': 'zzs',
            'districtList': [
              {
                'district': '荥阳市',
                'label': '荥阳市',
                'districtAbbr': 'yys',
                'labelAbbr': 'yys',
                'courtList': [
                  {
                    'courtUid': '46867321df0a4976bbf004cc8fb869e4',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '46867321df0a4976bbf004cc8fb869e4',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '荥阳市',
                'label': '荥阳市',
                'districtAbbr': 'yys',
                'labelAbbr': 'yys',
                'courtList': [
                  {
                    'courtUid': '46867321df0a4976bbf004cc8fb869e4',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '46867321df0a4976bbf004cc8fb869e4',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '郑州市',
            'label': '郑州市',
            'cityAbbr': 'zzs',
            'labelAbbr': 'zzs',
            'districtList': [
              {
                'district': '荥阳市',
                'label': '荥阳市',
                'districtAbbr': 'yys',
                'labelAbbr': 'yys',
                'courtList': [
                  {
                    'courtUid': '46867321df0a4976bbf004cc8fb869e4',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '46867321df0a4976bbf004cc8fb869e4',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '荥阳市',
                'label': '荥阳市',
                'districtAbbr': 'yys',
                'labelAbbr': 'yys',
                'courtList': [
                  {
                    'courtUid': '46867321df0a4976bbf004cc8fb869e4',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '46867321df0a4976bbf004cc8fb869e4',
                    'courtName': '富力城',
                    'label': '富力城',
                    'courtNameAbbr': 'flc',
                    'labelAbbr': 'flc'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '贵州省',
        'label': '贵州省',
        'provinceAbbr': 'gzs',
        'labelAbbr': 'gzs',
        'cityList': [
          {
            'city': '安顺市',
            'label': '安顺市',
            'cityAbbr': 'ass',
            'labelAbbr': 'ass',
            'districtList': [
              {
                'district': '紫云苗族布依族自治县',
                'label': '紫云苗族布依族自治县',
                'districtAbbr': 'zymzbyzzzx',
                'labelAbbr': 'zymzbyzzzx',
                'courtList': [
                  {
                    'courtUid': '4e7da363151e4fafa3ed967331c7a124',
                    'courtName': '月安花园',
                    'label': '月安花园',
                    'courtNameAbbr': 'yahy',
                    'labelAbbr': 'yahy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4e7da363151e4fafa3ed967331c7a124',
                    'courtName': '月安花园',
                    'label': '月安花园',
                    'courtNameAbbr': 'yahy',
                    'labelAbbr': 'yahy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '紫云苗族布依族自治县',
                'label': '紫云苗族布依族自治县',
                'districtAbbr': 'zymzbyzzzx',
                'labelAbbr': 'zymzbyzzzx',
                'courtList': [
                  {
                    'courtUid': '4e7da363151e4fafa3ed967331c7a124',
                    'courtName': '月安花园',
                    'label': '月安花园',
                    'courtNameAbbr': 'yahy',
                    'labelAbbr': 'yahy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4e7da363151e4fafa3ed967331c7a124',
                    'courtName': '月安花园',
                    'label': '月安花园',
                    'courtNameAbbr': 'yahy',
                    'labelAbbr': 'yahy'
                  }
                ]
              }
            ]
          },
          {
            'city': '黔东南苗族侗族自治州',
            'label': '黔东南苗族侗族自治州',
            'cityAbbr': 'qdnmzdzzzz',
            'labelAbbr': 'qdnmzdzzzz',
            'districtList': [
              {
                'district': '雷山县',
                'label': '雷山县',
                'districtAbbr': 'lsx',
                'labelAbbr': 'lsx',
                'courtList': [
                  {
                    'courtUid': '3a05fd72e2734dc5844a48c207af8e57',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '3a05fd72e2734dc5844a48c207af8e57',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '雷山县',
                'label': '雷山县',
                'districtAbbr': 'lsx',
                'labelAbbr': 'lsx',
                'courtList': [
                  {
                    'courtUid': '3a05fd72e2734dc5844a48c207af8e57',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '3a05fd72e2734dc5844a48c207af8e57',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              }
            ]
          },
          {
            'city': '黔南布依族苗族自治州',
            'label': '黔南布依族苗族自治州',
            'cityAbbr': 'qnbyzmzzzz',
            'labelAbbr': 'qnbyzmzzzz',
            'districtList': [
              {
                'district': '长顺县',
                'label': '长顺县',
                'districtAbbr': 'csx',
                'labelAbbr': 'csx',
                'courtList': [
                  {
                    'courtUid': '5e52dc104cd34d929db53a3254c8b9fe',
                    'courtName': '朝阳新城',
                    'label': '朝阳新城',
                    'courtNameAbbr': 'cyxc',
                    'labelAbbr': 'cyxc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5e52dc104cd34d929db53a3254c8b9fe',
                    'courtName': '朝阳新城',
                    'label': '朝阳新城',
                    'courtNameAbbr': 'cyxc',
                    'labelAbbr': 'cyxc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '长顺县',
                'label': '长顺县',
                'districtAbbr': 'csx',
                'labelAbbr': 'csx',
                'courtList': [
                  {
                    'courtUid': '5e52dc104cd34d929db53a3254c8b9fe',
                    'courtName': '朝阳新城',
                    'label': '朝阳新城',
                    'courtNameAbbr': 'cyxc',
                    'labelAbbr': 'cyxc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5e52dc104cd34d929db53a3254c8b9fe',
                    'courtName': '朝阳新城',
                    'label': '朝阳新城',
                    'courtNameAbbr': 'cyxc',
                    'labelAbbr': 'cyxc'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '安顺市',
            'label': '安顺市',
            'cityAbbr': 'ass',
            'labelAbbr': 'ass',
            'districtList': [
              {
                'district': '紫云苗族布依族自治县',
                'label': '紫云苗族布依族自治县',
                'districtAbbr': 'zymzbyzzzx',
                'labelAbbr': 'zymzbyzzzx',
                'courtList': [
                  {
                    'courtUid': '4e7da363151e4fafa3ed967331c7a124',
                    'courtName': '月安花园',
                    'label': '月安花园',
                    'courtNameAbbr': 'yahy',
                    'labelAbbr': 'yahy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4e7da363151e4fafa3ed967331c7a124',
                    'courtName': '月安花园',
                    'label': '月安花园',
                    'courtNameAbbr': 'yahy',
                    'labelAbbr': 'yahy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '紫云苗族布依族自治县',
                'label': '紫云苗族布依族自治县',
                'districtAbbr': 'zymzbyzzzx',
                'labelAbbr': 'zymzbyzzzx',
                'courtList': [
                  {
                    'courtUid': '4e7da363151e4fafa3ed967331c7a124',
                    'courtName': '月安花园',
                    'label': '月安花园',
                    'courtNameAbbr': 'yahy',
                    'labelAbbr': 'yahy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '4e7da363151e4fafa3ed967331c7a124',
                    'courtName': '月安花园',
                    'label': '月安花园',
                    'courtNameAbbr': 'yahy',
                    'labelAbbr': 'yahy'
                  }
                ]
              }
            ]
          },
          {
            'city': '黔东南苗族侗族自治州',
            'label': '黔东南苗族侗族自治州',
            'cityAbbr': 'qdnmzdzzzz',
            'labelAbbr': 'qdnmzdzzzz',
            'districtList': [
              {
                'district': '雷山县',
                'label': '雷山县',
                'districtAbbr': 'lsx',
                'labelAbbr': 'lsx',
                'courtList': [
                  {
                    'courtUid': '3a05fd72e2734dc5844a48c207af8e57',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '3a05fd72e2734dc5844a48c207af8e57',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '雷山县',
                'label': '雷山县',
                'districtAbbr': 'lsx',
                'labelAbbr': 'lsx',
                'courtList': [
                  {
                    'courtUid': '3a05fd72e2734dc5844a48c207af8e57',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '3a05fd72e2734dc5844a48c207af8e57',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              }
            ]
          },
          {
            'city': '黔南布依族苗族自治州',
            'label': '黔南布依族苗族自治州',
            'cityAbbr': 'qnbyzmzzzz',
            'labelAbbr': 'qnbyzmzzzz',
            'districtList': [
              {
                'district': '长顺县',
                'label': '长顺县',
                'districtAbbr': 'csx',
                'labelAbbr': 'csx',
                'courtList': [
                  {
                    'courtUid': '5e52dc104cd34d929db53a3254c8b9fe',
                    'courtName': '朝阳新城',
                    'label': '朝阳新城',
                    'courtNameAbbr': 'cyxc',
                    'labelAbbr': 'cyxc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5e52dc104cd34d929db53a3254c8b9fe',
                    'courtName': '朝阳新城',
                    'label': '朝阳新城',
                    'courtNameAbbr': 'cyxc',
                    'labelAbbr': 'cyxc'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '长顺县',
                'label': '长顺县',
                'districtAbbr': 'csx',
                'labelAbbr': 'csx',
                'courtList': [
                  {
                    'courtUid': '5e52dc104cd34d929db53a3254c8b9fe',
                    'courtName': '朝阳新城',
                    'label': '朝阳新城',
                    'courtNameAbbr': 'cyxc',
                    'labelAbbr': 'cyxc'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5e52dc104cd34d929db53a3254c8b9fe',
                    'courtName': '朝阳新城',
                    'label': '朝阳新城',
                    'courtNameAbbr': 'cyxc',
                    'labelAbbr': 'cyxc'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '江苏省',
        'label': '江苏省',
        'provinceAbbr': 'jss',
        'labelAbbr': 'jss',
        'cityList': [
          {
            'city': '宿迁市',
            'label': '宿迁市',
            'cityAbbr': 'sqs',
            'labelAbbr': 'sqs',
            'districtList': [
              {
                'district': '泗洪县',
                'label': '泗洪县',
                'districtAbbr': 'shx',
                'labelAbbr': 'shx',
                'courtList': [
                  {
                    'courtUid': '5b3e61fb08cf421d9c268ea813251c2f',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5b3e61fb08cf421d9c268ea813251c2f',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '泗洪县',
                'label': '泗洪县',
                'districtAbbr': 'shx',
                'labelAbbr': 'shx',
                'courtList': [
                  {
                    'courtUid': '5b3e61fb08cf421d9c268ea813251c2f',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5b3e61fb08cf421d9c268ea813251c2f',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '宿迁市',
            'label': '宿迁市',
            'cityAbbr': 'sqs',
            'labelAbbr': 'sqs',
            'districtList': [
              {
                'district': '泗洪县',
                'label': '泗洪县',
                'districtAbbr': 'shx',
                'labelAbbr': 'shx',
                'courtList': [
                  {
                    'courtUid': '5b3e61fb08cf421d9c268ea813251c2f',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5b3e61fb08cf421d9c268ea813251c2f',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '泗洪县',
                'label': '泗洪县',
                'districtAbbr': 'shx',
                'labelAbbr': 'shx',
                'courtList': [
                  {
                    'courtUid': '5b3e61fb08cf421d9c268ea813251c2f',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ],
                'children': [
                  {
                    'courtUid': '5b3e61fb08cf421d9c268ea813251c2f',
                    'courtName': '富顿中心',
                    'label': '富顿中心',
                    'courtNameAbbr': 'fdzx',
                    'labelAbbr': 'fdzx'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'province': '黑龙江省',
        'label': '黑龙江省',
        'provinceAbbr': 'hljs',
        'labelAbbr': 'hljs',
        'cityList': [
          {
            'city': '鹤岗市',
            'label': '鹤岗市',
            'cityAbbr': 'hgs',
            'labelAbbr': 'hgs',
            'districtList': [
              {
                'district': '向阳区',
                'label': '向阳区',
                'districtAbbr': 'xyq',
                'labelAbbr': 'xyq',
                'courtList': [
                  {
                    'courtUid': '107400d0ac1b4380a247c520550f421c',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '107400d0ac1b4380a247c520550f421c',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '向阳区',
                'label': '向阳区',
                'districtAbbr': 'xyq',
                'labelAbbr': 'xyq',
                'courtList': [
                  {
                    'courtUid': '107400d0ac1b4380a247c520550f421c',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '107400d0ac1b4380a247c520550f421c',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ]
              }
            ]
          },
          {
            'city': '双鸭山',
            'label': '双鸭山',
            'cityAbbr': 'sys',
            'labelAbbr': 'sys',
            'districtList': [
              {
                'district': '尖山区',
                'label': '尖山区',
                'districtAbbr': 'jsq',
                'labelAbbr': 'jsq',
                'courtList': [
                  {
                    'courtUid': '6887a758e73a49e397cf4b6c95fb3c8e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '6887a758e73a49e397cf4b6c95fb3c8e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '尖山区',
                'label': '尖山区',
                'districtAbbr': 'jsq',
                'labelAbbr': 'jsq',
                'courtList': [
                  {
                    'courtUid': '6887a758e73a49e397cf4b6c95fb3c8e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '6887a758e73a49e397cf4b6c95fb3c8e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ]
              }
            ]
          }
        ],
        'children': [
          {
            'city': '鹤岗市',
            'label': '鹤岗市',
            'cityAbbr': 'hgs',
            'labelAbbr': 'hgs',
            'districtList': [
              {
                'district': '向阳区',
                'label': '向阳区',
                'districtAbbr': 'xyq',
                'labelAbbr': 'xyq',
                'courtList': [
                  {
                    'courtUid': '107400d0ac1b4380a247c520550f421c',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '107400d0ac1b4380a247c520550f421c',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '向阳区',
                'label': '向阳区',
                'districtAbbr': 'xyq',
                'labelAbbr': 'xyq',
                'courtList': [
                  {
                    'courtUid': '107400d0ac1b4380a247c520550f421c',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '107400d0ac1b4380a247c520550f421c',
                    'courtName': '金宸公寓',
                    'label': '金宸公寓',
                    'courtNameAbbr': 'jcgy',
                    'labelAbbr': 'jcgy'
                  }
                ]
              }
            ]
          },
          {
            'city': '双鸭山',
            'label': '双鸭山',
            'cityAbbr': 'sys',
            'labelAbbr': 'sys',
            'districtList': [
              {
                'district': '尖山区',
                'label': '尖山区',
                'districtAbbr': 'jsq',
                'labelAbbr': 'jsq',
                'courtList': [
                  {
                    'courtUid': '6887a758e73a49e397cf4b6c95fb3c8e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '6887a758e73a49e397cf4b6c95fb3c8e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ]
              }
            ],
            'children': [
              {
                'district': '尖山区',
                'label': '尖山区',
                'districtAbbr': 'jsq',
                'labelAbbr': 'jsq',
                'courtList': [
                  {
                    'courtUid': '6887a758e73a49e397cf4b6c95fb3c8e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ],
                'children': [
                  {
                    'courtUid': '6887a758e73a49e397cf4b6c95fb3c8e',
                    'courtName': '碧水云天·颐园',
                    'label': '碧水云天·颐园',
                    'courtNameAbbr': 'bsyt·yy',
                    'labelAbbr': 'bsyt·yy'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
})
