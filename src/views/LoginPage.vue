<template>
  <!-- 登录页面 -->
  <div id="login">
    <h2 class="title">登录</h2>
    <el-form :model="loginForm" ref="loginForm" label-width="80px" class="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <span class="link" @click="goToRegister">没有账号？去注册</span>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 处理登录逻辑
          console.log('登录成功');
        } else {
          console.log('登录失败');
          return false;
        }
      });
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
}
</script>
  
<style scoped>
#login {
  display: flex;
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

/* 修改element组件样式 */
.el-input {
  width: 100%;
}

.el-button {
  width: 100%;
}
</style>