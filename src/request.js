import axios from 'axios'
import { Message } from 'element-ui';
import store from '@/store/index'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_PREFIX,
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config['headers']['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => response,  error => {
  if (error.response && error.response.status === 401) {
    store.commit('setLoggedIn', false)
    Message.error('Unauthenticated')
  }
  return Promise.reject(error);
});

export default instance