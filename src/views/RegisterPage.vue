<template>
  <!-- 注册页面 -->
  <div id="register">
    <h2 class="title">注册</h2>
    <el-form :model="registerForm" ref="registerForm" label-width="80px" class="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <span class="link" @click="goToLogin">已有账号？去登录</span>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 处理注册逻辑
          console.log('注册成功');
        } else {
          console.log('注册失败');
          return false;
        }
      });
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
  