<script setup lang="ts">
import service from '../../plugins/axios'
import { defineProps, ref, watch } from 'vue'
import { API_URL } from '../../config'

const dp = defineProps({
  id: {
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
  authorid: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  numberOfReplies: {
    type: String,
    required: true,
  },
  views: {
    type: String,
    required: true,
  },
})
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
const userinfo = ref(
  await (
    await service.get(`userinfo/getuser?id=${dp.authorid}`)
  ).data
)
//监听数据变化
watch(
  dp,
  async (newVal) => {
    userinfo.value = await (
      await service.get(`userinfo/getuser?id=${dp.authorid}`)
    ).data
    userinfo.value.data.user.avatar = API_URL + userinfo.value.data.user.avatar
  },

  { deep: true }
)

userinfo.value.data.user.avatar = API_URL + userinfo.value.data.user.avatar
const to_post = () => {
  window.location.href = `/post/${dp.id}`
}
</script>

<template>
  <el-card>
    <el-row>

      <el-col :span="4">
        <div>
          <el-avatar :src="userinfo.data.user.avatar? userinfo.data.user.avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                     size="large" />
        </div>

      </el-col>
      <el-col :span="20">
        <span class="title"
              v-html="dp.title" />
        <p class="content">{{dp.content}}</p>
        <!-- 左边 -->
        <div type="text"
             style="float: left">
          <el-space wrap>
            <el-tag type="primary">作者：{{ userinfo.data.user.nickname?userinfo.data.user.nickname:userinfo.data.username }}</el-tag>
            <el-tag type="info">{{ formatDate(dp.time) }}</el-tag>
            <el-tag type="success">回复{{ dp.numberOfReplies?numberOfReplies:0 }}</el-tag>
            <el-tag type="warning">浏览量{{ dp.views }}</el-tag>
          </el-space>
        </div>
        <el-button type="text"
                   style="float: right"
                   @click="to_post">
          去看看
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 6px;
}
.content {
  font-size: 14px;
  color: #606266;
}
.title .content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>