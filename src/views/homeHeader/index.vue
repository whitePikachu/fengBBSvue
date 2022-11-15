<script setup lang="ts">
import left from '../../components/header/hleft.vue'
import hright from '../../components/header/hright.vue'
import hsearch from '../../components/header/hsearch.vue'
</script>

<template>

  <el-row justify="center">

    <el-col :xs="3"
            :sm="3"
            :md="3"
            :lg="3"
            :xl="2">
      <hright />
    </el-col>
    <el-col :xs="15"
            :sm="17"
            :md="17"
            :lg="17"
            :xl="18">
      <div style="height: 10px;"
           class="hidden-sm-and-down"></div>
      <hsearch />
    </el-col>
    <el-col :xs="6"
            :sm="4"
            :md="3"
            :lg="4"
            :xl="4">
      <div style="height: 10px;"
           class="hidden-sm-and-down"></div>
      <div class="left">
        <left />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.left {
  display: flex;
  justify-content: flex-end;
}
</style>
