<template>
  <div id="directories">
    <div v-for="(item, index) in directoryList" :key="index" @click="loadIndex(item.path)">{{item.name}}</div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
/* eslint-enable no-unused-vars */
export default {
  computed: {
    ...mapState(["directoryList"])
  },
  methods: {
    ...mapActions(["loadIndex"])
  },
}
</script>