<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import userinfo from './userinfo.vue'
import router from '../../plugins/router'
import { token, Avatar } from '../../plugins/pinia'
import { onMounted } from 'vue-demi'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const to_login = async () => {
  //跳转到主页
  // await router.push('/auth?type=login')
  window.location.href = '/auth?type=login'
}
onMounted(() => {
  const login_avatar = document.getElementById('login_avatar')
  if (login_avatar) {
    //鼠标进入头像旋转360度
    login_avatar.addEventListener('mouseenter', () => {
      login_avatar.style.transition = 'all 0.5s'
      login_avatar.style.transform = 'rotate(360deg)'
    })
    //鼠标离开头像旋转回来
    login_avatar.addEventListener('mouseleave', () => {
      //一秒动画
      login_avatar.style.transition = 'all 0.5s'
      login_avatar.style.transform = 'rotate(0deg)'
    })
  }
})
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
                     :src="Avatar().URL" />
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
