<script setup lang="ts">
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import service from '../plugins/axios'
import { token } from '../plugins/pinia'
let { plate, postid } = useRoute().query
const form = reactive({
  platename: '',
  title: '',
  content: '',
  cod: '',
})
const select = ref('')
const platenames = await (await service.get(`/plate/getplate`)).data
platenames.forEach((item: any) => {
  if (item.id === Number(plate)) {
    form.platename = `【${item.name}】`
  }
})
let ressuccess = ''
const codvisible = ref(false)
const bt_disabled = ref(false)
function codsuccess(success: string) {
  codvisible.value = false
  bt_disabled.value = true
  ressuccess = success
  form.cod = '✅验证通过'
}
if (postid) {
  const post = await (await service.get(`/post?id=${postid}`)).data
  form.title = post.title
  form.content = post.content
}
const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur',
    },
  ],
  content: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value.length < 10) {
          callback(new Error('内容长度不能小于10个字符!'))
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
const sub = (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid, e) => {
    if (valid) {
      if (postid) {
        const post = await (
          await service({
            url: `/post`,
            method: 'put',
            headers: {
              Authorization: `Bearer ${token().token}`,
            },
            data: {
              postid,
              plateid: plate,
              title: form.title,
              content: form.content,
            },
          })
        ).data
        if (post.status) {
          ElMessage({
            message: post.msg,
            type: 'error',
            duration: 3 * 1000,
          })
        }
        if (post.code === 200) {
          window.location.href = `/post/${post.data.id}`
        }
        return
      }
      if (plate === '0') {
        if (!select.value) {
          ElMessage({
            message: '请选择板块',
            type: 'error',
            duration: 3 * 1000,
          })
          return
        }
        plate = select.value
      }

      const data = (
        await service({
          url: '/post',
          method: 'post',
          headers: {
            Authorization: `Bearer ${token().token}`,
            code: ressuccess,
          },
          data: {
            plateid: plate,
            title: form.title,
            content: form.content,
            cod: ressuccess,
          },
        })
      ).data
      if (data.status) {
        ElMessage({
          message: data.msg,
          type: 'error',
          duration: 3 * 1000,
        })
      }
      if (data.code === 200) {
        window.location.href = `/post/${data.data.id}`
      }
    }
  })
}
</script>

<template>
  <el-form ref="formRef"
           label-position="top"
           :model="form"
           :rules="rules"
           hide-required-asterisk="false">
    <el-form-item prop="title">
      <el-input v-model="form.title"
                placeholder="请输入标题">
        <template #prepend>
          <span v-if="plate !== `0`">{{ form.platename }}</span>
          <el-select v-else
                     v-model="select"
                     placeholder="请选择"
                     style="width: 115px">
            <el-option v-for="item in platenames"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="content">
      <v-md-editor v-model="form.content"
                   class="md"
                   height="800px" />
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
    <el-form-item>
      <el-button type="primary"
                 @click="sub(formRef)">提交</el-button>
    </el-form-item>
  </el-form>

</template>

<style scoped>
</style>