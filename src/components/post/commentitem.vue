<script setup lang="ts">
import { defineProps, ref } from 'vue'
import service from '../../plugins/axios'
import { API_URL } from '../../config'
import { token } from '../../plugins/pinia'
const data = defineProps({
  id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorid: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
})

const edit = () => {
  window.location.href = `/posting?postid=${data.id}`
}
const del = () => {
  window.location.href = `/posting?postid=${data.id}`
}
async function IsMycomment() {
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
  if (data.authorid === res) {
    return true
  }
  return false
}
const isMyComment = ref(await IsMycomment())
//格式化时间几天前
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
const userdata = await (
  await service.get(`userinfo/getuser?id=${data.authorid}`)
).data.data
</script>

<template>
  <el-card style="margin: 10px 0;">

    <template #header>
      <div class="card-header">

        <div v-show="isMyComment">
          <el-button type="text"
                     @click="edit">
            编辑
          </el-button>
          <el-button type="text"
                     @click="del">
            删除
          </el-button>
        </div>
        <el-tag type="success">
          发表时间:{{ formatDate(data.time)}}
        </el-tag>
      </div>
    </template>
    <el-row>
      <el-col :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              :xl="6">

        <div class="c">

          <el-avatar style="margin-right: 10px;"
                     :size="100"
                     :src="API_URL+userdata.user.avatar">
          </el-avatar>
        </div>
        <div class="c">
          <el-button type="text"
                     style="margin-right: 10px;">
            {{ userdata.user.nickname?userdata.user.nickname:userdata.username }}
          </el-button>
        </div>

      </el-col>
      <el-col :xs="24"
              :sm="24"
              :md="18"
              :lg="18"
              :xl="18">
        <v-md-editor :model-value="data.content"
                     mode="preview"
                     class="md">
        </v-md-editor>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 居中 */
.c {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>