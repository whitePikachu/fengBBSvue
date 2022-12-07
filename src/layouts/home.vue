<script setup lang="ts">
import homeHeader from '../views/homeHeader/index.vue'
import homefooter from '../views/homefooter/index.vue'
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
      <div class="center">
        <homefooter />
      </div>

    </el-footer>
  </el-container>
</template>

<style scoped>
.center {
  text-align: center;
}
</style>
