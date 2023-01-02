<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowUp } from '@element-plus/icons-vue'
import service from '../../plugins/axios'
// import router from '../../plugins/router'
import { useRouter } from 'vue-router'
const isCollapse = ref(true)
const isitem = ref(true)
const data = (await service.get('/plate/getplate')).data

data.sort((a: any, b: any) => {
  return a.id - b.id
})
const router = useRouter()
async function gotoPlate(id: number) {
  window.location.href = `/platelist/${id}`
  //路由跳转
  // await router.push({
  //   path: `/platelist/${id}`,
  // })
  // // router.push(`/platelist/${id}`)
}

onMounted(() => {
  isitem.value = false
  const bt = document.getElementById('el-icon-arrow-up')
  const menu_plates = document.querySelectorAll('.menu-plate')
  let mpheight = 0
  for (let menuPlate of menu_plates) {
    mpheight += menuPlate.offsetHeight
  }
  bt!.style.top = `${(mpheight - bt!.offsetHeight) / 2}px`
  document
    .querySelectorAll('.el-menu--collapse .el-menu-item')
    .forEach((item, index) => {
      item.style.width = '0px'
      item.style.padding = '0px'
    })
  bt?.addEventListener('click', () => {
    bt.style.left = isCollapse.value ? '-12px' : '186px'
    bt.style.transition = 'left 0.4s'
    //获取旋转角度
    const plateIcon = document.getElementById('plateIcon')
    if (plateIcon) {
      isitem.value = !isitem.value
      plateIcon.style.transform = isCollapse.value
        ? 'rotate(90deg)'
        : 'rotate(270deg)'
      plateIcon.style.transition = 'width 1s'
    }
  })
})
</script>

<template>
  <el-button type="primary"
             id="el-icon-arrow-up"
             size="small"
             circle
             @click="isCollapse = !isCollapse">
    <el-icon id="plateIcon">
      <ArrowUp />
    </el-icon>
  </el-button>
  <!-- menu-trigger -->
  <el-menu default-active="2"
           class="menu-plate"
           :collapse="isCollapse"
           trigger="click">
    <el-menu-item v-for="(item,i) in data"
                  :key="i"
                  @click="gotoPlate(item.id)"
                  :index='"platelist/"+item.id'>
      <template #title>{{ item.name }}</template>
    </el-menu-item>

  </el-menu>
</template>

<style scoped >
#el-icon-arrow-up {
  position: absolute;
  z-index: 1000;
  top: 10px;
  left: -12px;
  font-size: 16px;
}
#plateIcon {
  /*旋转90度  */
  transform: rotate(90deg);
}

.menu-plate:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu--collapse {
  width: 0px;
  overflow: hidden;
}
</style>