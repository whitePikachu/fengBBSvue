<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-space wrap>
    <el-switch v-model="isDark"
               class="mt-2 hidden-md-and-down"
               size="large"
               style="margin-left: 24px"
               inline-prompt
               :active-icon="Moon"
               :inactive-icon="Sunny" />
    <el-button>登陆/注册</el-button>
  </el-space>

</template>

<style scoped>
</style>
