<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Check, Close } from '@element-plus/icons-vue'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-switch v-model="isDark"
             class="mt-2"
             style="margin-left: 24px"
             inline-prompt
             :active-icon="Check"
             :inactive-icon="Close" />
</template>

<style scoped>
</style>
