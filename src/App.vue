<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <div id="nav" style="float:left; text-align:right; line-height:40px;">
          <router-link to="/">
            <el-button
              icon="el-icon-s-home"
              size="mini"
              circle>
            </el-button>
          </router-link> &nbsp;
          <router-link to="/index">
            <el-button
              icon="el-icon-folder-opened"
              size="mini"
              circle>
            </el-button>
          </router-link> &nbsp;
          <router-link to="/link">
            <el-button
              icon="el-icon-link"
              size="mini"
              circle>
            </el-button>
          </router-link>
        </div>
        <player-control style="float:right; height: 50px; ovflow:hidden;" />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8" >
        <div class="grid-content">
          <router-view/>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content"><video-player /></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import user from '@/api/user'

/* eslint-disable no-unused-vars */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
/* eslint-enable no-unused-vars */
import VideoPlayer from "@/components/VideoPlayer.vue";
import PlayerControl from "@/components/PlayerControl.vue";

export default {
  components: {
    VideoPlayer,
    PlayerControl,
  },
  mounted() {
    if (localStorage.getItem('token')) {
      user.info()
        .then(() => this.setLoggedIn(true))
    }
  },
  methods: {
    ...mapMutations(["setLoggedIn"])
  }
}
</script>

<style>
body {
  color: #B58900;
  background: #fdf6e3;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
textarea:focus, input:focus, video:focus, button:focus{
    outline: none;
}
.nav {
  line-height: 3;
  font-size: 1.1rem;
  background: #eee8d5;
  padding-left: 0.5em;
}
</style>
