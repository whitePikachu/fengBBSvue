<script setup lang="ts">
import { Operation } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon, Close } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const url = ''
const drawer = ref(false)
</script>

<template>
  <router-link to="/home">
    <el-image style="width: 100px; height: 50px"
              :src="url"
              class="hidden-sm-and-down"
              fit="fit" />
  </router-link>
  <el-button type=""
             class="hidden-md-and-up"
             @click="drawer = true">
    <el-icon>
      <Operation />
    </el-icon>
  </el-button>
  <el-drawer v-model="drawer"
             direction="ltr"
             :with-header="false"
             size="50%">
    <template #default>
      <el-image style=" min-width: 100px; height: 50px"
                :src="url"
                fit="fit" />
      <el-divider>设置</el-divider>
      <el-form label-width="80px"
               label-position="">
        <el-form-item label="夜间模式">
          <el-switch v-model="isDark"
                     style="margin-left: 24px"
                     inline-prompt
                     :active-icon="Moon"
                     :inactive-icon="Sunny" />
        </el-form-item>
      </el-form>
      <!-- 分割线 -->
      <el-divider>菜单</el-divider>
      <el-menu>
        <el-menu-item index="1">
          首页
        </el-menu-item>
        <el-menu-item index="2">
          帖子
        </el-menu-item>
        <el-menu-item index="3">
          热点
        </el-menu-item>
      </el-menu>

    </template>

  </el-drawer>
</template>

<style scoped>
.el-drawer_header {
  margin-bottom: 0px;
}
</style>
