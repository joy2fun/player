<template>
  <div id="files" class="files">
    <el-button class="item"
      :class="{
        'current': player.src().indexOf('5s-silence.mp3') === -1
          ? player.src() === item.src
          : player.poster().indexOf(item.name) !== -1,
      }"
      @click="playListFromIndex(index, item.src)"
      v-for="(item, index) in fileList"
      :key="index"
      type="text"
      size="small"
      plain>{{ item.name }}
    </el-button>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
/* eslint-enable no-unused-vars */
export default {
  computed: {
    ...mapState(["player", "fileList"]),
  },
  methods: {
    ...mapMutations(["updatePlaylist"]),
    playListFromIndex(i, src) {
      if (this.player.src() == src) {
        if (this.player.paused()) {
          this.player.play()
        } else {
          this.player.pause()
        }
      } else {
        this.updatePlaylist({
          data: this.fileList,
          index: i
        })
      }
    }
  }
}
</script>

<style scoped>
.files {
  margin-top: 6px;
  max-height: 480px;
  overflow-y: scroll;
}
.current {
  background-color: #fcfcfc !important;
}

.item, .item:hover, .item:focus {
  display: block;
  line-height: 2;
  border-top: 1px solid #eee8d5;
  border-bottom: 1px solid #eee8d5;
  border-left: none;
  border-right: none;
  margin-top: -1px;
  padding-left: 10px;
  margin-left: 0;
  width: 100%;
  text-align: left;
  color: #555;
  white-space:nowrap;
}

</style>