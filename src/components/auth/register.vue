<script setup lang="ts">
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import service from '../../plugins/axios'
import { reactive, ref } from 'vue'
import { token } from '../../plugins/pinia'

let ressuccess = ''
const codvisible = ref(false)
const bt_disabled = ref(false)
function codsuccess(success: string) {
  codvisible.value = false
  bt_disabled.value = true
  ressuccess = success
  form.cod = '✅验证通过'
}
const form = reactive({
  name: '',
  emali: '',
  paw: '',
  paw1: '',
  cod: '',
})
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  emali: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  paw: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  paw1: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.paw) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  cod: [{ required: true, message: '请点击按钮进行验证', trigger: 'change' }],
})
const formRef = ref<FormInstance>()
const bt_resgister = async (formEl: FormInstance | undefined) => {
  formEl?.validate((valid, e) => {
    if (valid) {
      service({
        url: 'auth/register',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          cod: ressuccess,
        },
        data: {
          name: form.name,
          emali: form.emali,
          paw: form.paw,
        },
      })
        .then((res) => {
          if (res.data.token) {
            token().token = res.data.token
            window.location.href = '/home'
            ElMessage.success('注册成功')
          } else {
            formRef.value?.resetFields()
            ElMessage.error(res.data.msg)
          }
        })
        .catch((err) => {
          ElMessage.error(err.message)
          formRef.value?.resetFields()
        })
    }
  })
}
</script>

<template>
  <el-card class="box-card register">
    <el-form ref="formRef"
             :model="form"
             label-position="top"
             :rules="rules">
      <el-form-item label="用户名"
                    prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="emali">
        <el-input type="email"
                  v-model="form.emali" />
      </el-form-item>
      <el-form-item label="密码"
                    prop="paw">
        <el-input type="password"
                  v-model="form.paw" />
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="paw1">
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
      <el-form-item label="验证码"
                    prop="cod">
        <el-input type="password"
                  v-model="form.cod"
                  style="display:none" />
        <el-popover placement="top"
                    :width="330"
                    :visible="codvisible">
          <template #reference>
            <el-button :type="bt_disabled?'success':'info'"
                       style="width: 100%;"
                       :disabled="bt_disabled"
                       @click="(codvisible = !codvisible)">{{bt_disabled?"✅验证通过":"点击进行验证"}}</el-button>
          </template>
          <Suspense>
            <template #default>
              <el-space>
                <div class="center">
                  <cod @success="codsuccess" />
                </div>
              </el-space>
            </template>
            <template #fallback>
              验证码获取中
            </template>
          </Suspense>
        </el-popover>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-button type="primary"
               style="width:100%;"
               @click="bt_resgister(formRef)">注册</el-button>
    <br>
    <div>
      <el-button type="text"
                 id="to_login"
                 style="float:right;">已有账号？去登录</el-button>
    </div>
    <br>
  </el-card>
</template>
<style scoped >
</style>