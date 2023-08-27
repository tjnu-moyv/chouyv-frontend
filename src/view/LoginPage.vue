<script setup lang="ts">
import ReloadContainer from "@/components/ReloadContainer.vue";
import RandomTree from "@/components/RandomTree.vue";
import {ref} from "vue";
import type {StudentLoginDTO} from "@/api/student/type";
import type {ShopLoginDTO} from "@/api/shop/type";
import {requestStudentLogin} from "@/api/student";
import {requestShopLogin} from "@/api/shop";

let login = ref<StudentLoginDTO | ShopLoginDTO>({
  username: '',
  password: ''
})

console.log(login)

const studentLoginAction = () => {
  const response = requestStudentLogin(login.value as StudentLoginDTO)
  console.log(response)
}

const shopLoginAction = () => {
  const response = requestShopLogin(login.value as ShopLoginDTO)
  console.log(response)
}

</script>

<template>
  <div id="login-page">
    <ReloadContainer>
      <RandomTree/>
    </ReloadContainer>
    <div class="login-container">
      <el-form ref="login">
        <el-form-item prop="username">
          <el-input
              v-model="login.username"
              type="text"
              maxlength="256"
              minlength="6"
              placeholder="用户账号: "
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="login.password"
              type="text"
              maxlength="256"
              minlength="6"
              placeholder="用户账号: "
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

      margin-top: 1rem;

      p {

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