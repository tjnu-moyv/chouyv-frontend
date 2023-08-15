<template>
  <!-- 学生主页面 -->
  <div id="student">
    <!-- 最上方主选项，选择点餐还是配送员接单的选项 -->
    <div class="button-wrapper">
      <el-button type="primary" round>点餐</el-button>
      <el-button type="primary" round>配送员</el-button>
    </div>
    <router-view />
  </div>
</template>

<script>
</script>

<style scoped>
  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }
</style>
