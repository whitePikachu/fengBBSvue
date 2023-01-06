<script setup lang="ts">
import { token } from '../../plugins/pinia'
import service from '../../plugins/axios'
import { Avatar, userdata } from '../../plugins/pinia'
import { ref } from 'vue'
import { API_URL } from '../../config'

const info = ref()
if (token().token) {
  const data = await service({
    url: '/userinfo',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + token().token,
    },
  })
  if (data.data.cod === 200) {
    info.value = data.data.data

    Avatar().URL = info.value.user.avatar
      ? API_URL + info.value.user.avatar
      : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    userdata().username = info.value.username
    userdata().email = info.value.email
    userdata().level = info.value.user.level
    userdata().exp = info.value.user.exp
  }
}
const to_userinfo = () => {
  window.location.href = '/user/userinfo'
}
//隐藏多余字符串
function hideStr(str: string) {
  return str.replace(/^(.{4}).*$/, '$1...')
}
const outlogin = () => {
  token().token = ''
  window.location.href = '/'
}
</script>

<template>
  <el-row>
    <el-space wrap>
      <el-col :span="10">
        <el-avatar :src="Avatar().URL" />
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="24">
            <el-button type="text"
                       @click="to_userinfo">{{hideStr(info.username)}}</el-button>
          </el-col>
          <el-col :span="24">
            <el-button type="text"
                       @click="to_userinfo">个人主页</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-space>
    <el-col :span="24">

      <el-space wrap>
        <div>
          <el-button type="text"
                     @click="to_userinfo">[用户]lv.{{info.user.level}}</el-button>
        </div>
        <div>
          <el-button type="text"
                     @click="to_userinfo">{{info.user.exp}}/max?</el-button>
        </div>
      </el-space>

    </el-col>
    <el-divider></el-divider>
    <el-col :span="8">
      <el-row>
        <el-col :span="24">
          <div style="text-align: center;">枫币</div>
        </el-col>
        <el-col :span="24">
          <div style="text-align: center;">0</div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-row>
        <el-col :span="24">
          <div style="text-align: center;">发帖数</div>
        </el-col>
        <el-col :span="24">
          <div style="text-align: center;">0</div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-row>
        <el-col :span="24">
          <div style="text-align: center;">回帖数</div>
        </el-col>
        <el-col :span="24">
          <div style="text-align: center;">0</div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div style="float:right;">
        <el-button type="text"
                   @click="outlogin">退出</el-button>
      </div>

    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
</style>