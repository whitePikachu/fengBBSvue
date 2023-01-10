

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import service from '../plugins/axios'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import authorInformation from '../views/post/authorInformation.vue'
import postarticle from '../views/post/postarticle.vue'
import postcomment from '../views/post/comment.vue'
import { useDark } from '@vueuse/core'
import { watch } from 'vue'
import { token } from '../plugins/pinia'
import { ChatSquare } from '@element-plus/icons-vue'
const id = useRoute().params.id as string
const data = await (await service.get(`/post?id=${id}`)).data
const views = await (await service.get(`post/addview?id=${id}`)).data
if (data.cod === 400) {
  window.location.href = '/home'
}
const router = useRouter()
const bt_comment = () => {
  if (token().token) {
    window.location.href = `/reply?postid=${id}`
    return
  }
  window.location.href = '/auth?type=login'
}
</script>

<template>
  <el-row gutter="10">
    <el-col :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            :xl="6">

      <Suspense>
        <template #default>
          <authorInformation :id="data.author.auth_id"
                             :numberOfReplies="data.comment"
                             :views="views.data" />
        </template>
        <template #fallback>
          <el-skeleton />
        </template>
      </Suspense>
    </el-col>
    <el-col :xs="24"
            :sm="24"
            :md="18"
            :lg="18"
            :xl="18">

      <Suspense>

        <template #default>
          <postarticle :postid="id"
                       :auth_id="data.author.auth_id"
                       :title="data.title"
                       :plateId="data.plateId"
                       :content="data.content"
                       :updatedAt="data.updatedAt"
                       :Istop="data.isTop" />
        </template>
        <template #fallback>
          <el-skeleton />
        </template>
      </Suspense>
    </el-col>
  </el-row>
  <el-divider />
  <el-affix position="bottom"
            :offset="20">
    <div class="fl">
      <el-button type="primary"
                 @click="bt_comment"
                 size="large"
                 :icon="ChatSquare"
                 circle></el-button>
    </div>

  </el-affix>

  <Suspense>
    <template #default>
      <postcomment :postid="id"
                   class="commentid" />
    </template>
    <template #fallback>
      <el-skeleton />
    </template>
  </Suspense>
</template>

<style scoped>
.post-card {
  min-height: 800px;
}
/* 右对齐 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-affix {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>