

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const select = ref('')
const input3 = ref('')
</script>

<template>
  <el-input v-model="input3"
            placeholder="请输入搜索内容"
            class="input-with-select">
    <template #prepend>
      <el-select v-model="select"
                 style="width: 80px">
        <el-option label="帖子"
                   value="1" />
        <el-option label="用户"
                   value="2" />
      </el-select>

    </template>
    <template #append>
      <el-button :icon="Search" />
    </template>
  </el-input>
</template>

<style scoped>
</style>
