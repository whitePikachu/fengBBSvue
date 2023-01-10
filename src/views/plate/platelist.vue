<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import service from '../../plugins/axios'
import { token } from '../../plugins/pinia'
import platePostItem from '../../components/plate/platePostItem.vue'
import plateMenu from '../../components/plate/plateMenu.vue'
import { ChatSquare } from '@element-plus/icons-vue'
// <el-icon><ChatSquare /></el-icon>
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
function bt_post() {
  window.location.href = `/posting?plate=${id === 0 ? 1 : id}`
}

const topPost = ref([] as any)
if (id != 0) {
  topPost.value = await (
    await service.get(
      `/post/platelist?plateid=${id}&page=${1}&limit=${5}&isTop=true`
    )
  ).data.data
}
</script>

<template>
  <el-empty v-show="data.data.length==0"
            description="没有找到任何帖子" />
  <div v-show="topPost.length > 0">
    <el-divider>置顶帖子</el-divider>
    <div v-for="(item,i) of topPost"
         :key="i"
         style="margin: 10px 0;">
      <platePostItem :id="item.id"
                     :title="item.title"
                     :content="item.content"
                     :authorid="item.authorId"
                     :time="item.updatedAt"
                     :numberOfReplies="item.comments"
                     :views="item.views" />
    </div>
  </div>
  <el-divider>普通帖子</el-divider>
  <div v-for="(item,i) of data.data"
       :key="i"
       style="margin: 10px 0;">
    <platePostItem :id="item.id"
                   :title="item.title"
                   :content="item.content"
                   :authorid="item.authorId"
                   :time="item.updatedAt"
                   :numberOfReplies="item.comments"
                   :views="item.views" />
  </div>
  <el-divider />
  <el-pagination layout="prev, pager, next"
                 :page-count="data.totalPage"
                 @current-change="page"
                 id="page" />
  <el-affix position="bottom"
            id="posting"
            :offset="20"
            :v-shou="id == 0">
    <el-button type="primary"
               @click="bt_post"
               size="large"
               :icon="ChatSquare"
               circle></el-button>
  </el-affix>
  <!-- 板块菜单 -->
  <el-affix :offset="120"
            id="plate">
    <Suspense>
      <template #default>
        <plateMenu />
      </template>
      <template #fallback>
        <el-skeleton />
      </template>
    </Suspense>
  </el-affix>
</template>

<style scoped >
/* 右对齐 */
#posting {
  position: absolute;
  right: 0;
  bottom: 0;
}
#plate {
  position: fixed;
  top: 120px;
  left: 0;
  z-index: 1000;
}
</style>