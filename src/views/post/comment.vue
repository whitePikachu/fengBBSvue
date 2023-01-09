<script setup lang="ts">
import { onMounted, ref } from 'vue'
import service from '../../plugins/axios'
import commentitem from '../../components/post/commentitem.vue'
const { postid } = defineProps({
  postid: {
    type: String,
    required: true,
  },
})
const page = async (v: number) => {
  data.value = (
    await service.get(`/comment?postId=${postid}&page=${v}&limit=10`)
  ).data
}
const data = ref(
  (await service.get(`/comment?postId=${postid}&page=${1}&limit=10`)).data
)
</script>

<template>

  <el-empty description="还没有人评论呢？"
            v-show="!(data.total > 0)" />
  <Suspense v-for="(item,i) of data.data"
            :key="i">
    <template #default>

      <commentitem :postid="postid"
                   :commentid="item.id"
                   :content="item.content"
                   :authorid="item.authorId"
                   :time="item.updatedAt" />

    </template>
    <template #fallback>
      <el-skeleton />
    </template>
  </Suspense>
  <!-- 分割线 -->
  <el-divider />
  <el-pagination layout="prev, pager, next"
                 :page-count="data.totalPage"
                 @current-change="page" />

</template>

<style scoped >
</style>