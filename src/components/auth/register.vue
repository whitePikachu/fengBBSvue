<script setup lang="ts">
import { reactive, ref } from 'vue'
let ressuccess = ''
const codvisible = ref(false)
const bt_disabled = ref(false)
function codsuccess(success: string) {
  codvisible.value = false
  bt_disabled.value = true
  ressuccess = success
}
const form = reactive({
  name: '',
  paw: '',
  paw1: '',
})
</script>

<template>
  <el-card class="box-card register">
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
               style="width:100%;">注册</el-button>
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