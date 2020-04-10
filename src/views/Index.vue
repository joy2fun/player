<template>
  <div class="index">

    <div id="directory-nav" class="breadcrumb">
      <span> <a @click="loadIndex('')">Index</a> </span>
      <span v-for="(item, index) in navPath" :key="index"> /
        <a @click="loadIndex(item.path)">{{ item.name }}</a>
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
    this.loadIndex(this.currentNavPath)
  },
  methods: {
    ...mapActions(["loadIndex"]),
  },
  computed: {
    ...mapState(["currentNavPath"]),
    ...mapGetters(["navPath"]),
  },
}
</script>

<style scoped>
.breadcrumb {
  line-height: 3;
  font-size: 1.1rem;
  background: #eee8d5;
  padding-left: 0.5em;
  color: #999;
}
.breadcrumb a {
  color: #8d6c00;
  cursor: pointer;
}
</style>
