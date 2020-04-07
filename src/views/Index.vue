<template>
  <div class="index">
    <div id="directory-nav">
      <span> <strong @click="loadIndex('')">Index</strong> </span>
      <span v-for="(item, index) in navPath" :key="index"> /
        <strong @click="loadIndex(item.path)">{{ item.name }}</strong>
      </span>
    </div>
    <directory-list />
    <file-list />
  </div>
</template>

<script>
import DirectoryList from "@/components/DirectoryList";
import FileList from "@/components/FileList";
/* eslint-disable no-unused-vars */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
/* eslint-enable no-unused-vars */

export default {
  components: {
    DirectoryList,
    FileList
  },
  mounted() {
    this.loadIndex(this.currentPath)
  },
  methods: {
    ...mapActions(["loadIndex"]),
  },
  computed: {
    ...mapState(["currentPath"]),
    ...mapGetters(["navPath"]),
  },
}
</script>
