import Vue from 'vue'
import Vuex from 'vuex'
import common from '@/api/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    'player': null,
    'playlist' : [],
    'directoryList' : [],
    'fileList': [],
    'currentPath': '',
  },
  getters: {
    navPath: state => {
      if (state.currentPath === '') {
        return []
      }

      let cur = ''
      return state.currentPath.split('/').map(item => {
        return {
          path: cur += cur ? '/' + item : item,
          name: item,
        }
      })
    }
  },
  mutations: {
    setupPlayer(state, p) {
      state.player = p
    },
    updatePlaylist(state, data) {
      state.playlist = data
      state.player.playlist(data.map(item => {
        return {
          sources : [item]
        }
      }))
    },
    updateIndex(state, {dirs, files, path}) {
      state.currentPath = path.replace(/^\/+/, '')
      state.directoryList = dirs
      state.fileList = files
    },
  },
  actions: {
    loadPlaylistFromIndex({ commit }, path) {
      common.index(path).then(r => {
        commit('updatePlaylist', r.data.files)
      })
    },
    loadIndex({ commit }, path) {
      common.index(path).then(r => {
        commit('updateIndex', {
          dirs: r.data.lists,
          files: r.data.files,
          path
        })
      })
    }
  },
  modules: {
  }
})
