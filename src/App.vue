<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-switch v-model="isDark"
             inline-prompt
             size="large"
             :active-icon="Moon"
             :inactive-icon="Sunny" />
</template>

<style scoped>
</style>
