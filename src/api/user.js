import request from '@/request'
import store from '@/store/index'

export default {
  info() {
    return request.get('/api/user')
  },
  login(email, password) {
    return request.post('/auth/login', {
      email,
      password
    })
      .then(r => {
        if (r.data.access_token) {
          sessionStorage.setItem('token', r.data.access_token)
          store.commit('setLoggedIn', true)
          return Promise.resolve(r)
        } else {
          sessionStorage.setItem('token', '')
          return Promise.reject('failed')
        }
      })
      .catch(() => {
        sessionStorage.setItem('token', '')
      })
  },
  logout(){
    return request.post('/auth/logout')
      .then(r => {
        store.commit('setLoggedIn', false)
        return Promise.resolve(r)
      })
  },
  refresh() {
    return request.post('/auth/refresh')
      .then(r => {
        if (r.data.access_token) {
          sessionStorage.setItem('token', r.data.access_token)
          return Promise.resolve(r)
        } else {
          sessionStorage.setItem('token', '')
          return Promise.reject('failed')
        }
      })
      .catch(() => {
        sessionStorage.setItem('token', '')
      })
  },
}