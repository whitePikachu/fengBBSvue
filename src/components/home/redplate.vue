<script setup lang="ts">
import service from '../../plugins/axios'
const data = await (await service.get('/plate/getplatebycount')).data
const tabclick = (row: any) => {
  window.location.href = `/platelist/${row.id}`
}
</script>

<template>
  <el-table :data="data"
            style="width: 100%"
            @cell-click="tabclick">
    <el-table-column prop="name"
                     label="板块" />
    <el-table-column prop="count"
                     label="帖子数" />
  </el-table>
</template>

<style scoped>
</style>