<template>
  <div class="login">
    <random-tree live-ratio="0.6"/>
    <div class="login-body">
      <h1>登 录</h1>
      <p>请使用用户中心账户登录</p>
      <el-form :rules="rules" ref="login" :model="login">
        <el-form-item prop="account">
          <el-input
              v-model="login.account"
              type="text"
              maxlength="256"
              minlength="6"
              placeholder="用户账号: "
              autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="login.password"
              type="password"
              maxlength="512"
              minlength="8"
              placeholder="用户密码: "
              autocomplete="off"
              show-password
              @keydown.enter.native="loginAction"
          />
        </el-form-item>
      </el-form>
      <el-button
          type="primary"
          round
          style="width: 60%;"
          @click="loginAction"
      >登 录
      </el-button>
      <p>没有账号? 点
        <router-link to="register">这里注册</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import RandomTree from "@/components/RandomTree.vue";
import request from "@/utils/request";
import {Message} from "element-ui";
import {setLocalStorage} from "@/utils/local-storage";
import {defineComponent} from "vue";

export default defineComponent({
  name: "LoginPage",
  components: {RandomTree},
  data() {
    const account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入登录账号"))
      } else {
        if (value.length < 6) {
          callback(new Error("登录账号的长度不能小于6位"))
        } else if (value[0] >= '0' && value[0] <= '9') {
          callback(new Error("登录账号不能以数字开头"))
        } else {
          callback()
        }
      }
    }
    const password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入登录密码"))
      } else {
        if (value.length < 8) {
          callback(new Error("登录密码不能小于8位"))
        }
        callback()
      }
    }
    return {
      login: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {validator: account, trigger: 'blur'}
        ],
        password: [
          {validator: password, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    loginAction() {
      let flag = false;
      this.$refs['login'].validate((value) => {
        if (!value) {
          flag = true
        }
      })
      if (flag) return
      request.post(
          '/users/login',
          this.login
      ).then(
          function (res) {
            if (res.data.code > 0) {
              console.log(res)
              Message.error("登录错误: " + res.data.message + ' ' + res.data.description)
              return
            }
            setLocalStorage('token', res.data.data)
            window.location.href = '/todolist'
          }
      ).catch(error => {
        console.log(error)
        Message.error("登录发生错误, 请稍后重试")
      })
    }
  }
})
</script>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: row;
  text-align: center;

  .login-body {
    width: 400px;
    padding: 64px;

    h1 {
      color: #eee;
    }

    p {
      color: #bbb;
      margin-top: 15px;

      a {
        text-decoration: none;
        color: #eee;
        font-weight: 700
      }
    }

    .el-input {
      margin-top: 8%;
    }

    .el-button {
      margin-top: 10%;
    }

  }
}

@media screen and (max-width: 768px) {
  .login {
    padding: 16px;
    flex-direction: column;

    .login-body {
      width: 300px;
      padding: 32px;
    }

  }
}

:deep(.el-input__inner) {
  border-radius: 10px;
}
</style>
