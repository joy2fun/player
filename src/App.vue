<template>
  <div id="app">
    <video-player />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/index">Index</router-link>
    </div>
    <router-view/>
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
  background: #fea;
}
textarea:focus, input:focus, video:focus{
    outline: none;
}
</style>
