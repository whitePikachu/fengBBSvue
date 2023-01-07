<script setup lang="ts">
// 插槽
import { ref } from 'vue'
import service from '../../plugins/axios'
import { API_URL } from '../../config'

const dp = defineProps({
  id: {
    type: String,
    required: true,
  },
  numberOfReplies: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
})
const to_gethub = () => {
  window.location.href = `https://github.com/${data.data.user.github}`
}
const data = await (await service.get(`userinfo/getuser?id=${dp.id}`)).data
// /userinfo/count?id=3
const count = await (await service.get(`/userinfo/count?id=${dp.id}`)).data
</script>

<template>
  <el-card style="margin: 10px 0px;"
           class="post-card">
    <template #header>
      <el-button type="text"
                 :href="data.data.user.github">
        {{ data.data.user.nickname?data.data.user.nickname:data.data.username }}

      </el-button>
      <el-divider direction="vertical" />
      回复:{{ numberOfReplies }}
      <el-divider direction="vertical" />
      浏览:{{ views }}
    </template>

    <div class="center">
      <el-avatar :src="API_URL+data.data.user.avatar"
                 :size="100" />
    </div>
    <div class="left">
      <span class="personalSignature">{{ data.data.user.signature }}</span>
    </div>
    <el-button type="primary"
               style="width: 100%;margin:  0px;"
               @click="to_gethub">GitHub</el-button>
    <!-- 用户组 -->
    <div class="center">
      <el-tag type="success">Lv.{{data.data.user.level}}</el-tag>
    </div>
    <el-row>
      <el-col :span="8">
        <el-row>
          <el-col :span="24">
            <div style="text-align: center;">枫币</div>
          </el-col>
          <el-col :span="24">
            <div style="text-align: center;">{{ count.data.mapleCoin}}</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="24">
            <div style="text-align: center;">发帖数</div>
          </el-col>
          <el-col :span="24">
            <div style="text-align: center;">{{count.data.post}}</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="24">
            <div style="text-align: center;">回帖数</div>
          </el-col>
          <el-col :span="24">
            <div style="text-align: center;">{{count.data.reply}}</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped >
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
}
/* 左对齐 */
.left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0px;
}

/* 个性签名 */
.personalSignature {
  font-size: 14px;
  color: #606266;
}
</style>