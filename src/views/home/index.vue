<script setup lang="ts">
import { onMounted, ref, VNodeRef } from 'vue'
import { encrypt, decrypt } from '../../plugins/crypto'
import { ElMessage } from 'element-plus'
import service from '../../plugins/axios'
const successcod = async (success: string) => {
  const res = await service.post('cod/verifycod', {
    cod: success,
  })

  console.log(res.data)
}
</script>

<template>
  <el-empty description="没有内容哦" />
  <button @click="ElMessage('text')">tx</button>
</template>

<style scoped>
</style>

