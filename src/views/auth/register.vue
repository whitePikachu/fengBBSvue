

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
onMounted(() => {
  const avatar = document.getElementById('avatar')
  const box_card = document.getElementsByClassName('box-card')[0] as HTMLElement
  if (avatar && box_card) {
    //r_main到浏览器左边距离+自身宽度的一半-头像宽度的一半
    avatar.style.left = (box_card.clientWidth - 100) / 2 + 'px'
  }
  window.addEventListener('resize', () => {
    if (avatar) {
      avatar.style.left = (box_card.clientWidth - 100) / 2 + 'px'
    }
  })
})
const form = reactive({
  name: '',
  paw: '',
  paw1: '',
})
</script>

<template>
  <div id="r_main">
    <div style="position: relative;">
      <div id="avatar">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                   :size="100" />
      </div>

      <el-card class="box-card">

        <el-form :model="form"
                 label-position="top">
          <el-form-item label="用户名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password"
                      v-model="form.paw" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password"
                      v-model="form.paw1" />
          </el-form-item>
          <el-form-item>
            <el-checkbox>
              <span>我已阅读并同意</span>
              <el-link type="primary"
                       href="#">《用户协议》</el-link>
            </el-checkbox>
          </el-form-item>
          <el-form-item label="验证码">
            <el-button type="info"
                       style="width: 100%;">点击进行验证</el-button>
          </el-form-item>
        </el-form>
        <el-divider />
        <el-button type="primary"
                   style="width:100%;">注册</el-button>
        <br>
        <div>
          <el-button type="text"
                     style="float:right;">已有账号？去登录</el-button>
        </div>
        <br>
      </el-card>
    </div>
    &nbsp;
    <el-card class="box-card">
      <h3>明天在想写点什么</h3>
    </el-card>
  </div>
</template>

<style scoped >
#avatar {
  top: 0px;
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: avatar 1s ease-in-out infinite;
}
@keyframes avatar {
  0% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.1);
  }
}
.box-card {
  min-width: 400px;
  height: 500px;
  margin-top: 50px;
  padding-top: 50px;
}
#r_main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>