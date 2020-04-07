<template>
  <div id="files">
    <div v-for="(item, index) in fileList" :key="index" @click="player.src(item.src)">{{item.name}}</div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
/* eslint-enable no-unused-vars */
export default {
  computed: {
    ...mapState(["player", "fileList"])
  },
}
</script>