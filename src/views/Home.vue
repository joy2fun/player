<template>
  <div class="home">
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
/* eslint-enable no-unused-vars */

export default {
  name: "Home",
  methods: {
    ...mapActions(["loadPlaylistFromIndex"])
  },
  mounted() {
    // user.all().then(r => console.log(r.data))
    // user.login('php@html.js.cn', '111111').then(
    //   () => {
    //     user.info().then(r => console.log(r))
    //   }
    // )

    // this.loadPlaylistFromIndex("mv");
  }
};
</script>
