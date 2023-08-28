<script setup lang="ts">
import {requestStudentLogin} from "@/api/student";
import {requestShopLogin} from "@/api/shop";
import {reactive} from "vue";
import {setLocalStorage} from "@/utils/local-storage";
import router from "@/router";
import type {StudentLoginDTO} from "@/api/student/type";
import type {FormRules} from "element-plus";

const loginForm = reactive<StudentLoginDTO>({
  username: '',
  password: ''
})

const rules = reactive<FormRules<StudentLoginDTO>>({
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 6, max: 256, message: '长度请保持在[6, 256]', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 256, message: '长度请保持在[6, 256]', trigger: 'blur'}
  ]
})

const studentLoginAction = () => {
  requestStudentLogin(loginForm).then(response => {
    setLocalStorage('token', response.data.token)
    router.push('student')
  }).catch(error => {
    console.log(error)
  })
}

const shopLoginAction = () => {
  requestShopLogin(loginForm).then(response => {
    setLocalStorage('token', response.data.token)
    router.push('shop')
  }).catch(error => {
    console.log(error)
  })
}

</script>

<template>
  <div id="login-page">
    <div class="login-container">
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" status-icon>
        <el-form-item prop="username" ref="username">
          <el-input
              v-model="loginForm.username"
              type="text"
              maxlength="256"
              minlength="6"
              placeholder="用户账号: "
          />
        </el-form-item>
        <el-form-item prop="password" ref="password">
          <el-input
              v-model="loginForm.password"
              type="text"
              maxlength="256"
              minlength="6"
              placeholder="用户密码: "
              show-password
          />
        </el-form-item>
      </el-form>
      <div class="submit-btn">
        <el-button
            type="primary"
            round
            @click="studentLoginAction"
        >学生登录
        </el-button>
        <el-button
            type="primary"
            round
            @click="shopLoginAction"
        >商铺登录
        </el-button>
      </div>
      <div class="other">
        <p>没有账号? 点
          <RouterLink to="register">这里注册</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;

    .submit-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }

    .other {

      margin-top: 2rem;

      p {

        font-size: 0.8rem;

        a {
          display: inline-block;
          padding: 0 0.5rem;
          text-decoration: none;
          font-weight: 700
        }
      }
    }
  }
}
</style>