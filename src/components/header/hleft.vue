<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import router from '../../plugins/router'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const to_login = async () => {
  await router.push('/auth')
}
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
    <el-button @click="to_login">登陆/注册</el-button>
  </el-space>

</template>

<style scoped>
</style>
