<script setup lang="ts">
import { onMounted, ref, VNodeRef } from 'vue'
import { encrypt, decrypt } from '../../plugins/crypto'

import service from '../../plugins/axios'
const successcod = async (success: string) => {
  const res = await service.post('cod/verifycod', {
    cod: success,
  })

  console.log(res.data)
}
</script>

<template>
  主页
</template>

<style scoped>
</style>

