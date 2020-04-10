<template>
  <div id="app">
    <el-row :gutter="12">
      <el-col :span="14">
        <div class="grid-content"><video-player /></div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">
          <router-view/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  components: {
    VideoPlayer
  },
}
</script>

<style>
body {
  color: #333;
  background: #fdf6e3;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
textarea:focus, input:focus, video:focus, button:focus{
    outline: none;
}
</style>
