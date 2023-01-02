<script setup lang="ts">
import service from '../../plugins/axios'
import { defineProps } from 'vue'

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

const userinfo = await (
  await service.get(`userinfo/getuser?id=${dp.authorid}`)
).data
console.log(JSON.stringify(userinfo))
</script>

<template>
  <el-card>
    <el-row>
      <el-col :span="4">
        <el-avatar :src="userinfo.data.user.avatar? userinfo.data.user.avatar : 'https://avatars.githubusercontent.com/u/25154432?v=4'"
                   size="large" />
      </el-col>
      <el-col :span="20">
        <span class="title">{{dp.title}}</span>
        <p class="content">{{dp.content}}</p>
        <!-- 左边 -->
        <div type="text"
             style="float: left">
          <el-space wrap>
            <el-tag type="primary">{{ userinfo.data.username }}</el-tag>
            <el-tag type="info">{{ formatDate(dp.time) }}</el-tag>
            <el-tag type="success">回复{{ dp.numberOfReplies?numberOfReplies:0 }}</el-tag>
            <el-tag type="warning">浏览量～开发中</el-tag>
          </el-space>
        </div>
        <el-button type="text"
                   style="float: right"
                   @click="() => $router.push(`/${data.id}`)">
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