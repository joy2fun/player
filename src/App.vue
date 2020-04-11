<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <player-control style="float:left; height: 50px; ovflow:hidden;" />
        <div id="nav" style="float:right; text-align:right; line-height:50px;">
          <router-link to="/">Home</router-link> |
          <router-link to="/index">Index</router-link>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
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
import PlayerControl from "@/components/PlayerControl.vue";

export default {
  components: {
    VideoPlayer,
    PlayerControl,
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
