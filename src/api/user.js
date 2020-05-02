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
          localStorage.setItem('token', r.data.access_token)
          localStorage.setItem('expires_at', (new Date().getTime() + r.data.expires_in * 1000))
          store.commit('setLoggedIn', true)
          return Promise.resolve(r)
        } else {
          localStorage.setItem('token', '')
          return Promise.reject('failed')
        }
      })
      .catch(e => {
        localStorage.setItem('token', '')
        return Promise.reject(e)
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
          localStorage.setItem('token', r.data.access_token)
          localStorage.setItem('expires_at', (new Date().getTime() + r.data.expires_in * 1000))
          return Promise.resolve(r)
        } else {
          localStorage.setItem('token', '')
          return Promise.reject('failed')
        }
      })
      .catch(() => {
        localStorage.setItem('token', '')
      })
  },
  getTokenTTL() {
    const expireAt = (localStorage.getItem('expires_at').substr(0, 10)) >> 0
    return expireAt - ((new Date).getTime().toString().substr(0, 10) >> 0)
  },
}