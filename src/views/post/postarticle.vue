<script setup lang="ts">
import service from '../../plugins/axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { token } from '../../plugins/pinia'
import { ElMessage } from 'element-plus'
const data = defineProps({
  postid: {
    type: String,
    required: true,
  },
  plateId: {
    type: String,
    required: true,
  },
  auth_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
})
const edit = () => {
  window.location.href = `/posting?plate=${data.plateId}&postid=${data.postid}`
}
const del = async () => {
  await service({
    url: `/post?postid=${data.postid}`,
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
  if (data.auth_id === res) {
    return true
  }
  return false
}
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
const isMypost = ref(await IsMypost())
function formatDate(date: any) {
  const d = new Date(date)
  const now = Date.now()
  const diff = (now - d.getTime()) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  return Math.ceil(diff / (3600 * 24)) + '天前'
}
</script>

<template>

  <el-card style="margin: 10px 0px;"
           class="post-card">
    <template #header>
      <div class="card-header">
        <span>{{ data.title }}</span>
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
    <el-alert :title="`本帖最后更新与${formatDate(data.updatedAt)}，请注意时效性`"
              type="info"
              :closable="false" />
    <br />
    <el-alert :title="`本帖所有观点均与作者有关，并不代表论坛观点`"
              type="info" />
    <v-md-editor :model-value="data.content"
                 mode="preview"
                 class="md">
    </v-md-editor>

  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>