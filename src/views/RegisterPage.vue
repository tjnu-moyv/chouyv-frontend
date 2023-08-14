<template>
  <!-- 注册页面 -->
  <div id="register">
    <h2 class="title">注册</h2>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px" class="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" autocomplete="off" show-password
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="registerForm.checkPwd" autocomplete="off" show-password
                  placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <span class="link" @click="goToLogin">已有账号？去登录</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        checkPwd: ''
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
        checkPwd: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.registerForm.password) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    register() {
      let flag = true // 是否能通过表单验证
      this.$refs.registerForm.validate((valid) => {
        if (!valid) flag = false
      });
      if (!flag) return
      request.post('/students/register', this.registerForm).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
#register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.form {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.link {
  color: #409EFF;
  cursor: pointer;
}
</style>
