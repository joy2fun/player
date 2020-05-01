
import * as mimetypes from '@/utils/mimetypes'

export default {
  autoIndexJsonToPlaylist(list) {
    return list.map(item => {
      if (item.type === 'directory') {
      } else {
        item.type = mimetypes.getMimetype(item.name)
      }
    })
  },
}