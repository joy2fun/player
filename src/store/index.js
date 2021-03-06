import Vue from 'vue'
import Vuex from 'vuex'
import index from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    'loggedIn': false,
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
    setLoggedIn(state, v) {
      state.loggedIn = v
      if (! v) {
        localStorage.setItem('token', '')
      }
    },
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
        if(player.currentType().indexOf('audio') === 0
          && player.src().indexOf('5s-silence.mp3') === -1
        ) {
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
      state.playlist = data.map(item => {
        const token = localStorage.getItem('token')
        if (token && item.src.indexOf('?token=') === -1) {
          item.src += '?token=' + token
        }
        return item
      })
      let imageCount = 0
      console.log(data)
      state.player.playlist(data.map(item => {
        if (item.type.indexOf('image') !== -1) {
          const poster = item.poster
          item.src = '/audio/5s-silence.mp3?i=' + imageCount ++
          item.type = 'audio/mpeg'
          return {
            sources : [item],
            poster
          }
        } else {
          return {
            sources : [item],
            poster: item.poster
          }
        }
      }), index)
      if (state.shuffledList) {
        state.player.playlist.shuffle()
      }
    },
    updateNavIndex(state, {dirs, files, path}) {
      state.currentNavPath = path
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
      index.list(path).then(r => {
        commit('updatePlaylist', r.files)
      })
    },
    loadIndex({ commit }, path) {
      path = path.replace(/^[/]+/, '')
      index.list(path).then(r => {
        console.log(path)
        commit('updateNavIndex', {
          dirs: r.dirs,
          files: r.files,
          path,
        })
      })
    }
  },
  modules: {
  }
})
