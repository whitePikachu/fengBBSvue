

<script setup lang="ts">
import { ref } from 'vue'
import service from '../../plugins/axios'
import { token } from '../../plugins/pinia'
import { ElMessage } from 'element-plus'
import { Camera } from '@element-plus/icons-vue'
import { Avatar } from '../../plugins/pinia'
import { API_URL } from '../../config'
const username = ref('username')
const avatarUrl = ref(Avatar().URL)
//上传成功后的回调
const handleAvatarSuccess = (res: any, file: any) => {
  avatarUrl.value = URL.createObjectURL(file.raw)
  Avatar().URL = avatarUrl.value
}
//上传前的回调
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}
const data = (
  await service.get('userinfo', {
    headers: {
      Authorization: 'Bearer ' + token().token,
    },
  })
).data.data
const form = ref(data)
const sub = async (req: any) => {
  const { QQ, github, signature, nickname } = form.value.user
  console.log(QQ, github, signature, nickname)

  const res = (
    await service({
      method: 'put',
      url: `userinfo/updateuserinfo`,
      headers: {
        Authorization: 'Bearer ' + token().token,
      },
      data: {
        QQ,
        github,
        signature,
        nickname,
      },
    })
  ).data

  if (res.code == 200) {
    ElMessage.success(res.msg)
  } else {
    ElMessage.success(res.msg)
  }
}
</script>

<template>
  <el-card class="putuserinfo_card">
    <template #header>
      修改资料
    </template>
    <div class="center">
      <!-- 上传头像 -->
      <el-tooltip content="上传jpeg格式的图片，大小不超过2M"
                  placement="right">
        <el-upload :action="API_URL+'upload/Avatar'"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload"
                   :headers="{Authorization: 'Bearer ' + token().token}"
                   class="avatar-uploader">
          <el-avatar :size="80"
                     :src="avatarUrl"></el-avatar>
          <el-icon class="avatar-uploader-icon">
            <Camera />
          </el-icon>
        </el-upload>
      </el-tooltip>

    </div>
    <el-form label-position="top"
             :model="form">
      <el-row :gutter="20">
        <el-col :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12">
          <el-form-item label="用户名">
            <el-input disabled
                      v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12">
          <el-form-item label="昵称">
            <el-input v-model="form.user.nickname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12">
          <el-form-item label="QQ">
            <el-input v-model="form.user.QQ"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12">
          <el-form-item label="github">
            <el-input v-model="form.user.github"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                :xl="24">
          <el-form-item label="个性签名">
            <el-input maxlength="30"
                      show-word-limit
                      type="textarea"
                      resize="none"
                      v-model="form.user.signature"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 右对齐修改按钮 -->

    <el-button type="primary"
               class="right"
               @click="sub(form)">修改</el-button>

  </el-card>
</template>

<style scoped>
.putuserinfo_card {
  width: 100%;
  margin-top: 10px;
}
.right {
  /* 去掉清浮动 */
  margin-bottom: 10px;
  float: right;
}
.avatar-uploader-icon {
  position: absolute;
  top: 40;
  left: 40;
  font-size: 28px;
  color: red;
  /* 加粗 */
  font-weight: bold;
}
.avatar-uploader {
  position: relative;
  width: 80px;
}
</style>