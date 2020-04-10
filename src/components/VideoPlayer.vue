<template>
  <div id="player-wrapper">
    <div>
      <video ref="videoPlayer" class="video-js"></video>
    </div>
    <div class="controls">
      <el-form :inline="true">
        <el-form-item>
          <el-button
            icon="el-icon-caret-right"
            size="mini"
            @click="togglePlay()"
            circle></el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-arrow-left"
            size="mini"
            @click="player.playlist.previous()"
            circle></el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-arrow-right"
            size="mini"
            @click="player.playlist.next()"
            circle></el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-refresh-left"
            size="mini"
            @click="backward()"
            circle></el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-refresh-right"
            size="mini"
            @click="forward()"
            circle></el-button>
        </el-form-item>
        <el-form-item>
          <el-dropdown @command="handleChangeSpeedCommand">
            <span class="el-dropdown-link">
              <el-button
                class="el-icon-s-operation"
                size="mini"
                circle></el-button>
            </span>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(i, index) in [0.5, 0.75, 1.0, 1.25, 1.5, 2]"
                :command="i"
                :key=index>{{i}}x</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>

        <el-form-item>
          <el-switch
            v-model="replayCurrent">
          </el-switch> Repeat
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="shuffledList">
          </el-switch> Random
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";

/* eslint-disable no-unused-vars */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import videojsplaylist from "videojs-playlist";
/* eslint-enable no-unused-vars */

export default {
  name: "VideoPlayer",
  data() {
    return {
      videoOptions: {
        fluid: true,
        autoplay: true,
        controls: true,
        sources: [],
        plugins: {
          playlist: {
          }
        }
      },
    };
  },
  mounted() {
    let player = videojs(
      this.$refs.videoPlayer,
      this.videoOptions,
      function onPlayerReady() {
      }
    );
    if (! this.replayCurrent) {
      player.playlist.autoadvance(0)
    }
    player.playlist.repeat(true)
    this.setupPlayer(player)
    window.player = player
  },
  methods: {
    ...mapMutations([
      "setupPlayer",
      "setReplayCurrent",
      "shufflePlaylist",
      "updatePlaylist",
      "updatePlaySpeed",
    ]),
    forward() {
      this.player.currentTime(Math.min(this.player.currentTime()+10, this.player.duration()-1))
    },
    backward() {
      this.player.currentTime(Math.max(this.player.currentTime()-10, 0))
    },
    handleChangeSpeedCommand(v) {
      this.updatePlaySpeed(v)
    },
  },
  computed: {
    ...mapState(["player"]),
    replayCurrent: {
      get() {
        return this.$store.state.replayCurrent
      },
      set(value) {
        this.setReplayCurrent(value)
      }
    },
    shuffledList: {
      get() {
        return this.$store.state.shuffledList
      },
      set(value) {
        this.shufflePlaylist(value)
      }
    },
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<style scoped>
.controls {
  margin-top: 6px;
}
.speed-bar {
  width: 100px;
  display: inline-block;
}
</style>