<script setup lang="ts">
import homeHeader from '../views/homeHeader/index.vue'
</script>

<template>
  <el-container>
    <el-header>
      <homeHeader />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      BY:枫叶秋林
    </el-footer>
  </el-container>
</template>

<style scoped>
</style>
