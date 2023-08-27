<script setup lang="ts">

import {ref} from "vue";

let reloadKey = ref(new Date().getTime());

const reloadFunction = () => {
  reloadKey.value = new Date().getTime()
}

</script>

<template>
  <div class="click" @click="reloadFunction">
    <slot :key="reloadKey"/>
  </div>
</template>

<style scoped>

</style>