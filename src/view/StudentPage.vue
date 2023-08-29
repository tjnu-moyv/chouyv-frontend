<script setup lang="ts">
import {onMounted, ref} from 'vue';
import type {ShopInfo} from "@/api/module/ShopInfo";
import type {ShopProducts} from "@/api/module/ShopProducts";
import {requestAllShops} from "@/api/shop";
import router from "@/router";

// 点击某元素之外的地方触发事件

interface ShopViewModule extends ShopInfo {
  shopProducts: ShopProducts[]
}

// https://element-plus.org/zh-CN/component/table.html#%E7%AD%9B%E9%80%89
const data = ref<ShopViewModule[]>([]);

let showTheShop = ref(false)

const shopClick = (row) => {
  showTheShop.value = true
  router.push('/student/shop/' + row.id)
}

const closeTheShop = () => {
  console.log('outside')
}

// 在页面加载时从后台获取商铺和商品列表
onMounted(() => {
  // 调用获取商铺和商品列表的函数
  requestAllShops().then(response => {
    console.log(response)
    for (let i = 0; i < response.data.shops.length; i++) {
      let shopInfo = response.data.shops[i];
      data.value.push({
        id: shopInfo.id,
        nickname: shopInfo.nickname,
        phone: shopInfo.phone,
        address: shopInfo.address,
        shopProducts: []
      })
    }
  }).catch(error => {
    console.log(error)
  })
});
</script>

<template>
  <div id="student">
    <RouterView/>
    <el-table :data="data" @cell-click="shopClick" v-clickoutside="closeTheShop">
      <el-table-column prop="address"/>
      <el-table-column prop="nickname"/>
      <el-table-column prop="phone"/>
    </el-table>
  </div>
</template>

<style scoped>
#student {
  width: 60%;
  height: 80vh;
}
</style>
