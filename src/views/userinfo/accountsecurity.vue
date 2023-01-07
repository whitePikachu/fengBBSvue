<script setup lang="ts">
import { reactive, ref } from 'vue'
import service from '../../plugins/axios'
import { token } from '../../plugins/pinia'
import { ElMessage, FormInstance } from 'element-plus'
import { API_URL } from '../../config'
const form = reactive({
  oldpassword: '',
  newpassword: '',
  newpassword2: '',
  cod: '',
})
const codvisible = ref(false)
const bt_disabled = ref(false)
const formRef = ref()
let ressuccess = ''
function codsuccess(success: string) {
  codvisible.value = false
  bt_disabled.value = true
  ressuccess = success
  form.cod = '✅验证通过'
}
const rules = {
  oldpassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  newpassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  newpassword2: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== form.newpassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  cod: [{ required: true, message: '请点击按钮进行验证', trigger: 'change' }],
}
const submit = async (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid: boolean, e: any) => {
    if (valid) {
      const { oldpassword, newpassword, newpassword2 } = form
      const res = (
        await service({
          method: 'put',
          url: `/auth/paw`,
          headers: {
            Authorization: 'Bearer ' + token().token,
            cod: ressuccess,
          },
          data: {
            paw: oldpassword,
            newpaw: newpassword,
          },
        })
      ).data
      if (res.cod === 200) {
        ElMessage.success(res.msg)
        token().token = ''
        window.location.href = '/auth?type=login'
      } else {
        ElMessage.error(res.msg)
      }
    }
  })
}
</script>

<template>
  <el-card style="margin-top: 10px;">
    <template #header>修改密码</template>
    <el-form ref="formRef"
             :model="form"
             label-width="120px"
             :rules="rules"
             hide-required-asterisk="false"
             label-position="left">
      <el-form-item label="验证码"
                    prop="cod">
        <el-input type="password"
                  v-model="form.cod"
                  style="display:none" />
        <el-popover placement="bottom"
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
      <el-form-item label="原密码"
                    prop="oldpassword">
        <el-input v-model="form.oldpassword"
                  type="password"
                  placeholder="请输入原密码"
                  clearable />
      </el-form-item>
      <el-form-item label="新密码"
                    prop="newpassword">
        <el-input v-model="form.newpassword"
                  type="password"
                  placeholder="请输入新密码"
                  clearable />
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="newpassword2">
        <el-input v-model="form.newpassword2"
                  type="password"
                  placeholder="请再次输入新密码"
                  clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submit(formRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<style scoped >
</style>