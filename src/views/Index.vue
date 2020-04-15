<template>
  <div class="index">

    <div id="directory-nav" class="nav">
      <span>
        <el-button
          class="folder-item"
          type="primary"
          size="small"
          icon="el-icon-folder-opened"
          @click="loadIndex('')"
          plain>
        </el-button>
      </span>
      <span v-for="(item, index) in navPath" :key="index"> /
        <el-button
          class="folder-item"
          type="primary"
          size="small"
          @click="loadIndex(item.path)"
          plain>{{ item.name }}
        </el-button>
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
.folder-item {
  padding: 7px 8px;
}
</style>
