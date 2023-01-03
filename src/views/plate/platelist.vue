<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import service from '../../plugins/axios'
import platePostItem from '../../components/plate/platePostItem.vue'
let id = useRoute().params.id as any
id = id ? id : 0
const data = ref(
  await (
    await service.get(`/post/platelist?plateid=${id}&page=${1}&limit=${5}`)
  ).data
)
if (useRoute().query.title) {
  data.value = await (
    await service.get(`/post/search?title=${useRoute().query.title}&page=${1}`)
  ).data
}

const page = async (v: number) => {
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