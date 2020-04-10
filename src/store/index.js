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
    'replayCurrent': false,
    'shuffledList': false,
    'playSpeed': 1,
    'currentNavPath': '',
  },
  getters: {
    navPath: state => {
      if (state.currentNavPath === '') {
        return []
      }

      let cur = ''
      return state.currentNavPath.split('/').map(item => {
        return {
          path: cur += cur ? '/' + item : item,
          name: item,
        }
      })
    }
  },
  mutations: {
    setupPlayer(state, player) {
      player.on('ended', () => {
        if (state.replayCurrent) {
          if (player.playlist.autoadvance_.delay === null) {
            player.play()
          }
        }
      })
      player.on('loadedmetadata', () => {
        if (player.videoHeight() > player.videoWidth()) {
          let width = player.currentWidth()
          player.fluid(false)
          player.width(width)
          player.height(width*.75)
        } else {
          player.fluid(true)
        }
        if(player.currentType().indexOf('audio') === 0) {
          player.poster('/images/poster-audio.jpg')
        }
      })
      state.player = player
    },
    setReplayCurrent(state, v) {
      state.replayCurrent = v
      state.player.playlist.autoadvance(v ? null : 0)
    },
    shufflePlaylist(state, v) {
      state.shuffledList = v
      if (v) {
        state.player.playlist.shuffle()
      } else {
        let index = state.playlist.findIndex(i => i.src === state.player.src())
        state.player.playlist(state.playlist.map(item => {
          return {
            sources : [item]
          }
        }), index > -1 ? index : 0)
      }
    },
    updatePlaylist(state, {data, index}) {
      state.playlist = data
      state.player.playlist(data.map(item => {
        return {
          sources : [item]
        }
      }), index)
      if (state.shuffledList) {
        state.player.playlist.shuffle()
      }
    },
    updateNavIndex(state, {dirs, files, path}) {
      state.currentNavPath = path.replace(/^\/+/, '')
      state.directoryList = dirs
      state.fileList = files
    },
    updatePlaySpeed(state, v) {
      state.playSpeed = v
      state.player.playbackRate(v)
    }
  },
  actions: {
    loadPlaylistFromIndex({ commit }, path) {
      common.index(path).then(r => {
        commit('updatePlaylist', r.data.files)
      })
    },
    loadIndex({ commit }, path) {
      common.index(path).then(r => {
        commit('updateNavIndex', {
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
