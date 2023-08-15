<template>
  <!-- 登录页面 -->
  <div id="login">
    <h2 class="title">登录</h2>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" show-password
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" class="login-btn">登录</el-button>
        <span class="link" @click="goToRegister">没有账号？去注册</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import {setLocalStorage} from "@/utils/local-storage";
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '密码不能少于6位', trigger: 'blur'},
          {pattern: /[!-z]/, message: '密码包含了其他字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    login() {
      let flag = true // 是否能通过表单验证
      this.$refs.loginForm.validate((valid) => {
        if (!valid) flag = false
      });
      if (!flag) return
      request.post('/students/login', this.loginForm).then(response => {
        let token = response.token
        setLocalStorage('token', token)
        let user = jwtDecode(token)
        setLocalStorage('id', user.iss)
        setLocalStorage('username', user.sub)
      }).catch(error => {
        console.error(error)
      })
    },
    goToRegister() {
      this.$router.push('/register');
    },
  }
}
</script>

<style scoped>
#login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  margin-top: 0;
}

.title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form {
  width: 400px;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.link {
  color: #409EFF;
  cursor: pointer;
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  margin-top: 20px;
}

.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
}

/* 修改element组件样式 */
.el-input {
  width: 100%;
  border-radius: 4px;
}

.el-button {
  width: 100%;
  border-radius: 4px;
}
</style>
