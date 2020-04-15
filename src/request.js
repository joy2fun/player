import axios from 'axios'
import store from '@/store/index'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_PREFIX,
  timeout: 5000,
  headers: {},
});

instance.interceptors.request.use(config => {
  let token = sessionStorage.getItem('token')
  if (token) {
    config['headers']['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => response,  error => {
  if (error.response.status === 401) {
    store.commit('setLoggedIn', false)
  }
  return Promise.reject(error);
});

export default instance