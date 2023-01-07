

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import service from '../plugins/axios'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import authorInformation from '../views/post/authorInformation.vue'
import { useDark } from '@vueuse/core'
import { watch } from 'vue'
import { token } from '../plugins/pinia'
const id = useRoute().params.id
const data = await (await service.get(`/post?id=${id}`)).data
const views = await (await service.get(`post/addview?id=${id}`)).data
onMounted(() => {
  const md = document.querySelector('.vuepress-markdown-body') as HTMLElement
  // 每秒检测一次
  const html = document.querySelector('html') as HTMLElement
  //每秒检测一次
  const timer = setInterval(() => {
    if (md) {
      if (html.className === 'dark') {
        md.style.background = '#1d1e1f'
        md.style.color = '#fff'
      } else {
        md.style.background = '#fff'
        md.style.color = '#000'
      }
    }
  }, 100)
})
async function IsMypost() {
  if (token().token === '') {
    return false
  }
  const res = await (
    await service({
      url: `/auth/islogin`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token().token}`,
      },
    })
  ).data
  if (data.author.auth_id === res) {
    return true
  }
  return false
}
const isMypost = ref(await IsMypost())

if (data.cod === 400) {
  window.location.href = '/home'
}
// 编辑
const edit = () => {
  window.location.href = `/posting?plate=${data.plateId}&postid=${data.id}`
}
const del = async () => {
  await service({
    url: `/post?postid=${id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token().token}`,
    },
  })
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
  window.location.href = `/home`
}
</script>

<template>

  <el-row gutter="10">
    <el-col :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            :xl="6">
      <Suspense>
        <template #default>
          <authorInformation :id="data.author.auth_id"
                             :numberOfReplies="data.comment.length"
                             :views="views.data" />
        </template>
        <template #fallback>
          <el-skeleton />
        </template>
      </Suspense>
    </el-col>
    <el-col :xs="24"
            :sm="24"
            :md="18"
            :lg="18"
            :xl="18">
      <el-card style="margin: 10px 0px;"
               class="post-card">
        <template #header>

          <div class="card-header">
            <span>{{ data.title }}</span>
            <!-- 按钮组 -->
            <div v-show="isMypost">
              <el-button type="text"
                         @click="edit">编辑</el-button>
              <el-divider direction="vertical" />
              <el-popconfirm title="确定要删除这篇帖子吗？"
                             @confirm="del">
                <template #reference>
                  <el-button type="text">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </template>
        <v-md-editor :model-value="data.content"
                     mode="preview"
                     class="md"></v-md-editor>
      </el-card>

    </el-col>
  </el-row>

</template>

<style scoped>
.post-card {
  min-height: 800px;
}
/* 右对齐 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>