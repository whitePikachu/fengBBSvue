<script setup lang="ts">
import plateMenu from '../../components/plate/plateMenu.vue'
import plateList from '../../views/plate/platelist.vue'
</script>

<template>

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
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <el-skeleton />
      </template>
    </Suspense>

  </div>

</template>

<style scoped>
#home {
  width: 100%;
  height: 3000px;
  background-color: #f5f5f5;
}
#plate {
  position: fixed;
  top: 120px;
  left: 0;
  z-index: 1000;
}
</style>

