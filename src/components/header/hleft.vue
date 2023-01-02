<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import userinfo from './userinfo.vue'
import router from '../../plugins/router'
import { token } from '../../plugins/pinia'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const to_login = async () => {
  await router.push('/auth')
}
</script>

<template>
  <el-space wrap>
    <el-switch v-model="isDark"
               class="mt-2 hidden-sm-and-down"
               size="large"
               style="margin-left: 24px"
               inline-prompt
               :active-icon="Moon"
               :inactive-icon="Sunny" />
    <el-button @click="to_login"
               v-show="!token().token">登陆/注册</el-button>
    <el-popover :width="200"
                :show-arrow="false">
      <template #reference>
        <div>
          <el-avatar id="login_avatar"
                     v-show="token().token"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
      </template>
      <Suspense>
        <template #default>
          <userinfo />
        </template>
      </Suspense>
    </el-popover>

  </el-space>

</template>

<style scoped>
.login_avatar {
  margin-left: 24px;

  /*  */
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
</style>
