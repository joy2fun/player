<template>
  <div class="user">
    <div v-show="!loggedIn">
      <div class="nav">Login In</div>
      <div class="login-form">
        <el-form label-width="80px" size="small" @submit.native.prevent="login">
          <el-form-item label="账号">
            <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              plain>登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="loggedIn">
      <div class="nav">
        <span>My Playlist</span>
        <span style="float:right;padding-right:8px">
          <el-button
            icon="el-icon-switch-button"
            type="primary"
            size="mini"
            @click="logout"
            plain
            circle></el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import user from '@/api/user'
import index from '@/api/index'

/* eslint-disable no-unused-vars */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
/* eslint-enable no-unused-vars */

export default {
  name: "User",
  data() {
    return {
      email: localStorage.getItem('email'),
      password: '',
    }
  },
  computed: {
    ...mapState(["loggedIn"]),
  },
  methods: {
    ...mapMutations(["setLoggedIn"]),
    login() {
      user.login(this.email, this.password)
        .then(() => {
          localStorage.setItem('email', this.email)
        })
        .catch(() => this.$message.error('Login failed'))
      return false
    },
    logout() {
      user.logout()
    },
  },
  mounted() {
    index.list('ActualEnglish/001-099').then(r => console.log(r));
  }
};
</script>

<style scoped>
.login-form {
  margin: 30px 0;
  width: 260px;
}
</style>
