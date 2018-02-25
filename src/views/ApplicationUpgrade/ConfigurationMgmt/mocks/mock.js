import Mock from 'mockjs'

let contextPath = '/scp-upgradecomponent'

/** ====================省================================ */
Mock.mock(contextPath + '/provinceData/queryProvinceData', function () {
  console.log('mock getauServersList')
  return {
    code: '00000',
    data: [
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '吉林省',
        provinceAbbr: 'jl',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '天津市',
        provinceAbbr: 'tj',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '山东省',
        provinceAbbr: 'sd',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '贵州省',
        provinceAbbr: 'gz',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '黑龙江省',
        provinceAbbr: 'hlj',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '湖南省',
        provinceAbbr: 'hn',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '浙江省',
        provinceAbbr: 'zj',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '北京市',
        provinceAbbr: 'bj',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '福建省',
        provinceAbbr: 'fj',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '辽宁省',
        provinceAbbr: 'ln',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '安徽省',
        provinceAbbr: 'ah',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '湖北省',
        provinceAbbr: 'hb',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '河南省',
        provinceAbbr: 'hn',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '河北省',
        provinceAbbr: 'hb',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '山西省',
        provinceAbbr: 'sx',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '江苏省',
        provinceAbbr: 'js',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '上海市',
        provinceAbbr: 'sh',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '广东省',
        provinceAbbr: 'gd',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: '江西省',
        provinceAbbr: 'jx',
        city: null,
        cityAbbr: null,
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      }
    ],
    message: 'success'
  }
})
/** ====================市================================ */
Mock.mock(contextPath + '/cityData/queryProvinceData', function () {
  console.log('mock getauServersList')
  return {
    code: '00000',
    data: [
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: '长春市',
        cityAbbr: 'cc',
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: '松原市',
        cityAbbr: 'sy',
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: '通化市',
        cityAbbr: 'th',
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: '辽源市',
        cityAbbr: 'ly',
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: '四平',
        cityAbbr: 'sp',
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: '延边朝鲜族自治州',
        cityAbbr: 'ybcxzzzz',
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: '吉林市',
        cityAbbr: 'jl',
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: '白城市',
        cityAbbr: 'bc',
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: '白山市',
        cityAbbr: 'bs',
        district: null,
        districtAbbr: null,
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      }
    ],
    message: 'success'
  }
})
/** ====================区================================ */
Mock.mock(contextPath + '/districtData/queryProvinceData', function () {
  console.log('mock getauServersList')
  return {
    code: '00000',
    data: [
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: null,
        cityAbbr: null,
        district: '单县',
        districtAbbr: 'dx',
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: null,
        cityAbbr: null,
        district: '成武县',
        districtAbbr: 'cwx',
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: null,
        cityAbbr: null,
        district: '牡丹区',
        districtAbbr: 'mdq',
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      },
      {
        uuid: null,
        name: null,
        nameAbbr: null,
        province: null,
        provinceAbbr: null,
        city: null,
        cityAbbr: null,
        district: '鄄城县',
        districtAbbr: 'jcx',
        area: null,
        address: null,
        houseCount: null,
        homeCount: null,
        buildArea: null,
        floorArea: null,
        memo: null,
        publicIp1: null,
        publicPort1: null,
        publicIp2: null,
        publicPort2: null,
        platformFlag: null,
        deleteFlag: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null,
        phone: null
      }
    ],
    message: 'success'
  }
})
/** ====================硬件服务器信息================================ */

Mock.mock(contextPath + '/auServers/queryPageData', function () {
  // console.log('mock getauServersList')
  return {
    pageCount: 3,
    auServersList: [
      {
        uuid: '53fde118d8544efdac39c9992a445989',
        aeestNo: null,
        biosVersion: '6.00',
        cabU: null,
        cabinet: '恒大山水城',
        courtUuid: 'c69aeede4f6341929721e2832beec3c',
        cpuFreq: 2.4,
        cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        createTime: null,
        createUser: null,
        deleteFlag: null,
        deployment: null,
        hostname: 'GD-GZ-SHC-01-VM-ms-web-01',
        lhdSpaceFree: 381,
        lhdSpaceTotal: 389,
        location: null,
        mgmtIp: null,
        model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        name: 'VMware Virtual Platform',
        numberOfCore: 2,
        numberOfLhd: 4,
        numberOfPhd: 1,
        operator: null,
        phdSpaceFree: null,
        phdSpaceTotal: 400,
        ram: 1982,
        roles: '""',
        serialNo: 'VMware-42 2b af fe dd 0b cc ab-08 a3 b1 0d 5a 58 bf 8b',
        serviceDuring: null,
        serviceLevel: null,
        status: null,
        updateTime: 1516863325239,
        updateUser: 'admin',
        vendor: 'VMware, Inc.',
        serviceProvider: null,
        functionName: null,
        remark: '测试数据sssll',
        auNetAdapters: [
          {
            uuid: 'fb439785b8ad4595b502781aef40c661',
            serverId: null,
            name: '82545EM Gigabit Ethernet Controller (Copper)',
            adapterType: 'physical_adapter',
            mac: '00:50:56:ab:5b:f1',
            ip: '192.168.0.201',
            bindWidth: null,
            provider: 'Intel Corporation',
            deleteFlag: null,
            createTime: null,
            createUser: null,
            updateTime: null,
            updateUser: null,
            courtUuid: null,
            remark: null
          }
        ],
        auPhds: [
          {
            uuid: 'e0e26ba28b4b4de4b354532369f8c4ab',
            serverId: '53fde118d8544efdac39c9992a445989',
            serialNo: '',
            spaceTotal: null,
            spaceFree: null,
            deleteFlag: null,
            createTime: null,
            createUser: null,
            updateTime: null,
            updateUser: null,
            courtUuid: null,
            remark: null
          }
        ],
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        }
      },
      {
        uuid: 'e927d7c84a4d433f812804ff757fb967',
        aeestNo: null,
        biosVersion: '6.00',
        cabU: 'fdasfdafsdfsfs',
        cabinet: 'bbccccccc',
        courtUuid: 'c69aeede4f6341929721e2832beec3c',
        cpuFreq: 2.4,
        cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        createTime: null,
        createUser: null,
        deleteFlag: null,
        deployment: 'bbb',
        hostname: 'GD-GZ-SHC-01-VM-ms-web-02',
        lhdSpaceFree: 374,
        lhdSpaceTotal: 389,
        location: null,
        mgmtIp: null,
        model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        name: 'VMware Virtual Platform',
        numberOfCore: 2,
        numberOfLhd: 5,
        numberOfPhd: 1,
        operator: null,
        phdSpaceFree: null,
        phdSpaceTotal: 400,
        ram: 1982,
        roles: '""',
        serialNo: 'VMware-42 2b d9 1f e0 ab fa 3e-74 40 2f 59 45 7b 03 7d',
        serviceDuring: null,
        serviceLevel: null,
        status: null,
        updateTime: 1516882300620,
        updateUser: 'admin',
        vendor: 'VMware, Inc.',
        serviceProvider: null,
        functionName: null,
        remark: 'bb',
        auNetAdapters: [
          {
            uuid: 'd9d5df63526f468ab50512f86538b422',
            serverId: null,
            name: '82545EM Gigabit Ethernet Controller (Copper)',
            adapterType: 'physical_adapter',
            mac: '00:50:56:ab:51:9c',
            ip: '192.168.0.203',
            bindWidth: null,
            provider: 'Intel Corporation',
            deleteFlag: null,
            createTime: null,
            createUser: null,
            updateTime: null,
            updateUser: null,
            courtUuid: null,
            remark: null
          }
        ],
        auPhds: [
          {
            uuid: '861bb0a5a57d4434a338f42dfa50744a',
            serverId: 'e927d7c84a4d433f812804ff757fb967',
            serialNo: '',
            spaceTotal: null,
            spaceFree: null,
            deleteFlag: null,
            createTime: null,
            createUser: null,
            updateTime: null,
            updateUser: null,
            courtUuid: null,
            remark: null
          }
        ],
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        }
      },
      {
        uuid: 'd9d5df63526f468ab50512f86538b422',
        aeestNo: null,
        biosVersion: '6.00',
        cabU: null,
        cabinet: null,
        courtUuid: 'c69aeede4f6341929721e2832beec3c',
        cpuFreq: 2.4,
        cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        createTime: null,
        createUser: null,
        deleteFlag: null,
        deployment: null,
        hostname: 'GD-GZ-SHC-01-VM-ms-web-03',
        lhdSpaceFree: 375,
        lhdSpaceTotal: 389,
        location: null,
        mgmtIp: null,
        model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        name: 'VMware Virtual Platform',
        numberOfCore: 2,
        numberOfLhd: 4,
        numberOfPhd: 1,
        operator: null,
        phdSpaceFree: null,
        phdSpaceTotal: 400,
        ram: 1982,
        roles: '""',
        serialNo: 'VMware-42 2b a0 4f ba a1 42 23-1d 9c 98 55 49 1b d7 12',
        serviceDuring: null,
        serviceLevel: null,
        status: null,
        updateTime: null,
        updateUser: null,
        vendor: 'VMware, Inc.',
        serviceProvider: null,
        functionName: null,
        remark: null,
        auNetAdapters: [],
        auPhds: [],
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        }
      }
    ]
  }
})

// Mock小区数据
Mock.mock(contextPath + '/auAddrData/queryAddrData', function () {
  console.log('mock get address data information')
  return {
    addressData: [
      {
        value: 'guangdong',
        name: '广东',
        children: [
          {
            value: 'guangzhou',
            name: '广州',
            children: [
              {
                value: 'liwan',
                name: '荔湾区'
              },
              {
                value: 'yuexiu',
                name: '越秀区'
              },
              {
                value: 'haizhu',
                name: '海珠区'
              },
              {
                value: 'tianhe',
                name: '天河区'
              },
              {
                value: 'huangpu',
                name: '黄埔区'
              },
              {
                value: 'panyu',
                name: '番禺区'
              },
              {
                value: 'huadu',
                name: '花都区'
              },
              {
                value: 'nansha',
                name: '南沙区'
              },
              {
                value: 'zengcheng',
                name: '增城区'
              },
              {
                value: 'conghua',
                name: '从化区'
              }
            ]
          },
          {
            value: 'shenzhen',
            name: '深圳',
            children: [
              {
                value: 'luohu',
                name: '罗湖区'
              },
              {
                value: 'luofu',
                name: '福田区'
              },
              {
                value: 'nanshan',
                name: '南山区'
              },
              {
                value: 'baoan',
                name: '宝安区'
              },
              {
                value: 'longgang',
                name: '龙岗区'
              },
              {
                value: 'yantian',
                name: '盐田区'
              },
              {
                value: 'guagming',
                name: '光明新区'
              },
              {
                value: 'longhua',
                name: '龙华区'
              },
              {
                value: 'shenshan',
                name: '深汕区'
              },
              {
                value: 'pingshan',
                name: '坪山区'
              },
              {
                value: 'dapeng',
                name: '大鹏新区'
              }
            ]
          }
        ]
      },
      {
        value: 'hubei',
        name: '湖北',
        children: [
          {
            value: 'wuhan',
            name: '武汉',
            children: [
              {
                value: 'hongshan',
                name: '洪山'
              },
              {
                value: 'wuchang',
                name: '武昌'
              },
              {
                value: 'donghu',
                name: '东湖'
              },
              {
                value: 'qingshan',
                name: '青山'
              }
            ]
          }
        ]
      }
    ]
  }
})

// 查看每条服务器的详细信息
Mock.mock(contextPath + '/auServers/get/id', function () {
  console.log('mock getauServersDetails')
  return {
    auServers: {
      uuid: '53fde118d8544efdac39c9992a445989',
      aeestNo: null,
      biosVersion: '6.00',
      cabU: null,
      cabinet: '恒大山水城',
      courtUuid: 'c69aeede4f6341929721e2832beec3c',
      cpuFreq: 2.4,
      cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
      createTime: null,
      createUser: null,
      deleteFlag: null,
      deployment: null,
      hostname: 'GD-GZ-SHC-01-VM-ms-web-01',
      lhdSpaceFree: 381,
      lhdSpaceTotal: 389,
      location: null,
      mgmtIp: null,
      model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
      name: 'VMware Virtual Platform',
      numberOfCore: 2,
      numberOfLhd: 4,
      numberOfPhd: 1,
      operator: null,
      phdSpaceFree: null,
      phdSpaceTotal: 400,
      ram: 1982,
      roles: '""',
      serialNo: 'VMware-42 2b af fe dd 0b cc ab-08 a3 b1 0d 5a 58 bf 8b',
      serviceDuring: null,
      serviceLevel: null,
      status: null,
      updateTime: 1516863325239,
      updateUser: 'admin',
      vendor: 'VMware, Inc.',
      serviceProvider: null,
      functionName: null,
      remark: '测试数据sssll',
      auNetAdapters: [
        {
          uuid: 'fb439785b8ad4595b502781aef40c661',
          serverId: '53fde118d8544efdac39c9992a445989',
          name: '82545EM Gigabit Ethernet Controller (Copper)',
          adapterType: 'physical_adapter',
          mac: '00:50:56:ab:5b:f1',
          ip: '192.168.0.201',
          bindWidth: null,
          provider: 'Intel Corporation',
          deleteFlag: null,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null,
          courtUuid: null,
          remark: null
        }
      ],
      auPhds: [
        {
          uuid: 'e0e26ba28b4b4de4b354532369f8c4ab',
          serverId: '53fde118d8544efdac39c9992a445989',
          serialNo: '',
          spaceTotal: null,
          spaceFree: null,
          deleteFlag: null,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null,
          courtUuid: null,
          remark: null
        }
      ],
      courtDto: {
        uuid: '043605582e0f4f8a8b8a4dee56e49e02',
        name: '土博士城',
        nameAbbr: 'tbsc',
        province: '江西省',
        provinceAbbr: 'jx',
        city: '上饶市',
        cityAbbr: 'sr',
        district: '上饶县',
        districtAbbr: 'srx',
        area: '01',
        address: '上饶市上饶县土博士城小区01单元',
        memo: '上饶市上饶县土博士城小区01单元',
        publicIp1: '192.168.42.26',
        publicIp2: '192.168.154.61,172.16.128.32,10.10.126.249,172.16.9.143',
        publicPort1: '8004',
        publicPort2: '8858,2216,2577,7369',
        platformFlag: null,
        deleteFlag: 0,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null
      }
    },
    auServersList: null,
    auServersHisList: null
  }
})

// 编辑服务器信息
Mock.mock(contextPath + '/auServers/update', function () {
  console.log('mock update server information')
  return {}
})

// 刷新服务器信息
Mock.mock(contextPath + '/auServers/syncServerDataById/{id}', function () {
  console.log('mock sync server data')
  return {
    syncMessage: {
      msg: 'success'
    }
  }
})

// 获取服务器的历史信息
Mock.mock(contextPath + '/auServers/queryHistoryById/{id}', function () {
  console.log('mock get server history information')
  return {
    auServersHisList: [
      {
        uuid: '2885576c0d044b00b3e1294c8c7a616',
        hostname: 'GD-FS-YHJ-01-dell-R730-web-01',
        location: '恒大山水城一期',
        functionCode: 'server01',
        functionName: 'testServers01',
        cpuModel: 'Dell 730',
        numberOfCore: 123,
        cpuFreq: 8,
        biosVersion: '1.2',
        ram: 8,
        numberOfLhd: 80,
        numberOfPhd: 160,
        lhdSpaceTotal: 80,
        lhdSpaceFree: 80,
        phdSpaceTotal: 160,
        phdSpaceFree: 20,
        deployment: 'test',
        cabinet: 'test',
        cabU: 'test',
        roles: 'system',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"}]',
        changedDataDto: {
          propertyName: 'hostName',
          desc: '主机名',
          oldValue: '恒大山水郡监控主机',
          newValue: '恒大山水郡test主机'
        },
        deleteFlag: 0,
        createTime: 1514943394149,
        createUser: 'sysytem',
        updateTime: 1514943394150,
        updateUser: 'system',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '2885576c0d044b00b3e1294c8c7a616',
        hostname: 'GD-FS-YHJ-01-dell-R730-web-01',
        location: '恒大山水城一期',
        functionCode: 'server01',
        functionName: 'testServers01',
        cpuModel: 'Dell 730',
        numberOfCore: 123,
        cpuFreq: 8,
        biosVersion: '1.2',
        ram: 8,
        numberOfLhd: 80,
        numberOfPhd: 160,
        lhdSpaceTotal: 80,
        lhdSpaceFree: 80,
        phdSpaceTotal: 160,
        phdSpaceFree: 20,
        deployment: 'test',
        cabinet: 'test',
        cabU: 'test',
        roles: 'system',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"}]',
        changedDataDto: {
          propertyName: 'hostName',
          desc: '主机名',
          oldValue: '恒大山水郡监控主机',
          newValue: '恒大山水郡test主机'
        },
        deleteFlag: 0,
        createTime: 1514943394149,
        createUser: 'sysytem',
        updateTime: 1514943394150,
        updateUser: 'system',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '2885576c0d044b00b3e1294c8c7a616',
        hostname: 'GD-FS-YHJ-01-dell-R730-web-01',
        location: '恒大山水城一期',
        functionCode: 'server01',
        functionName: 'testServers01',
        cpuModel: 'Dell 730',
        numberOfCore: 123,
        cpuFreq: 8,
        biosVersion: '1.2',
        ram: 8,
        numberOfLhd: 80,
        numberOfPhd: 160,
        lhdSpaceTotal: 80,
        lhdSpaceFree: 80,
        phdSpaceTotal: 160,
        phdSpaceFree: 20,
        deployment: 'test',
        cabinet: 'test',
        cabU: 'test',
        roles: 'system',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"}]',
        changedDataDto: {
          propertyName: 'hostName',
          desc: '主机名',
          oldValue: '恒大山水郡监控主机',
          newValue: '恒大山水郡test主机'
        },
        deleteFlag: 0,
        createTime: 1514943394149,
        createUser: 'sysytem',
        updateTime: 1514943394150,
        updateUser: 'system',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '2885576c0d044b00b3e1294c8c7a616',
        hostname: 'GD-FS-YHJ-01-dell-R730-web-01',
        location: '恒大山水城一期',
        functionCode: 'server01',
        functionName: 'testServers01',
        cpuModel: 'Dell 730',
        numberOfCore: 123,
        cpuFreq: 8,
        biosVersion: '1.2',
        ram: 8,
        numberOfLhd: 80,
        numberOfPhd: 160,
        lhdSpaceTotal: 80,
        lhdSpaceFree: 80,
        phdSpaceTotal: 160,
        phdSpaceFree: 20,
        deployment: 'test',
        cabinet: 'test',
        cabU: 'test',
        roles: 'system',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"}]',
        changedDataDto: {
          propertyName: 'hostName',
          desc: '主机名',
          oldValue: '恒大山水郡监控主机',
          newValue: '恒大山水郡test主机'
        },
        deleteFlag: 0,
        createTime: 1514943394149,
        createUser: 'sysytem',
        updateTime: 1514943394150,
        updateUser: 'system',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '2885576c0d044b00b3e1294c8c7a616',
        hostname: 'GD-FS-YHJ-01-dell-R730-web-01',
        location: '恒大山水城一期',
        functionCode: 'server01',
        functionName: 'testServers01',
        cpuModel: 'Dell 730',
        numberOfCore: 123,
        cpuFreq: 8,
        biosVersion: '1.2',
        ram: 8,
        numberOfLhd: 80,
        numberOfPhd: 160,
        lhdSpaceTotal: 80,
        lhdSpaceFree: 80,
        phdSpaceTotal: 160,
        phdSpaceFree: 20,
        deployment: 'test',
        cabinet: 'test',
        cabU: 'test',
        roles: 'system',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"}]',
        changedDataDto: {
          propertyName: 'hostName',
          desc: '主机名',
          oldValue: '恒大山水郡监控主机',
          newValue: '恒大山水郡test主机'
        },
        deleteFlag: 0,
        createTime: 1514943394149,
        createUser: 'sysytem',
        updateTime: 1514943394150,
        updateUser: 'system',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '2885576c0d044b00b3e1294c8c7a616',
        hostname: 'GD-FS-YHJ-01-dell-R730-web-01',
        location: '恒大山水城一期',
        functionCode: 'server01',
        functionName: 'testServers01',
        cpuModel: 'Dell 730',
        numberOfCore: 123,
        cpuFreq: 8,
        biosVersion: '1.2',
        ram: 8,
        numberOfLhd: 80,
        numberOfPhd: 160,
        lhdSpaceTotal: 80,
        lhdSpaceFree: 80,
        phdSpaceTotal: 160,
        phdSpaceFree: 20,
        deployment: 'test',
        cabinet: 'test',
        cabU: 'test',
        roles: 'system',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"},{"propertyName":"hostName","desc":"主机名","oldValue":"恒大山水郡监控主机","newValue":"恒大山水郡test主机"}]',
        changedDataDto: {
          propertyName: 'hostName',
          desc: '主机名',
          oldValue: '恒大山水郡监控主机',
          newValue: '恒大山水郡test主机'
        },
        deleteFlag: 0,
        createTime: 1514943394149,
        createUser: 'sysytem',
        updateTime: 1514943394150,
        updateUser: 'system',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      }
    ]
  }
})

/** ====================应用&服务信息================================ */
Mock.mock(contextPath + '/auServices/queryPageData', function () {
  console.log('mock getauServersList')
  return {
    pageCount: 3,
    auServicesList: [
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService',
        version: '1.0',
        port: '8080',
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01',
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616',
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        }
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService',
        version: '1.0',
        port: '8080',
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01',
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService',
        version: '1.0',
        port: '8080',
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01',
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616',
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        }
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService',
        version: '1.0',
        port: '8080',
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01',
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616',
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        }
      }
    ]
  }
})

Mock.mock(contextPath + '/auServices/get/{id}', function () {
  console.log('mock app service details')
  return {
    auServices: {
      uuid: '504974ce594b4779875799312b9c1b2e',
      serverId: '2885576c0d044b00b3e1294c8c7a616',
      appId: 'string',
      domainName: 'hdsc.com', // 服务域名
      name: 'testService', // 应用&服务名称
      version: '1.0', // 应用&服务版本
      port: '8080', // 应用&服务端口
      processName: 'test', // 服务进程名称
      configFilename: 'config.properties', // 配置文件名称
      configPath: 'D:\\document', // 配置文件路径
      configVersion: '1.0', // 配置文件版本
      startUser: 'test01', // 应用&服务启动用户
      attr1: 'string',
      attr2: 'string',
      attr3: 'string',
      attr4: 'string',
      attr5: 'string',
      deleteFlag: 0,
      createTime: 1515065866434,
      createUser: 'string',
      updateTime: 1515065866434,
      updateUser: 'test01',
      courtUuid: '2885576c0d044b00b3e1894c8c7a616',
      oss: {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        hostname: 'GD-FS-YHJ-01-dell-R730-web-01',
        softwareType: null,
        name: 'testService', // 操作系统名称
        version: '1.0',
        servicePack: 'package01',
        dataLength: 64, // 操作系统位数
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      upgradeServers: {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        domainName: 'hdsc.com', // 小区云升级服务域名
        hostname: 'GD-FS-YHJ-01-dell-R730-web-01', // 升级服务器主机名称
        intranetIp: '192.168.0.186', // 升级服务器IP
        publicIp: '111.13.101.208', // 小区云升级服务公网IP
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      applications: {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        softwareType: null,
        code: null,
        name: 'testService',
        version: '1.0',
        provider: 'zhangsan',
        path: '\\test\\201801042000', // 服务安装目录
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      courtDto: {
        uuid: 'c69aeede4f6341929721e2832beec3c',
        name: '恒大山水城',
        nameAbbr: 'shc',
        province: '广东省',
        provinceAbbr: 'gd',
        city: '广州市',
        cityAbbr: 'gz',
        district: '增城区',
        districtAbbr: 'zc',
        area: '01',
        address: '广东省广州市增城中新镇恒大山水城',
        memo: '恒大山水城',
        publicIp1: '192.168.0.242',
        publicIp2: '',
        publicPort1: '30940',
        publicPort2: '',
        platformFlag: null,
        deleteFlag: 0,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null
      }
    },
    auServicesList: null,
    auServicesHisList: null
  }
})

Mock.mock(contextPath + '/auServices/update', function () {
  console.log('mock update app service details')
  return {
    uuid: '504974ce594b4779875799312b9c1b2e',
    serverId: '2885576c0d044b00b3e1294c8c7a616',
    appId: '5adb48befdbe4f74a42461b1797f52c1',
    domainName: 'hdsc.com',
    name: 'testService', // 应用&服务名称
    version: '1.0', // 应用&服务版本
    port: '8080', // 应用&服务端口
    processName: 'test',
    configFilename: 'config.properties',
    configPath: 'D:\\document',
    configVersion: '1.0',
    startUser: 'test01', // 应用&服务启动用户
    attr1: 'string',
    attr2: 'string',
    attr3: 'string',
    attr4: 'string',
    attr5: 'string',
    deleteFlag: 0,
    createTime: 1515065866434,
    createUser: 'string',
    updateTime: 1515065866434,
    updateUser: 'test01',
    courtUuid: '2885576c0d044b00b3e1894c8c7a616'
  }
})

Mock.mock(contextPath + '/auServices/queryHistoryById/{id}', function () {
  console.log('mock get app service history information')
  return {
    auServersHisList: [
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜001'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜001'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜001'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜001'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜002'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      }
    ]
  }
})

/** =================操作系统信息================================ */
Mock.mock(contextPath + '/auOss/queryPageData', function () {
  console.log('mock getauServersList')
  return {
    pageCount: 15,
    ossList: [
      {
        uuid: '5b11a98166364d6098ebd5fcb0b5aa1a',
        serverId: '53fde118d8544efdac39c9992a445989',
        hostname: 'GD-GZ-SHC-01-VM-ms-web-01',
        softwareType: null,
        name: 'Ubuntu',
        version: '16.04',
        servicePack: '16.04',
        dataLength: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: null,
        vendor: null,
        remark: null,
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: 'c49f99967c914e62b077642f33f2f9d5',
        serverId: 'e927d7c84a4d433f812804ff757fb967',
        hostname: 'GD-GZ-SHC-01-VM-ms-web-03',
        softwareType: null,
        name: 'Ubuntu',
        version: '16.04',
        servicePack: '16.04',
        dataLength: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: null,
        vendor: null,
        remark: null,
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      }
    ]
  }
})

Mock.mock(contextPath + '/auOss/get?id=', function () {
  console.log('mock OS details')
  return {
    auOss: {
      uuid: '122b73ef1a4048d0acee9deb59e49811',
      serverId: '7480e95b82714df8971d65bb87f8a81c',
      hostname: 'GD-FS-YHJ-01-dell-R730-web-01',
      softwareType: 'test',
      name: 'windows10',
      version: 'windows10',
      servicePack: 'test',
      dataLength: 64,
      deleteFlag: 0,
      createTime: 1515067409000,
      createUser: 'system',
      updateTime: 1516085007388,
      updateUser: 'system',
      courtUuid: '2885576c0d044b00b3e1894c8c7a616',
      vendor: '微软',
      remark: '操作系统的版本002',
      courtDto: {
        uuid: '00ff4ab12cf74f4ba8f1dac68583887c',
        name: '北京太阳城',
        nameAbbr: 'bjtyc',
        province: '辽宁省',
        provinceAbbr: 'ln',
        city: '沈阳市',
        cityAbbr: 'sy',
        district: '皇姑区',
        districtAbbr: 'hgq',
        area: '09',
        address: '沈阳市皇姑区北京太阳城小区09单元',
        memo: '沈阳市皇姑区北京太阳城小区09单元',
        publicIp1: '192.168.92.246',
        publicIp2: '192.168.29.253,172.16.48.99,10.10.116.25,172.16.69.134',
        publicPort1: '8562',
        publicPort2: '11691,5514,4806,4645',
        platformFlag: null,
        deleteFlag: 0,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null
      },
      changedDataDto: null,
      newItems: []
    },
    auOssList: null,
    auOssHisList: null
  }
})

Mock.mock(contextPath + '/osServices/update', function () {
  console.log('mock update os details')
  return {
    uuid: '504974ce594b4779875799312b9c1b2e',
    serverId: '2885576c0d044b00b3e1294c8c7a616',
    appId: '5adb48befdbe4f74a42461b1797f52c1',
    domainName: 'hdsc.com',
    name: 'testService', // 应用&服务名称
    version: '1.0', // 应用&服务版本
    port: '8080', // 应用&服务端口
    processName: 'test',
    configFilename: 'config.properties',
    configPath: 'D:\\document',
    configVersion: '1.0',
    startUser: 'test01', // 应用&服务启动用户
    attr1: 'string',
    attr2: 'string',
    attr3: 'string',
    attr4: 'string',
    attr5: 'string',
    deleteFlag: 0,
    createTime: 1515065866434,
    createUser: 'string',
    updateTime: 1515065866434,
    updateUser: 'test01',
    courtUuid: '2885576c0d044b00b3e1894c8c7a616'
  }
})

Mock.mock(contextPath + '/osServices/queryHistoryById/{id}', function () {
  console.log('mock get OS history information')
  return {
    auServersHisList: [
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜001'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜001'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜001'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜001'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      },
      {
        uuid: '504974ce594b4779875799312b9c1b2e',
        serverId: '2885576c0d044b00b3e1294c8c7a616',
        appId: '5adb48befdbe4f74a42461b1797f52c1',
        domainName: 'hdsc.com',
        name: 'testService', // 应用&服务名称
        version: '1.0', // 应用&服务版本
        port: '8080', // 应用&服务端口
        processName: 'test',
        configFilename: 'config.properties',
        configPath: 'D:\\document',
        configVersion: '1.0',
        startUser: 'test01', // 应用&服务启动用户
        attr1: 'string',
        attr2: 'string',
        attr3: 'string',
        attr4: 'string',
        attr5: 'string',
        hisUuid: '2885576c0d045b00b3e1294c8c7a616',
        archievingUser: 'sysytem',
        archievingTime: 1514943394150,
        changedData:
          '[{"propertyName":"hostName","desc":"主机名","oldValue":"test1","newValue":"test2"}]', // 发生变化的字段值信息
        changedDataDto: {
          propertyName: 'cabinet',
          desc: '安装的机柜',
          oldValue: 'test',
          newValue: '测试机柜002'
        },
        deleteFlag: 0,
        createTime: 1515065866434,
        createUser: 'string',
        updateTime: 1515065866434,
        updateUser: 'test01',
        courtUuid: '2885576c0d044b00b3e1894c8c7a616'
      }
    ]
  }
})

/** 以下内容需要删除， 不属于更新升级模块 */
Mock.mock(contextPath + '/addUserGroupList', function () {
  console.log('mock addUserGroupList')
  return {
    pageCount: 0,
    userGroupList: [
      {
        name: '安保部小队长3',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      },
      {
        name: '安保部小队长4',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      },
      {
        name: '安保部小队长5',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      },
      {
        name: '安保部小队长6',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      }
    ]
  }
})

// 保存添加用户组数据
Mock.mock(contextPath + '/saveUserGroupList', function () {
  console.log('mock saveUserGroupList')
  return {
    userGroupList: [
      {
        name: '安保部小队长10',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }
    ]
  }
})

Mock.mock(contextPath + '/getTreeData', function () {
  console.log('mock getTreeData')
  return {
    name: '安保部小队长',
    superior: ['安保部员工', '公司高管', '设备维修'],
    treeData: [
      {
        id: 1,
        label: '物业全体员工',
        children: [
          {
            id: 4,
            label: '公司高管'
          },
          {
            id: 1,
            label: '设备维修'
          },
          {
            id: 2,
            label: '安保部员工',
            children: [
              {
                id: 5,
                label: '一期安保中队'
              },
              {
                id: 6,
                label: '二期安保中队'
              },
              {
                id: 7,
                label: '安保中队长'
              },
              {
                id: 8,
                label: '安保小队长'
              }
            ]
          }
        ]
      }
    ]
  }
})

Mock.mock(contextPath + '/getUserGroupDetail', function () {
  console.log('mock getUserGroupDetail')
  return {
    code: '0000001',
    type: ['type1', 'type2', 'type3'],
    desc: '用户组描述',
    userDetailList: [
      [
        {
          name: '安保部小队长9',
          superior: '安保部员工1',
          type: '物业员工1',
          subordinate: '下级用户组',
          directlyUnder: '胡斐'
        },
        {
          name: '安保部小队长1',
          superior: '安保部员工1',
          type: '物业员工1',
          subordinate: '下级用户组',
          directlyUnder: '苗人凤'
        }
      ],
      [
        {
          name: '张三',
          username: 'zhangsan',
          job: '安保部长',
          department: '安保部',
          phonenumber: '13333333333',
          id: '1238972937981237'
        },
        {
          name: '张三2',
          username: 'zhangsan2',
          job: '安保部长2',
          department: '安保部2',
          phonenumber: '13333333333',
          id: '1238972937981237'
        }
      ],
      [
        {
          role: '安保员',
          member: '安保部员工',
          desc: '我是安保员'
        },
        {
          role: '安保负责人',
          member: '安保小队长，安保部领导',
          desc: '我是安保负责人'
        }
      ]
    ]
  }
})

Mock.mock(contextPath + '/getDepartmentList', function () {
  console.log('mock getDepartmentList')
  return {
    pageCount: 0,
    departmentList: [
      {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        member: '胡斐',
        userType: 'userType1'
      },
      {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        member: '苗人凤',
        userType: 'userType1'
      }
    ]
  }
})

Mock.mock(contextPath + '/addDepartmentList', function () {
  console.log('mock addDepartmentList')
  return {
    pageCount: 0,
    departmentList: [
      {
        name: '安保部小队长3',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      },
      {
        name: '安保部小队长4',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      },
      {
        name: '安保部小队长5',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      },
      {
        name: '安保部小队长6',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      }
    ]
  }
})

// 保存添加用户组数据
Mock.mock(contextPath + '/saveDepartmentList', function () {
  console.log('mock saveDepartmentList')
  return {
    departmentList: [
      {
        name: '安保部小队长10',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }
    ]
  }
})

Mock.mock(contextPath + '/getDepartmentTreeData', function () {
  console.log('mock getDepartmentTreeData')
  return {
    name: '安保部',
    superior: ['安保部员工', '公司高管', '设备维修'],
    treeData: [
      {
        id: 1,
        label: '物业全体员工',
        children: [
          {
            id: 4,
            label: '公司高管'
          },
          {
            id: 1,
            label: '设备维修'
          },
          {
            id: 2,
            label: '安保部员工',
            children: [
              {
                id: 5,
                label: '一期安保中队'
              },
              {
                id: 6,
                label: '二期安保中队'
              },
              {
                id: 7,
                label: '安保中队长'
              },
              {
                id: 8,
                label: '安保小队长'
              }
            ]
          }
        ]
      }
    ]
  }
})

Mock.mock(contextPath + '/getDepartmentDetail', function () {
  console.log('mock getDepartmentDetail')
  return {
    code: '0000001',
    type: ['type1', 'type2', 'type3'],
    desc: '用户组描述',
    departmentDetailList: [
      [
        {
          name: '安保部小队长9',
          superior: '安保部员工1',
          type: '物业员工1',
          subordinate: '下级用户组',
          member: '胡斐',
          userType: 'userType1'
        },
        {
          name: '安保部小队长1',
          superior: '安保部员工1',
          type: '物业员工1',
          subordinate: '下级用户组',
          member: '苗人凤',
          userType: 'userType1'
        }
      ],
      [
        {
          name: '张三',
          username: 'zhangsan',
          job: '安保部长',
          department: '安保部',
          phoneNumber: '13333333333',
          id: '1238972937981237'
        },
        {
          name: '张三2',
          username: 'zhangsan2',
          job: '安保部长2',
          department: '安保部2',
          phoneNumber: '13333333333',
          id: '1238972937981237'
        }
      ]
    ]
  }
})
// 角色清单
Mock.mock(contextPath + '/usermgmt/role/list', function () {
  console.log('mock getRoleList')
  return {
    pageCount: 0,
    roleList: [
      {
        name: '安保员',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐',
        desc: '保安部员工'
      },
      {
        name: '安保负责人',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤',
        desc: '安保部门的各级负责人'
      }
    ]
  }
})
// 查询角色详情
Mock.mock(contextPath + '/usermgmt/role/detail', function () {
  console.log('mock getRoleDetail')
  return {
    name: '安保员',
    desc: '保安部员工',
    roleDetail: [
      [
        {
          name: '一期安保部小队长',
          superior: '安保部小队长',
          subordinate: '安保支队',
          directlyUnder: '胡斐'
        },
        {
          name: '二期安保部小队长',
          superior: '安保部小队长',
          subordinate: '安保支队',
          directlyUnder: '苗人凤'
        }
      ],
      [
        {
          name: '石青',
          userName: 'shiqing',
          position: '安保部长',
          department: '安保部',
          mobileNum: '15801580158',
          idenNum: '110109198710129988',
          directlyUnder: '胡斐'
        },
        {
          name: '贺斌',
          userName: 'hebin',
          position: '安保部长',
          department: '安保部',
          mobileNum: '15801580158',
          idenNum: '110109198710129988',
          directlyUnder: '胡斐'
        }
      ],
      [
        {
          category: '应用程序',
          name: '设备管理',
          location: '一期2栋',
          operationType: '访问',
          authorityType: '可叠加继承',
          permission: '是',
          logicalAddress: '192.168.2.15',
          URL: 'device.hdzc.com.cn'
        },
        {
          category: '设备组',
          name: '摄像头',
          location: '一期3栋',
          operationType: '完全控制',
          authorityType: '可叠加继承',
          permission: '是',
          logicalAddress: '192.168.5.30',
          URL: ''
        }
      ]
    ]
  }
})

// 添加角色关联用户组
Mock.mock(contextPath + '/usermgmt/role/addUserGroup', function () {
  console.log('mock addRoleUserGroup')
  return {
    pageCount: 0,
    roleUserGroupList: [
      {
        name: '一期安保部小队长',
        superior: '安保部小队长',
        subordinate: '',
        directlyUnder: '赵嘉敏'
      },
      {
        name: '二期安保部小队长',
        superior: '安保部小队长',
        subordinate: '',
        directlyUnder: '赵嘉敏'
      }
    ]
  }
})
// 保存添加角色关联用户组
Mock.mock(contextPath + '/usermgmt/role/saveUserGroup', function () {
  console.log('mock saveRoleUserGroup')
  return {
    pageCount: 0,
    roleUserGroupList: [
      {
        name: '一期安保部小队长',
        superior: '安保部小队长',
        subordinate: '',
        directlyUnder: '赵粤'
      }
    ]
  }
})

// 添加角色应用服务权限
Mock.mock(contextPath + '/usermgmt/role/addService', function () {
  console.log('mock addRoleService')
  return {
    pageCount: 0,
    roleServiceList: [
      {
        name: 'Timing Service',
        address: 'timing-prd.hd.com',
        status: 'normal'
      },
      {
        name: 'Camera Service',
        address: 'camera-qa.hd.com',
        status: 'normal'
      }
    ]
  }
})

// 保存角色应用服务权限
Mock.mock(contextPath + '/usermgmt/role/saveService', function () {
  console.log('mock saveRoleService')
  return {
    pageCount: 0,
    roleServiceList: [
      {
        name: 'Camera Service',
        address: 'camera-qa.hd.com',
        status: 'normal'
      },
      {
        name: 'Camera Service',
        address: 'camera-prd.hd.com',
        status: 'normal'
      }
    ]
  }
})

// 获取角色设备资源类别
Mock.mock(contextPath + '/usermgmt/role/addResourceCategory', function () {
  console.log('mock addRoleResourceCategory')
  return {
    pageCount: 0,
    roleResourceList: [
      {
        name: '设备组'
      },
      {
        name: '设备'
      }
    ]
  }
})

// 获取角色设备类型
Mock.mock(contextPath + '/usermgmt/role/addDeviceCategory', function () {
  console.log('mock addRoleDeviceCategory')
  return {
    pageCount: 0,
    roleDeviceList: [
      {
        name: '电梯'
      },
      {
        name: '摄像头'
      },
      {
        name: '报警器'
      },
      {
        name: '灭火器'
      }
    ]
  }
})

// 获取角色设备供应商
Mock.mock(contextPath + '/usermgmt/role/addVendor', function () {
  console.log('mock addRoleVendor')
  return {
    pageCount: 0,
    roleVendorList: [
      {
        name: 'IBM'
      },
      {
        name: '大华'
      },
      {
        name: '海康'
      },
      {
        name: '捷顺'
      },
      {
        name: '安居宝'
      },
      {
        name: '立林'
      }
    ]
  }
})

// 获取角色设备操作类型
Mock.mock(contextPath + '/usermgmt/role/addOperation', function () {
  console.log('mock addRoleOperation')
  return {
    pageCount: 0,
    roleOperationList: [
      {
        name: '访问'
      },
      {
        name: '完全控制'
      },
      {
        name: '查看状态'
      }
    ]
  }
})

// 获取角色设备权限类型
Mock.mock(contextPath + '/usermgmt/role/addAuthority', function () {
  console.log('mock addRoleAuthority')
  return {
    pageCount: 0,
    roleAuthorityList: [
      {
        name: '可叠加继承'
      },
      {
        name: '不可继承'
      }
    ]
  }
})

// 获取角色设备许可
Mock.mock(contextPath + '/usermgmt/role/addPermission', function () {
  console.log('mock addRolePermission')
  return {
    pageCount: 0,
    rolePermissionList: [
      {
        name: '是'
      },
      {
        name: '否'
      }
    ]
  }
})

// 获取角色设备组织树
Mock.mock(contextPath + '/usermgmt/role/addOrgTree', function () {
  console.log('mock addRoleOrgTree')
  return {
    pageCount: 0,
    roleOrgTree: [
      {
        label: '增城恒大山水城',
        children: [
          {
            label: '一期'
          },
          {
            label: '二期'
          },
          {
            label: '三期',
            children: [
              {
                label: '33栋',
                children: [
                  {
                    label: '1单元'
                  },
                  {
                    label: '2单元'
                  },
                  {
                    label: '3单元'
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

// 获取角色设备资源详情
Mock.mock(contextPath + '/usermgmt/role/getDeviceDetail', function () {
  console.log('mock getRoleDeviceDetail')
  return {
    pageCount: 0,
    roleDeviceDetail: [
      {
        type: '电梯',
        name: '1号电梯',
        vendor: '广州三菱电梯',
        location: '三期31栋1单元'
      },
      {
        type: '电梯',
        name: '2号电梯',
        vendor: '广州三菱电梯',
        location: '三期31栋1单元'
      }
    ]
  }
})

// 保存角色设备资源详情
Mock.mock(contextPath + '/usermgmt/role/saveDeviceDetail', function () {
  console.log('mock saveRoleDeviceDetail')
  return {
    pageCount: 0,
    roleDeviceDetail: [
      {
        type: '电梯',
        name: '1号电梯',
        vendor: '广州三菱电梯',
        location: '三期31栋1单元'
      },
      {
        type: '电梯',
        name: '2号电梯',
        vendor: '广州三菱电梯',
        location: '三期31栋1单元'
      }
    ]
  }
})

// 查询用户
Mock.mock(
  contextPath + '/usermgmt/user/list?currentPage=1&pageSize=10',
  function () {
    console.log('mock query user')
    return {
      pageCount: 2,
      baseUserVoList: [
        {
          uuid: 'uuid001',
          userName: 'admin001',
          password: '123456',
          fullName: '张三',
          departmentUuid: '1',
          position: '送水',
          userAccStatus: '1',
          idenNum: '430522198808276060',
          primaryPhone: '15813801922',
          primaryEmail: '11@qq.com',
          effectiveDate: '2017-12-22',
          expiryDate: '2018-12-22'
        },
        {
          uuid: 'uuid002',
          userName: 'admin002',
          password: '123456',
          fullName: '李四',
          departmentUuid: '2',
          position: '值夜班',
          userAccStatus: '2',
          idenNum: '430522198808276060',
          primaryPhone: '15813801922',
          primaryEmail: '11@qq.com',
          effectiveDate: '2017-12-22',
          expiryDate: '2018-12-22'
        }
      ]
    }
  }
)
// 添加用户
Mock.mock(contextPath + '/usermgmt/user/createUser', function () {
  console.log('mock create user')
  return {}
})
// 删除用户
Mock.mock(contextPath + '/usermgmt/user/deleteUser?uuid=uuid001', function () {
  console.log('mock delete user')
  return {}
})
// 修改用户
Mock.mock(contextPath + '/usermgmt/user/update', function () {
  console.log('mock update user')
  return {}
})
// 重置密码
Mock.mock(contextPath + '/usermgmt/user/resetPassword', function () {
  console.log('mock reset password')
  return {}
})
// 检查用户的唯一性
Mock.mock(
  contextPath + '/usermgmt/user/checkUserName?userName=admin004',
  function () {
    console.log('mock check userName')
    return {
      userNameFlag: false
    }
  }
)
// 获取部门信息
Mock.mock(
  contextPath + '/usermgmt/maindata/getDictData?dictType=DEPARTMENT',
  function () {
    console.log('mock get detpartment')
    return {
      departmentOptions: [
        {
          code: '1',
          label: '安保部'
        },
        {
          code: '2',
          label: '维修部'
        }
      ]
    }
  }
)
// 获取用户状态信息
Mock.mock(
  contextPath + '/usermgmt/maindata/getDictData?dictType=USER_ACC_STATUS',
  function () {
    console.log('mock get userStatus')
    return {
      userAccStatusOptions: [
        {
          code: '1',
          label: '正常'
        },
        {
          code: '2',
          label: '暂停使用'
        },
        {
          code: '3',
          label: '已删除'
        }
      ]
    }
  }
)
// 根据用户唯一标识UUID查询用户情报
Mock.mock(contextPath + '/usermgmt/user/get?uuid=uuid001', function () {
  console.log('mock get data')
  return {
    baseUser: {
      uuid: 'uuid001',
      userName: 'admin001',
      password: '123456',
      fullName: '张三',
      departmentUuid: '1',
      position: '送水',
      idenNum: '430522198808276060',
      effectiveDate: '2018-12-22',
      expiryDate: '2019-12-22',
      userAccStatus: '0',
      primaryPhone: '13882254210',
      primaryEmail: '12345@qq.com'
    },
    contactVoList: [
      {
        uuid: 'test001',
        userUuid: 'uuid001',
        contactType: '1',
        contactTypeName: '手机',
        userContact: '13882254210'
      },
      {
        uuid: 'test002',
        userUuid: 'uuid001',
        contactType: '2',
        contactTypeName: '电邮',
        userContact: '123422225@qq.com'
      }
    ]
  }
})
// 删除联系方式
Mock.mock(
  contextPath + '/usermgmt/user/deleteUserContact?uuid=test001',
  function () {
    console.log('mock delete contact')
    return {}
  }
)
// 添加联系方式
Mock.mock(contextPath + '/usermgmt/user/createUserContact', function () {
  console.log('mock add contact')
  return {}
})
// 获取用户联系方式下拉框信息
Mock.mock(
  contextPath + '/usermgmt/maindata/getDictData?dictType=CONTACT_TYPE',
  function () {
    console.log('mock get contactTypeOptions')
    return {
      contactTypeOptions: [
        {
          code: '1',
          label: '手机'
        },
        {
          code: '2',
          label: '电邮'
        },
        {
          code: '3',
          label: '办公电话'
        }
      ]
    }
  }
)
// // // // // // // // // // // 资源模块数据// // // // // // // // // //
// 查询资源
Mock.mock(
  contextPath + '/usermgmt/resource/list?currentPage=1&pageSize=10',
  function () {
    console.log('mock query resource')
    return {}
  }
)
// 添加资源
Mock.mock(contextPath + '/usermgmt/resource/create', function () {
  console.log('mock create resource')
  return {}
})
// 删除资源
Mock.mock(contextPath + '/usermgmt/resource/delete?uuid=uuid001', function () {
  console.log('mock delete resource')
  return {}
})
// 修改资源
Mock.mock(contextPath + '/usermgmt/resource/update', function () {
  console.log('mock update resource')
  return {}
})
// 获取资源类型下拉框信息
Mock.mock(
  contextPath + '/usermgmt/maindata/getDictData?dictType=RESOURCE_TYPE',
  function () {
    console.log('mock get resourceTypeOptions')
    return {
      resourceTypeOptions: [
        {
          code: '1',
          label: '程序'
        },
        {
          code: '2',
          label: '菜单'
        },
        {
          code: '3',
          label: '服务'
        },
        {
          code: '4',
          label: '设备组'
        },
        {
          code: '5',
          label: '设备'
        }
      ]
    }
  }
)
// 根据资源唯一标识UUID查询用户情报
Mock.mock(contextPath + '/usermgmt/resource/get?uuid=uuid001', function () {
  console.log('mock get data')
  return {}
})

// ======================数据库 =================
Mock.mock(contextPath + '/auServers/querydatabasePageData', function () {
  return {
    pageCount: 9,
    dbmsList: [
      {
        uuid: '84ea02b7828a434391f72ac97355d50f',
        serverId: 'e927d7c84a4d433f812804ff757fb967',
        softwareType: null,
        name: 'postgresql',
        version: '9.5+173ubuntu0.1',
        provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
        path: '/usr/lib/postgresql/9.5/bin/postgres',
        ip: '',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: null,
        remark: null,
        server: {
          uuid: 'e927d7c84a4d433f812804ff757fb967',
          aeestNo: null,
          biosVersion: '6.00',
          cabU: 'fdasfdafsdfsfs',
          cabinet: 'bbccccccc',
          courtUuid: null,
          cpuFreq: 2.4,
          cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          createTime: null,
          createUser: null,
          deleteFlag: null,
          deployment: 'bbb',
          hostname: 'GD-GZ-SHC-01-VM-ms-web-02',
          lhdSpaceFree: 374,
          lhdSpaceTotal: 389,
          location: null,
          mgmtIp: null,
          model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          name: 'VMware Virtual Platform',
          numberOfCore: 2,
          numberOfLhd: 5,
          numberOfPhd: 1,
          operator: null,
          phdSpaceFree: null,
          phdSpaceTotal: 400,
          ram: 1982,
          roles: null,
          serialNo: 'VMware-42 2b d9 1f e0 ab fa 3e-74 40 2f 59 45 7b 03 7d',
          serviceDuring: null,
          serviceLevel: null,
          status: null,
          updateTime: null,
          updateUser: null,
          vendor: 'VMware, Inc.',
          serviceProvider: null,
          functionName: null,
          remark: 'bb'
        },
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: 'c66e746f7c0a4b7c84848564ebf510f5',
        serverId: '53fde118d8544efdac39c9992a445989',
        softwareType: null,
        name: 'postgresql',
        version: '9.5+173ubuntu0.1',
        provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
        path: '/usr/lib/postgresql/9.5/bin/postgres',
        ip: '',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: null,
        remark: null,
        server: {
          uuid: '53fde118d8544efdac39c9992a445989',
          aeestNo: null,
          biosVersion: '6.00',
          cabU: null,
          cabinet: '恒大山水城',
          courtUuid: null,
          cpuFreq: 2.4,
          cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          createTime: null,
          createUser: null,
          deleteFlag: null,
          deployment: null,
          hostname: 'GD-GZ-SHC-01-VM-ms-web-01',
          lhdSpaceFree: 381,
          lhdSpaceTotal: 389,
          location: null,
          mgmtIp: null,
          model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          name: 'VMware Virtual Platform',
          numberOfCore: 2,
          numberOfLhd: 4,
          numberOfPhd: 1,
          operator: null,
          phdSpaceFree: null,
          phdSpaceTotal: 400,
          ram: 1982,
          roles: null,
          serialNo: 'VMware-42 2b af fe dd 0b cc ab-08 a3 b1 0d 5a 58 bf 8b',
          serviceDuring: null,
          serviceLevel: null,
          status: null,
          updateTime: null,
          updateUser: null,
          vendor: 'VMware, Inc.',
          serviceProvider: null,
          functionName: null,
          remark: '测试数据sssll'
        },
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: '345d7cfa6eb748f8b7839cebc614c8bd',
        serverId: 'd9d5df63526f468ab50512f86538b422',
        softwareType: null,
        name: 'postgresql',
        version: '9.5+173ubuntu0.1',
        provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
        path: '/usr/lib/postgresql/9.5/bin/postgres',
        ip: '',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: 'c69aeede4f6341929721e2832beec3c',
        remark: null,
        server: {
          uuid: 'd9d5df63526f468ab50512f86538b422',
          aeestNo: null,
          biosVersion: '6.00',
          cabU: null,
          cabinet: null,
          courtUuid: null,
          cpuFreq: 2.4,
          cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          createTime: null,
          createUser: null,
          deleteFlag: null,
          deployment: null,
          hostname: 'GD-GZ-SHC-01-VM-ms-web-03',
          lhdSpaceFree: 375,
          lhdSpaceTotal: 389,
          location: null,
          mgmtIp: null,
          model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          name: 'VMware Virtual Platform',
          numberOfCore: 2,
          numberOfLhd: 4,
          numberOfPhd: 1,
          operator: null,
          phdSpaceFree: null,
          phdSpaceTotal: 400,
          ram: 1982,
          roles: null,
          serialNo: 'VMware-42 2b a0 4f ba a1 42 23-1d 9c 98 55 49 1b d7 12',
          serviceDuring: null,
          serviceLevel: null,
          status: null,
          updateTime: null,
          updateUser: null,
          vendor: 'VMware, Inc.',
          serviceProvider: null,
          functionName: null,
          remark: null
        },
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: '3e5796a5e2da4335a616179cdd38e7c3',
        serverId: 'd9d5df63526f468ab50512f86538b422',
        softwareType: null,
        name: 'postgresql',
        version: '9.5+173ubuntu0.1',
        provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
        path: '/usr/lib/postgresql/9.5/bin/postgres',
        ip: '',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: 'c69aeede4f6341929721e2832beec3c',
        remark: null,
        server: {
          uuid: 'd9d5df63526f468ab50512f86538b422',
          aeestNo: null,
          biosVersion: '6.00',
          cabU: null,
          cabinet: null,
          courtUuid: null,
          cpuFreq: 2.4,
          cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          createTime: null,
          createUser: null,
          deleteFlag: null,
          deployment: null,
          hostname: 'GD-GZ-SHC-01-VM-ms-web-03',
          lhdSpaceFree: 375,
          lhdSpaceTotal: 389,
          location: null,
          mgmtIp: null,
          model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          name: 'VMware Virtual Platform',
          numberOfCore: 2,
          numberOfLhd: 4,
          numberOfPhd: 1,
          operator: null,
          phdSpaceFree: null,
          phdSpaceTotal: 400,
          ram: 1982,
          roles: null,
          serialNo: 'VMware-42 2b a0 4f ba a1 42 23-1d 9c 98 55 49 1b d7 12',
          serviceDuring: null,
          serviceLevel: null,
          status: null,
          updateTime: null,
          updateUser: null,
          vendor: 'VMware, Inc.',
          serviceProvider: null,
          functionName: null,
          remark: null
        },
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: 'e861e233155d43059116396003065bc1',
        serverId: 'd9d5df63526f468ab50512f86538b422',
        softwareType: null,
        name: 'postgresql',
        version: '9.5+173ubuntu0.1',
        provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
        path: '/usr/lib/postgresql/9.5/bin/postgres',
        ip: '',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: 'c69aeede4f6341929721e2832beec3c',
        remark: null,
        server: {
          uuid: 'd9d5df63526f468ab50512f86538b422',
          aeestNo: null,
          biosVersion: '6.00',
          cabU: null,
          cabinet: null,
          courtUuid: null,
          cpuFreq: 2.4,
          cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          createTime: null,
          createUser: null,
          deleteFlag: null,
          deployment: null,
          hostname: 'GD-GZ-SHC-01-VM-ms-web-03',
          lhdSpaceFree: 375,
          lhdSpaceTotal: 389,
          location: null,
          mgmtIp: null,
          model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          name: 'VMware Virtual Platform',
          numberOfCore: 2,
          numberOfLhd: 4,
          numberOfPhd: 1,
          operator: null,
          phdSpaceFree: null,
          phdSpaceTotal: 400,
          ram: 1982,
          roles: null,
          serialNo: 'VMware-42 2b a0 4f ba a1 42 23-1d 9c 98 55 49 1b d7 12',
          serviceDuring: null,
          serviceLevel: null,
          status: null,
          updateTime: null,
          updateUser: null,
          vendor: 'VMware, Inc.',
          serviceProvider: null,
          functionName: null,
          remark: null
        },
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: 'cfa0d771172a480c9eb3eb8f72e937bf',
        serverId: 'd9d5df63526f468ab50512f86538b422',
        softwareType: null,
        name: 'postgresql',
        version: '9.5+173ubuntu0.1',
        provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
        path: '/usr/lib/postgresql/9.5/bin/postgres',
        ip: '',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: 'c69aeede4f6341929721e2832beec3c',
        remark: null,
        server: {
          uuid: 'd9d5df63526f468ab50512f86538b422',
          aeestNo: null,
          biosVersion: '6.00',
          cabU: null,
          cabinet: null,
          courtUuid: null,
          cpuFreq: 2.4,
          cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          createTime: null,
          createUser: null,
          deleteFlag: null,
          deployment: null,
          hostname: 'GD-GZ-SHC-01-VM-ms-web-03',
          lhdSpaceFree: 375,
          lhdSpaceTotal: 389,
          location: null,
          mgmtIp: null,
          model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          name: 'VMware Virtual Platform',
          numberOfCore: 2,
          numberOfLhd: 4,
          numberOfPhd: 1,
          operator: null,
          phdSpaceFree: null,
          phdSpaceTotal: 400,
          ram: 1982,
          roles: null,
          serialNo: 'VMware-42 2b a0 4f ba a1 42 23-1d 9c 98 55 49 1b d7 12',
          serviceDuring: null,
          serviceLevel: null,
          status: null,
          updateTime: null,
          updateUser: null,
          vendor: 'VMware, Inc.',
          serviceProvider: null,
          functionName: null,
          remark: null
        },
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: 'd202e7cb5b3b453babc01572d5c5eaa3',
        serverId: 'd9d5df63526f468ab50512f86538b422',
        softwareType: null,
        name: 'postgresql',
        version: '9.5+173ubuntu0.1',
        provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
        path: '/usr/lib/postgresql/9.5/bin/postgres',
        ip: '',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: 'c69aeede4f6341929721e2832beec3c',
        remark: null,
        server: {
          uuid: 'd9d5df63526f468ab50512f86538b422',
          aeestNo: null,
          biosVersion: '6.00',
          cabU: null,
          cabinet: null,
          courtUuid: null,
          cpuFreq: 2.4,
          cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          createTime: null,
          createUser: null,
          deleteFlag: null,
          deployment: null,
          hostname: 'GD-GZ-SHC-01-VM-ms-web-03',
          lhdSpaceFree: 375,
          lhdSpaceTotal: 389,
          location: null,
          mgmtIp: null,
          model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          name: 'VMware Virtual Platform',
          numberOfCore: 2,
          numberOfLhd: 4,
          numberOfPhd: 1,
          operator: null,
          phdSpaceFree: null,
          phdSpaceTotal: 400,
          ram: 1982,
          roles: null,
          serialNo: 'VMware-42 2b a0 4f ba a1 42 23-1d 9c 98 55 49 1b d7 12',
          serviceDuring: null,
          serviceLevel: null,
          status: null,
          updateTime: null,
          updateUser: null,
          vendor: 'VMware, Inc.',
          serviceProvider: null,
          functionName: null,
          remark: null
        },
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: '41fedf1fc4df4a08ac24e0453793875e',
        serverId: 'd9d5df63526f468ab50512f86538b422',
        softwareType: null,
        name: 'postgresql',
        version: '9.5+173ubuntu0.1',
        provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
        path: '/usr/lib/postgresql/9.5/bin/postgres',
        ip: '',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: 'c69aeede4f6341929721e2832beec3c',
        remark: null,
        server: {
          uuid: 'd9d5df63526f468ab50512f86538b422',
          aeestNo: null,
          biosVersion: '6.00',
          cabU: null,
          cabinet: null,
          courtUuid: null,
          cpuFreq: 2.4,
          cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          createTime: null,
          createUser: null,
          deleteFlag: null,
          deployment: null,
          hostname: 'GD-GZ-SHC-01-VM-ms-web-03',
          lhdSpaceFree: 375,
          lhdSpaceTotal: 389,
          location: null,
          mgmtIp: null,
          model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          name: 'VMware Virtual Platform',
          numberOfCore: 2,
          numberOfLhd: 4,
          numberOfPhd: 1,
          operator: null,
          phdSpaceFree: null,
          phdSpaceTotal: 400,
          ram: 1982,
          roles: null,
          serialNo: 'VMware-42 2b a0 4f ba a1 42 23-1d 9c 98 55 49 1b d7 12',
          serviceDuring: null,
          serviceLevel: null,
          status: null,
          updateTime: null,
          updateUser: null,
          vendor: 'VMware, Inc.',
          serviceProvider: null,
          functionName: null,
          remark: null
        },
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: '81fb526677a44fae919bc352e7514eb3',
        serverId: '30239760029f4ab7bcadeeddeaec2b8a',
        softwareType: null,
        name: 'postgresql',
        version: '9.5+173ubuntu0.1',
        provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
        path: '/usr/lib/postgresql/9.5/bin/postgres',
        ip: '',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: null,
        remark: null,
        server: null,
        courtDto: null,
        changedDataDto: null
      }
    ]
  }
})

Mock.mock(contextPath + '/databasequery/get/id', function () {
  return {
    auDbms: {
      uuid: '84ea02b7828a434391f72ac97355d50f',
      serverId: 'e927d7c84a4d433f812804ff757fb967',
      softwareType: null,
      name: 'postgresql',
      version: '9.5+173ubuntu0.1',
      provider: 'Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>',
      path: '/usr/lib/postgresql/9.5/bin/postgres',
      ip: '',
      attr1: null,
      attr2: null,
      attr3: null,
      attr4: null,
      attr5: null,
      deleteFlag: null,
      createTime: null,
      createUser: null,
      updateTime: null,
      updateUser: null,
      courtUuid: null,
      remark: null,
      server: {
        uuid: 'e927d7c84a4d433f812804ff757fb967',
        aeestNo: null,
        biosVersion: '6.00',
        cabU: 'fdasfdafsdfsfs',
        cabinet: 'bbccccccc',
        courtUuid: null,
        cpuFreq: 2.4,
        cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        createTime: null,
        createUser: null,
        deleteFlag: null,
        deployment: 'bbb',
        hostname: 'GD-GZ-SHC-01-VM-ms-web-02',
        lhdSpaceFree: 374,
        lhdSpaceTotal: 389,
        location: null,
        mgmtIp: null,
        model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        name: 'VMware Virtual Platform',
        numberOfCore: 2,
        numberOfLhd: 5,
        numberOfPhd: 1,
        operator: null,
        phdSpaceFree: null,
        phdSpaceTotal: 400,
        ram: 1982,
        roles: null,
        serialNo: 'VMware-42 2b d9 1f e0 ab fa 3e-74 40 2f 59 45 7b 03 7d',
        serviceDuring: null,
        serviceLevel: null,
        status: null,
        updateTime: null,
        updateUser: null,
        vendor: 'VMware, Inc.',
        serviceProvider: null,
        functionName: null,
        remark: 'bb'
      },
      courtDto: {
        uuid: '015d138cdfe3499d8d97b43ec9395401',
        name: '万和世家',
        nameAbbr: 'whsj',
        province: '广东省',
        provinceAbbr: 'gd',
        city: '肇庆市',
        cityAbbr: 'zq',
        district: '德庆县',
        districtAbbr: 'dqx',
        area: '07',
        address: '肇庆市德庆县万和世家小区07单元',
        memo: '肇庆市德庆县万和世家小区07单元',
        publicIp1: '192.168.47.201',
        publicIp2: '192.168.10.235,172.16.16.176,10.10.57.229,172.16.66.84',
        publicPort1: '10711',
        publicPort2: '15228,4154,3814,2158',
        platformFlag: null,
        deleteFlag: 0,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null
      },
      changedDataDto: null
    },
    auDbmsList: null,
    auDbmsHisList: null
  }
})
Mock.mock(contextPath + '/auMiddleware/queryPageData', function () {
  return {
    pageCount: 1,
    middlewareList: [
      {
        uuid: 'b6287b22e2b04121b7ed98e3b0d71bfb',
        serverId: '53fde118d8544efdac39c9992a445989',
        softwareType: null,
        name: 'MQ 中间件',
        version: 'version 2.0',
        provider: '',
        path: '\\usr\\middleware\\mq',
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        attr5: null,
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: null,
        remark: '测试数据',
        server: {
          uuid: '53fde118d8544efdac39c9992a445989',
          aeestNo: null,
          biosVersion: '6.00',
          cabU: null,
          cabinet: '恒大山水城',
          courtUuid: null,
          cpuFreq: 2.4,
          cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          createTime: null,
          createUser: null,
          deleteFlag: null,
          deployment: null,
          hostname: 'GD-GZ-SHC-01-VM-ms-web-01',
          lhdSpaceFree: 381,
          lhdSpaceTotal: 389,
          location: null,
          mgmtIp: null,
          model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
          name: 'VMware Virtual Platform',
          numberOfCore: 2,
          numberOfLhd: 4,
          numberOfPhd: 1,
          operator: null,
          phdSpaceFree: null,
          phdSpaceTotal: 400,
          ram: 1982,
          roles: null,
          serialNo: 'VMware-42 2b af fe dd 0b cc ab-08 a3 b1 0d 5a 58 bf 8b',
          serviceDuring: null,
          serviceLevel: null,
          status: null,
          updateTime: null,
          updateUser: null,
          vendor: 'VMware, Inc.',
          serviceProvider: null,
          functionName: null,
          remark: '测试数据sssll'
        },
        courtDto: {
          uuid: 'c69aeede4f6341929721e2832beec3c',
          name: '恒大山水城',
          nameAbbr: 'shc',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '广州市',
          cityAbbr: 'gz',
          district: '增城区',
          districtAbbr: 'zc',
          area: '01',
          address: '广东省广州市增城中新镇恒大山水城',
          memo: '恒大山水城',
          publicIp1: '192.168.0.242',
          publicIp2: '',
          publicPort1: '30940',
          publicPort2: '',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      }
    ]
  }
})
Mock.mock(contextPath + '/auMiddlewaredetails/get/id', function () {
  return {
    auMiddleware: {
      uuid: 'b6287b22e2b04121b7ed98e3b0d71bfb',
      serverId: '53fde118d8544efdac39c9992a445989',
      softwareType: null,
      name: '',
      version: '',
      provider: '',
      path: '',
      attr1: null,
      attr2: null,
      attr3: null,
      attr4: null,
      attr5: null,
      deleteFlag: null,
      createTime: null,
      createUser: null,
      updateTime: null,
      updateUser: null,
      courtUuid: null,
      remark: null,
      server: {
        uuid: '53fde118d8544efdac39c9992a445989',
        aeestNo: null,
        biosVersion: '6.00',
        cabU: null,
        cabinet: '恒大山水城',
        courtUuid: null,
        cpuFreq: 2.4,
        cpuModel: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        createTime: null,
        createUser: null,
        deleteFlag: null,
        deployment: null,
        hostname: 'GD-GZ-SHC-01-VM-ms-web-01',
        lhdSpaceFree: 381,
        lhdSpaceTotal: 389,
        location: null,
        mgmtIp: null,
        model: 'Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz',
        name: 'VMware Virtual Platform',
        numberOfCore: 2,
        numberOfLhd: 4,
        numberOfPhd: 1,
        operator: null,
        phdSpaceFree: null,
        phdSpaceTotal: 400,
        ram: 1982,
        roles: null,
        serialNo: 'VMware-42 2b af fe dd 0b cc ab-08 a3 b1 0d 5a 58 bf 8b',
        serviceDuring: null,
        serviceLevel: null,
        status: null,
        updateTime: null,
        updateUser: null,
        vendor: 'VMware, Inc.',
        serviceProvider: null,
        functionName: null,
        remark: '测试数据sssll'
      },
      courtDto: {
        uuid: '015d138cdfe3499d8d97b43ec9395401',
        name: '万和世家',
        nameAbbr: 'whsj',
        province: '广东省',
        provinceAbbr: 'gd',
        city: '肇庆市',
        cityAbbr: 'zq',
        district: '德庆县',
        districtAbbr: 'dqx',
        area: '07',
        address: '肇庆市德庆县万和世家小区07单元',
        memo: '肇庆市德庆县万和世家小区07单元',
        publicIp1: '192.168.47.201',
        publicIp2: '192.168.10.235,172.16.16.176,10.10.57.229,172.16.66.84',
        publicPort1: '10711',
        publicPort2: '15228,4154,3814,2158',
        platformFlag: null,
        deleteFlag: 0,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null
      },
      changedDataDto: null
    },
    auMiddlewareList: null,
    auMiddlewareHisList: null
  }
})

Mock.mock(contextPath + '/auNetEquip/queryPageData', function () {
  return {
    pageCount: 2,
    netequipList: [
      {
        uuid: 'f6896eb8e8d941c59412e21b6213f14d',
        serialNo: 'NE=34603047',
        name: 'GD-ZC-SSC-01-HUAWEI-SW-S5700-L-01',
        type: 'SW',
        aeestNo: null,
        vendor: '',
        mgmtIp: '192.168.201.1',
        mgmtPort: null,
        internetIp: null,
        internetPort: null,
        backendIp: null,
        isCore: null,
        operator: null,
        status: '运行正常',
        serviceLevel: null,
        serviceDuring: null,
        cpuModel: null,
        numberOfCore: null,
        osVersion: 'VRP5.16 V200R008C00SPC500',
        ram: null,
        rom: null,
        deployment: null,
        cabinet: null,
        cabU: null,
        remark: '测试数据',
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: null,
        serviceProvider: null,
        courtDto: {
          uuid: '015d138cdfe3499d8d97b43ec9395401',
          name: '万和世家',
          nameAbbr: 'whsj',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '肇庆市',
          cityAbbr: 'zq',
          district: '德庆县',
          districtAbbr: 'dqx',
          area: '07',
          address: '肇庆市德庆县万和世家小区07单元',
          memo: '肇庆市德庆县万和世家小区07单元',
          publicIp1: '192.168.47.201',
          publicIp2: '192.168.10.235,172.16.16.176,10.10.57.229,172.16.66.84',
          publicPort1: '10711',
          publicPort2: '15228,4154,3814,2158',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      },
      {
        uuid: 'f8fc0937d73d472391fb30608dbcf325',
        serialNo: 'NE=34603009',
        name: 'GD-ZC-SSC-01-HUAWEI-SW-S5130-L-01',
        type: 'SW',
        aeestNo: null,
        vendor: '',
        mgmtIp: '192.168.200.1',
        mgmtPort: null,
        internetIp: null,
        internetPort: null,
        backendIp: null,
        isCore: null,
        operator: null,
        status: '运行正常',
        serviceLevel: null,
        serviceDuring: null,
        cpuModel: null,
        numberOfCore: null,
        osVersion: 'VRP7.1.045 3116',
        ram: null,
        rom: null,
        deployment: null,
        cabinet: null,
        cabU: null,
        remark: '测试数据',
        deleteFlag: null,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null,
        courtUuid: null,
        serviceProvider: null,
        courtDto: {
          uuid: '015d138cdfe3499d8d97b43ec9395401',
          name: '万和世家',
          nameAbbr: 'whsj',
          province: '广东省',
          provinceAbbr: 'gd',
          city: '肇庆市',
          cityAbbr: 'zq',
          district: '德庆县',
          districtAbbr: 'dqx',
          area: '07',
          address: '肇庆市德庆县万和世家小区07单元',
          memo: '肇庆市德庆县万和世家小区07单元',
          publicIp1: '192.168.47.201',
          publicIp2: '192.168.10.235,172.16.16.176,10.10.57.229,172.16.66.84',
          publicPort1: '10711',
          publicPort2: '15228,4154,3814,2158',
          platformFlag: null,
          deleteFlag: 0,
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null
        },
        changedDataDto: null
      }
    ]
  }
})

Mock.mock(contextPath + '/auNetEquip/get/id', function () {
  return {
    auNetequip: {
      uuid: 'f6896eb8e8d941c59412e21b6213f14d',
      serialNo: 'NE=34603047',
      name: 'GD-ZC-SSC-01-HUAWEI-SW-S5700-L-01',
      type: 'SW',
      aeestNo: null,
      vendor: '',
      mgmtIp: '192.168.201.1',
      mgmtPort: null,
      internetIp: null,
      internetPort: null,
      backendIp: null,
      isCore: null,
      operator: null,
      status: null,
      serviceLevel: null,
      serviceDuring: null,
      cpuModel: null,
      numberOfCore: null,
      osVersion: 'VRP5.16 V200R008C00SPC500',
      ram: null,
      rom: null,
      deployment: null,
      cabinet: null,
      cabU: null,
      remark: null,
      deleteFlag: null,
      createTime: null,
      createUser: null,
      updateTime: null,
      updateUser: null,
      courtUuid: null,
      serviceProvider: null,
      courtDto: {
        uuid: '015d138cdfe3499d8d97b43ec9395401',
        name: '万和世家',
        nameAbbr: 'whsj',
        province: '广东省',
        provinceAbbr: 'gd',
        city: '肇庆市',
        cityAbbr: 'zq',
        district: '德庆县',
        districtAbbr: 'dqx',
        area: '07',
        address: '肇庆市德庆县万和世家小区07单元',
        memo: '肇庆市德庆县万和世家小区07单元',
        publicIp1: '192.168.47.201',
        publicIp2: '192.168.10.235,172.16.16.176,10.10.57.229,172.16.66.84',
        publicPort1: '10711',
        publicPort2: '15228,4154,3814,2158',
        platformFlag: null,
        deleteFlag: 0,
        createTime: null,
        createUser: null,
        updateTime: null,
        updateUser: null
      },
      changedDataDto: null
    },
    auNetequipList: null,
    auNetequipHisList: null
  }
})
