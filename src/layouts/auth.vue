<script setup lang="ts">
import { onMounted } from 'vue'
import cod from './../components/cod/index.vue'
import register from './../components/auth/register.vue'
import login from './../components/auth/login.vue'
onMounted(() => {
  const avatar = document.getElementById('avatar')
  const register = document.getElementsByClassName('box-card')[0] as HTMLElement
  const login = document.getElementsByClassName('login')[0] as HTMLElement
  if (avatar && register) {
    avatar.style.left = (register.clientWidth - 100) / 2 + 'px'
  }
  function avatar_move() {
    if (avatar) {
      avatar.style.top = '0px'
      avatar.style.opacity = '1'
      avatar.style.zIndex = '2'
      avatar.style.transform = 'scale(1.2)'
      avatar.style.transition = 'all .5s'
    }
  }
  function avatar_leave() {
    if (avatar) {
      avatar.style.top = '80px'
      avatar.style.opacity = '0'
      avatar.style.transform = 'scale(1.1)'
      avatar.style.transition = 'all .5s'
    }
  }
  register.addEventListener('mouseenter', avatar_move)
  register.addEventListener('mouseleave', avatar_leave)
  window.addEventListener('resize', () => {
    if (avatar) {
      avatar.style.left = (register.offsetWidth - 100) / 2 + 'px'
    }
  })
  function card_move(e: MouseEvent) {
    const target = e.target as HTMLElement
    target.style.transform = 'translateX(25px)'
  }
  function card_leave(e: MouseEvent) {
    const target = e.target as HTMLElement
    target.style.transform = 'translateX(10px)'
  }
  login.addEventListener('mouseenter', card_move)
  login.addEventListener('mouseleave', card_leave)
  function card_click(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (target.className === login.className) {
      register.removeEventListener('mouseenter', avatar_move)
      register.removeEventListener('mouseleave', avatar_leave)
      target.removeEventListener('mouseenter', card_move)
      target.removeEventListener('mouseleave', card_leave)
      target.style.transform = 'translateX(0px)'
      register.style.transform = 'translateX(20px)'
      register.style.paddingRight = '30px'
      target.style.paddingRight = '20px'
      register.addEventListener('mouseenter', card_move)
      register.addEventListener('mouseleave', card_leave)
      register.style.zIndex = '-1'
      target.style.zIndex = '1'
    }
    if (target.className === register.className) {
      register.addEventListener('mouseenter', avatar_move)
      register.addEventListener('mouseleave', avatar_leave)
      target.removeEventListener('mouseenter', card_move)
      target.removeEventListener('mouseleave', card_leave)
      target.style.transform = 'translateX(0px)'
      login.style.transform = 'translateX(20px)'
      login.style.paddingRight = '30px'
      target.style.paddingRight = '20px'
      login.addEventListener('mouseenter', card_move)
      login.addEventListener('mouseleave', card_leave)
      console.log(target.className, login.className)
      login.style.zIndex = '-1'
      target.style.zIndex = '1'
    }
  }
  register.addEventListener('click', card_click)
  login.addEventListener('click', card_click)
  document.getElementById('to_login')?.addEventListener('click', () => {
    login.click()
    avatar_leave()
  })
  document.getElementById('to_register')?.addEventListener('click', () => {
    register.click()
  })
})
</script>

<template>

  <div id="r_main">
    <div style="position: relative;">
      <div id="avatar">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                   :size="100" />
      </div>
      <register class="box-card register" />
      <el-card class="box-card login">
        <login />
      </el-card>
    </div>
    &nbsp;
  </div>
</template>

<style scoped >
.center {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  position: absolute;
  top: 0;
  padding-right: 25px;
  z-index: -1;
  transition: all 0.5s;
}
.register {
  position: relative;
  transition: all 0.5s;
}

#avatar {
  top: 50px;
  z-index: 2;
  opacity: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-card {
  min-width: 400px;
  min-height: 570px;
  margin-top: 50px;
  padding-top: 50px;
}
#r_main {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>