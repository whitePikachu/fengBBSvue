<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import service from '../plugins/axios'
import { token } from '../plugins/pinia'
import { ElMessage, FormInstance } from 'element-plus'

const { postid } = useRoute().query
console.log(postid)

const submit = async (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid, e) => {
    if (valid) {
      const res = await service({
        method: 'post',
        url: '/comment',
        headers: {
          Authorization: `Bearer ${token().token}`,
          cod: ressuccess,
        },
        data: {
          postid,
          content: formDate.content,
        },
      })
      if (res.data.cod === 200) {
        window.location.href = `/post/${postid}`
      } else {
        formEl?.resetFields()
        ElMessage.error(res.data.msg)
      }
    } else {
      ElMessage.error('请检查表单')
    }
  })
}
const formDate = reactive({
  cod: '',
  content: '',
})
const formRef = ref<FormInstance>()
const rule = reactive({
  cod: [{ required: true, message: '请点击按钮进行验证', trigger: 'change' }],
  content: [{ required: true, message: '请输入回复内容', trigger: 'change' }],
})
console.log(postid)

const { title } = await (await service.get(`/post?id=${postid}`)).data
let ressuccess = ''
const codvisible = ref(false)
const bt_disabled = ref(false)
function codsuccess(success: string) {
  codvisible.value = false
  bt_disabled.value = true
  ressuccess = success
  formDate.cod = '验证成功'
}
</script>

<template>
  <el-card>
    <el-form :rules="rule"
             ref="formRef"
             :model="formDate"
             label-position="top"
             hide-required-asterisk="false">

      <el-form-item label="帖子标题">
        <el-input disabled
                  v-model="title" />
      </el-form-item>
      <el-form-item label="回复内容"
                    prop="content">
        <v-md-editor v-model="formDate.content"
                     height="800px" />
      </el-form-item>
      <el-form-item label="验证码"
                    prop="cod">
        <el-input type="password"
                  v-model="formDate.cod"
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
      <el-form-item>

        <el-button type="primary"
                   style="width: 100%;"
                   class="fr"
                   @click="submit(formRef)">提交</el-button>

      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped >
.fr {
  float: right;
}
</style>