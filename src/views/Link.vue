<template>
  <div class="link">
    <div class="link-list">
      <el-button
        class="item"
        @click="open(item.url)"
        v-for="(item, index) in list"
        :key="index"
        type="text"
        size="mini"
        plain>{{ item.title ? item.title : item.url }}
      </el-button>
    </div>
    <div class="link-new">
      <el-form size="small" @submit.native.prevent="create">
        <el-form-item>
          <el-input v-model="link" placeholder="https://" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="title" placeholder="title" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            size="small"
            plain>添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import common from '@/api/common'

export default {
  data() {
    return {
      title: '',
      link: 'https://',
      list: [],
    }
  },
  mounted() {
    common.links()
      .then(r => this.list = r.data.links)
  },
  methods: {
    open(url) {
      window.open(url)
    },
    create() {
      common.createLink(this.title, this.link)
        .then(() => {
          common.links()
            .then(r => this.list = r.data.links)
        })
    },
  }
}
</script>

<style scoped>
.item, .item:hover, .item:focus {
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
  color: #555;
  white-space:nowrap;
}

.link-new {
  margin-top: 8px;
}
.el-form-item{
  margin-bottom: 6px;
}
</style>