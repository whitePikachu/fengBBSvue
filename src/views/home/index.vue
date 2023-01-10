<script setup lang="ts">
import plateMenu from '../../components/plate/plateMenu.vue'
import newPostVue from '../../components/home/newPost.vue'
import redplate from '../../components/home/redplate.vue'
import service from '../../plugins/axios'
const data = (await service.get('/auth/concat')).data
const notice = `本论坛已经有${data.data.count}个会员，最新注册的会员是${data.data.newuser}，欢迎大家来到本论坛！`
</script>

<template>
  <el-alert :title="notice"
            type="success"
            :closable="false" />
  <div id="home">
    <el-affix :offset="120"
              target="#home"
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
  </div>
  <el-row :gutter="20">
    <el-col :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24">
      <div style="margin: 12px 0px;">
        <el-card>
          <el-carousel height="200px">
            <el-carousel-item v-for="item in 4"
                              :key="item">
              <h3>暂无内容</h3>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12">
      <div style="margin: 12px 0px;">
        <el-card>
          <template #header>
            <span>最新帖子</span>
          </template>
          <!-- 异步最新帖子 -->
          <Suspense>
            <template #default>
              <newPostVue />
            </template>
            <template #fallback>
              <el-skeleton />
            </template>
          </Suspense>
        </el-card>
      </div>

    </el-col>
    <el-col :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12">
      <div style="margin: 12px 0px;">
        <el-card>
          <template #header>
            <span>热门板块</span>
          </template>
          <Suspense>
            <template #default>
              <redplate />
            </template>
            <template #fallback>
              <el-skeleton />
            </template>
          </Suspense>
        </el-card>
      </div>

    </el-col>
  </el-row>

</template>

<style scoped>
#home {
  width: 100%;
}
#plate {
  position: fixed;
  top: 120px;
  left: 0;
  z-index: 1000;
}
</style>

