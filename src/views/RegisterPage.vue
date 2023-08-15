<template>
  <div class="register">
    <random-tree live-ratio="0.65"/>
    <div class="register-body">
      <h1>注 册</h1>
      <el-form :rules="rules" :model="register" ref="register">
        <el-form-item prop="account">
          <el-input
              v-model="register.account"
              type="text"
              maxlength="256"
              minlength="6"
              placeholder="用户账号: "
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="register.password"
              type="password"
              maxlength="512"
              minlength="8"
              placeholder="用户密码: "
              show-password
          />
        </el-form-item>
        <el-form-item prop="checkPwd">
          <el-input
              v-model="register.checkPwd"
              type="password"
              maxlength="512"
              minlength="8"
              placeholder="确认密码: "
              show-password
              @keydown.enter.native="registerAction"
          />
        </el-form-item>
      </el-form>
      <el-button
          type="primary"
          round
          style="width: 60%;"
          @click="registerAction"
      >注 册
      </el-button>
      <p style="margin-top: 15px;"
      >已有账号? 点
        <router-link to="login"
                     style="text-decoration: none; color:#eee; font-weight: 700"
        >这里登录
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import RandomTree from "@/components/RandomTree.vue";
import request from "@/utils/request";
import {defineComponent} from "vue";
import {Message} from "element-ui";
import {setLocalStorage} from "@/utils/local-storage";
import jwtDecode from "jwt-decode";

export default defineComponent({
  name: "RegisterPage",
  components: {
    RandomTree
  },
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入注册账号"))
      } else {
        if (value.length < 6) {
          callback(new Error("注册账号的长度不能小于6位"))
        } else {
          callback()
        }
      }
    }
    const validatorPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入注册密码"))
      } else {
        if (value.length < 6) {
          callback(new Error("注册密码不能小于6位"))
        }
        callback()
      }
    }
    const validatorCheckPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入注册密码"))
      } else {
        if (value.length < 6) {
          callback(new Error("注册密码不能小于6位"))
        } else if (value !== this.register.password) {
          callback(new Error("两次输入的密码不相同"))
        }
        callback()
      }
    }
    return {
      register: {
        account: "",
        password: "",
        checkPwd: "",
      },
      rules: {
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ],
        password: [
          {validator: validatorPassword, trigger: 'blur'}
        ],
        checkPwd: [
          {validator: validatorCheckPwd, trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    registerAction() {
      let flag = false;
      this.$refs['register'].validate((value) => {
        if (!value) {
          flag = true
        }
      })
      if (flag) return
      request.post(
          '/users/register',
          this.register
      ).then(
          function (response) {
            let token = response.token
            setLocalStorage('token', token)
            let user = jwtDecode(token)
            setLocalStorage('id', user.iss)
            setLocalStorage('username', user.sub)
            Message.success("注册成功 即将跳转登陆页面")
            window.location.href = '/todolist/login'
          }
      ).catch(function (error) {
        console.log(error)
        Message.error("注册发生错误, 请稍后重试")
      })
    }
  }
})
</script>

<style scoped lang="scss">
.register {
  display: flex;
  flex-direction: row;
  text-align: center;

  .register-body {
    width: 400px;
    padding: 64px;

    h1 {
      color: #eee;
    }

    p {
      color: #bbb;
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
  .register {
    padding: 16px;
    flex-direction: column;

    .register-body {
      width: 300px;
      padding: 32px;
    }
  }
}

:deep(.el-input__inner) {
  border-radius: 10px;
}
</style>
