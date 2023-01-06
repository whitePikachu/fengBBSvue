<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import service from '../../plugins/axios'
import { token } from '../../plugins/pinia'
import platePostItem from '../../components/plate/platePostItem.vue'
let id = useRoute().params.id as any
id = id ? id : 0
let type: 'search' | 'user' | '' = ''
const data = ref(
  await (
    await service.get(`/post/platelist?plateid=${id}&page=${1}&limit=${5}`)
  ).data
)
if (useRoute().query.title) {
  type = 'search'
  data.value = await (
    await service.get(`/post/search?title=${useRoute().query.title}&page=${1}`)
  ).data
}
if (useRoute().query.type) {
  type = 'user'
  if (useRoute().query.type === 'user') {
    data.value = await (
      await service({
        url: `/post/getpostbyuserid?page=${1}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
  }
}
const page = async (v: number) => {
  if (type === 'search') {
    data.value = await (
      await service.get(
        `/post/search?title=${useRoute().query.title}&page=${v}`
      )
    ).data
    return
  }
  if (type === 'user') {
    data.value = await (
      await service({
        url: `/post/getpostbyuserid?page=${v}&limit=${5}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
    return
  }
  data.value = await (
    await service.get(`/post/platelist?plateid=${id}&page=${v}&limit=${5}`)
  ).data
}
</script>

<template>
  <div v-for="(item,i) of data.data"
       :key="i"
       style="margin: 10px 0;">
    <platePostItem :id="item.id"
                   :title="item.title"
                   :content="item.content"
                   :authorid="item.authorId"
                   :time="item.updatedAt"
                   :numberOfReplies="item.comments" />
  </div>
  <el-divider />
  <el-pagination layout="prev, pager, next"
                 :page-count="data.totalPage"
                 @current-change="page"
                 id="page" />

</template>

<style scoped >
</style>