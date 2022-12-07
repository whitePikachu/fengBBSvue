<script setup lang="ts">
import { onMounted, ref, VNodeRef } from 'vue'
import { encrypt, decrypt } from '../../plugins/crypto'
import { ElMessage } from 'element-plus'
import cod from '../../components/cod/index.vue'
const successcod = (success: string) => {
  ElMessage({
    message: `验证通过,加密验证为${success}`,
    type: 'success',
  })
  console.log(success)
}
</script>

<template>
  <Suspense>
    <template #default>
      <el-space>
        <el-card class="box-card">
          <cod @success="successcod" />
        </el-card>
      </el-space>
    </template>
    <template #fallback>
      验证码获取中
    </template>
  </Suspense>
  <el-empty description="没有内容哦" />
  <button @click="ElMessage('text')">tx</button>
</template>

<style scoped>
</style>

