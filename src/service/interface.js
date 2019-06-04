import axios from './api'

/* 将所有的接口统一起来便于维护 */
const seller = () => {
  return axios({
    url: '/seller',
    method: 'get'
  })
}

const goods = () => {
  return axios({
    url: '/goods'
  })
}

const ratings = () => {
  return axios({
    url: '/ratings'
  })
}

export default {
  seller,
  goods,
  ratings
}
