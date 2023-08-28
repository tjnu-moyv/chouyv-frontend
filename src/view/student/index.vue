<template>
  <div>
    <h1>选餐页面</h1>
    <div>
      <label for="shop-filter">筛选商铺：</label>
      <input type="text" id="shop-filter" v-model="shopFilter" @input="filterShops"/>
    </div>
    <div>
      <label for="item-filter">搜索商品：</label>
      <input type="text" id="item-filter" v-model="itemFilter" @input="filterItems"/>
    </div>
    <div>
      <h2>商铺列表</h2>
      <ul>
        <li v-for="shop in filteredShops" :key="shop.id">{{ shop.name }}</li>
      </ul>
    </div>
    <div>
      <h2>商品列表</h2>
      <ul>
        <li v-for="item in filteredItems" :key="item.id">{{ item.name }} - {{ item.price }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';

interface Shop {
  id: number;
  name: string;
  location: string;
  // 其他属性...
}

interface Item {
  id: number;
  name: string;
  price: number;
  shopId: number;
  // 其他属性...
}

const shopList: Shop[] = []; // 从后台获取的商铺列表
const itemList: Item[] = []; // 从后台获取的商品列表

const shopFilter = ref('');
const itemFilter = ref('');

const filteredShops = computed(() => {
  return shopList.filter(shop => shop.name.includes(shopFilter.value));
});

const filteredItems = computed(() => {
  return itemList
      .filter(item => item.name.includes(itemFilter.value))
      .filter(item => filteredShops.value.some(shop => shop.id === item.shopId));
});

function filterShops() {
  // 更新商铺筛选逻辑
}

function filterItems() {
  // 更新商品筛选逻辑
}

// 在页面加载时从后台获取商铺和商品列表
onMounted(() => {
  // 调用获取商铺和商品列表的函数
});
</script>

<style scoped>
/* 样式 */
</style>
