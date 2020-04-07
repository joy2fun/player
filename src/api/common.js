import request from '@/request'

export default {
  all() {
    return request.get('/')
  },
  index(path) {
    return request.get(path ? '/api/index/' + path : '/api/index')
  }
}