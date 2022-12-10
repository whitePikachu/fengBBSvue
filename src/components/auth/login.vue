<script setup lang="ts">
import { reactive, ref } from 'vue'
const form = reactive({
  name: '',
  paw: '',
})
const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  paw: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
})
const formRef = ref()
const bt_login = async (formEl: any) => {
  formEl.validate((valid: boolean, e: any) => {
    if (valid) {
      console.log(form)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<template>
  <el-carousel height="230px">
    <el-carousel-item>
      <el-image style="width: 360px; height: 98%"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
    </el-carousel-item>
    <el-carousel-item>
      <el-image style="width: 360px; height: 98%"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
    </el-carousel-item>

  </el-carousel>
  <el-divider />
  <el-form ref="formRef"
           :model="form"
           :rules="rules"
           label-position="top">
    <el-form-item label="用户名"
                  prop="name">
      <el-input v-model="form.name"
                style="width:98%;"
                placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码"
                  prop="paw">
      <el-input v-model="form.paw"
                placeholder="请输入密码"
                style="width:98%;"
                type="password"></el-input>
    </el-form-item>
    <el-form-item>

    </el-form-item>
  </el-form>
  <el-divider />
  <!-- 快捷登录 -->
  <div>
    <el-button type="primary"
               style="width:98%;"
               @click="bt_login(formRef.value)">
      登陆
    </el-button>
    <el-button type="text"
               id="to_register"
               style="float:right;">没有账号？去注册</el-button>
  </div>

</template>

<style scoped lang="scss">
</style>