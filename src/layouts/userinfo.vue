

<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, userdata, token } from '../plugins/pinia'
const avatarimg = 'https://jsonplaceholder.typicode.com/posts/'
const gotoPlate = (id: number) => {
  switch (id) {
    case 1:
      console.log('修改资料')
      window.location.href = `/user/userinfo`
      break
    case 2:
      console.log('我的帖子')
      window.location.href = `/user/postlist/0?type=user`
      break
    case 3:
      console.log('账户安全')
      break
  }
}
const exp = ref(`经验值:${userdata().exp}/max`)
const logout = () => {
  const outlogin = () => {
    token().token = ''
    window.location.href = '/'
  }
}
</script>

<template>
  <el-card class="usercard">
    <el-row :gutter="10">
      <el-col :span="5">
        <div class="center">
          <el-avatar :size="80"
                     :src="Avatar().URL" />
        </div>
      </el-col>
      <el-col :span="7">
        <!-- 用户名 -->
        <div class="username">
          {{ userdata().username?userdata().username:"获取失败" }}
          <el-tooltip class="item"
                      effect="dark"
                      :content="exp"
                      placement="right">
            <el-tag type="warning">lv.{{ userdata().level }}</el-tag>
          </el-tooltip>
        </div>
        <div class="userel">
          {{ userdata().email?userdata().email:"获取失败" }}
        </div>
      </el-col>

    </el-row>
    <el-button type="danger"
               size="mini"
               class="logout"
               @click="logout">退出登陆</el-button>
  </el-card>
  <br />
  <el-row :gutter="10">
    <el-col :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            :xl="8">
      <el-card style="margin: 10px 0px;">
        <el-menu class="hidden-xs-only hidden-sm-only"
                 default-active="1"
                 router="#default">
          <el-menu-item index="/user/userinfo">修改资料</el-menu-item>
          <el-menu-item index="/user/postlist/0?type=user">我的帖子</el-menu-item>
          <el-menu-item index="/user/accountsecurity">账户安全</el-menu-item>
        </el-menu>
        <el-menu mode="horizontal"
                 class="hidden-md-and-up"
                 default-active="1"
                 router="#default">
          <el-menu-item index="/user/userinfo">修改资料</el-menu-item>
          <el-menu-item index="/user/postlist/0?type=user">我的帖子</el-menu-item>
          <el-menu-item index="/user/accountsecurity">账户安全</el-menu-item>
        </el-menu>
      </el-card>

    </el-col>
    <el-col :xs="24"
            :sm="24"
            :md="16"
            :lg="16"
            :xl="16">
      <!--  -->
      <div style="min-height: 300px;">
        <Suspense>
          <template #default>
            <router-view></router-view>
          </template>
          <template #fallback>
            <el-loading></el-loading>
          </template>
        </Suspense>
      </div>
    </el-col>
  </el-row>

</template>

<style scoped >
/* 居中 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.usercard {
  position: relative;
  /* 背景 */
}
.username {
  margin: 10px 0;
  font-size: 20px;
}
.userel {
  font-size: 15px;
}
.logout {
  position: absolute;
  right: 10px;
  top: 50px;
}
</style>