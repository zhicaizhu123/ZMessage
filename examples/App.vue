<template>
  <div class="app">
    <el-button @click="onMessage">消息提醒</el-button>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      count: 1
    }
  },

  methods: {
    onMessage() {
      this.$message(`消息提醒${this.count}`)
      this.count++
    }
  }
}
</script>
