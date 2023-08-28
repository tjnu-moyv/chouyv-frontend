<script setup lang="ts">
import {requestStudentRegister} from "@/api/student";
import {reactive} from "vue";
import {setLocalStorage} from "@/utils/local-storage";
import router from "@/router";

let loginForm = reactive({
  username: '',
  password: '',
  checkPwd: ''
})

const studentLoginAction = () => {
  requestStudentRegister(loginForm).then(response => {
    setLocalStorage('token', response.data.token)
    router.push('student')
  }).catch(error => {
    console.log(error)
  })
}

</script>

<template>
  <div id="login-page">
    <div class="login-container">
      <el-form ref="loginData" :model="loginForm">
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
          />
        </el-form-item>
        <el-form-item prop="checkPwd" ref="checkPwd">
          <el-input
              v-model="loginForm.checkPwd"
              type="text"
              maxlength="256"
              minlength="6"
              placeholder="确认密码: "
          />
        </el-form-item>
      </el-form>
      <div class="submit-btn">
        <el-button
            type="primary"
            round
            @click="studentLoginAction"
        >学生注册
        </el-button>
      </div>
      <div class="other">
        <p>已有账号? 点
          <RouterLink to="login">这里登录</RouterLink>
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