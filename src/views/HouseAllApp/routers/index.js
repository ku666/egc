import index from '@/views/HouseAllApp/index'
import HouseInfo from '@/views/HouseAllApp/HouseInfo'

// 定义路由路径数组列表
export default [{
  path: '/houseallapp/index',
  name: 'houseallapp',
  component: index
}, {
  path: '/houseallapp/houseinfo/:name',
  name: 'houseinfo',
  component: HouseInfo
}]
