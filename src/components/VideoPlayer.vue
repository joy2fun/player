<template>
  <div id="player-wrapper">
    <div>
      <video ref="videoPlayer" class="video-js"></video>
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
    ]),
  },
  computed: {
    ...mapState(["player"]),
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>
