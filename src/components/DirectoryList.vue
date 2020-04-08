<template>
  <div id="directories" class="directories">
    <a class="folder"
      v-for="(item, index) in directoryList"
      :key="index"
      @click="loadIndex(item.path)">
      <i class="el-icon-folder"></i> <span> {{item.name}} </span>
    </a>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
/* eslint-enable no-unused-vars */
export default {
  computed: {
    ...mapState(["directoryList"]),
  },
  methods: {
    ...mapActions(["loadIndex"])
  },
}
</script>

<style scoped>
.directories {
  margin-top: 6px;
}
.folder {
  display: block;
  line-height: 2.5;
  border-top: 1px solid #eee8d5;
  border-bottom: 1px solid #eee8d5;
  margin-top: -1px;
  padding-left: 6px;
  cursor: pointer;
  color: #555;
}
.folder:hover {
  background: #eee8d5;
  opacity: .8;
}
.folder i {
  color: #c29503;
}
</style>