// directory auto index

import request from '@/request'
import * as mimetypes from '@/utils/mimetypes'

export default {
  list(path) {
    const trailingSlash = process.env.VUE_APP_INDEX_API_TRAILING_SLASH === 'true' ? '/' : ''
    let prefix = ''
    if (process.env.VUE_APP_INDEX_API_PREFIX) {
      prefix = process.env.VUE_APP_INDEX_API_PREFIX
    } else {
      prefix = process.env.VUE_APP_API_PREFIX + '/api/index'
    }
    if (path) {
      prefix += '/'
    }
    return request.get(path + trailingSlash, {
      baseURL: prefix
    })
      .then(r => {
        let dirs = r.data.filter(item => item.type === 'directory')
          .map(item => {
            return {
              name: item.name,
              path: item.path || (path ? path + '/' + item.name : item.name),
              link: item.link || (prefix + path + '/' + item.name + trailingSlash),
            }
          })
        let files = r.data.filter(item => item.type === 'file')
          .map(item => {
            return {
              name: item.name,
              src: item.src || (prefix + path + '/' + item.name),
              type: mimetypes.getMimetype(item.name),
            }
          })
          .filter(item => item.type != '') // filter out non-media files
        return Promise.resolve({
          dirs,
          files,
        })
      })
  }
}
