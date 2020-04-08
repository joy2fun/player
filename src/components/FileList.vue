<template>
  <div id="files" class="files">
    <a class="item"
      v-for="(item, index) in fileList"
      :key="index"
      @click="playListFromIndex(index)">
      <i
        :class="{
          'blink': player.src() === item.src,
        }"
        class="el-icon-right"></i>
      <span> {{item.name}} </span>
    </a>
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
    playListFromIndex(i) {
      this.updatePlaylist(this.fileList)
      this.player.playlist.currentItem(i)
    }
  }
}
</script>

<style scoped>
.files {
  margin-top: 6px;
  height: 480px;
  overflow-y: scroll;
}
.item {
  display: block;
  line-height: 2.5;
  border-top: 1px solid #eee8d5;
  border-bottom: 1px solid #eee8d5;
  margin-top: -1px;
  cursor: pointer;
  color: #555;
  white-space:nowrap;
}
.item:hover {
  background: #eee8d5;
  opacity: .8;
}
.item i {
  opacity: 0;
}
.item i.current {
  opacity: .9;
}
.item i.blink {
  opacity: .9;
  animation: blinker 1s linear infinite;
}
@keyframes blinker {
  90% {
    opacity: 0;
  }
}
</style>