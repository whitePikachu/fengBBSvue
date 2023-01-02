

<script setup lang="ts">
import { ref, h } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElDivider } from 'element-plus'
import router from '../../plugins/router'

const select = ref('帖子')
const input3 = ref('')

const spacer = h(ElDivider, { direction: 'vertical' })
const to_home = () => {
  router.push('/home')
}
</script>

<template>
  <el-space :size="10"
            :spacer="spacer"
            class="hidden-sm-and-down">
    <div>
      <el-button text
                 @click="to_home"> 首页</el-button>
    </div>
    <div>
      <el-button text> 帖子</el-button>
    </div>
    <div>
      <el-button text> 热点</el-button>
    </div>
    <div>
      <el-input v-model="input3"
                placeholder="请输入搜索内容"
                class="input-with-select">
        <template #prepend>
          <el-select v-model="select"
                     style="width: 70px">
            <el-option label="帖子"
                       value="1" />
            <el-option label="用户"
                       value="2" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>
  </el-space>
  <el-input v-model="input3"
            placeholder="请输入搜索内容"
            class="input-with-select hidden-md-and-up">
    <template #prepend>
      <el-select v-model="select"
                 style="width: 70px">
        <el-option label="帖子"
                   value="1" />
        <el-option label="用户"
                   value="2" />
      </el-select>
    </template>
    <template #append>
      <el-button :icon="Search" />
    </template>
  </el-input>
</template>

<style scoped>
</style>
