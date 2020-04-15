<template>
  <div id="directories" class="directories">
    <el-button class="folder"
      @click="loadIndex(item.path)"
      v-for="(item, index) in directoryList"
      :key="index"
      type="text"
      size="small"
      icon="el-icon-folder"
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
  max-height: 480px;
  overflow-y: scroll;
}

.folder, .folder:hover, .folder:focus {
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
  padding-left: 10px;
  color: #555;
}
</style>