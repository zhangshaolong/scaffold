import CarList from 'pages/car/list'
import CarDetail from 'pages/car/detail'
import NotFound from 'pages/404'


export default {
  '/a/b': CarList,
  '/a/c': CarDetail,
  '/': CarList,
  '404': NotFound
}