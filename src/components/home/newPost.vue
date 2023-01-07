<script setup lang="ts">
import { ref } from 'vue'
import service from '../../plugins/axios'
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
const data = ref((await service.get(`/post/getNewPost?num=5`)).data)
data.value.map((item: any) => {
  item.createdAt = formatDate(item.createdAt)
})
const tabclick = (row: any) => {
  window.location.href = `/post/${row.id}`
}
</script>

<template>
  <el-table :data="data"
            style="width: 100%"
            @cell-click="tabclick">
    <el-table-column prop="title"
                     label="标题" />
    <el-table-column prop="createdAt"
                     label="发表时间" />
  </el-table>
</template>

<style scoped >
</style>