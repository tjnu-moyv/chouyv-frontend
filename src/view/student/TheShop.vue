<script setup lang="ts">
import {onMounted} from "vue";

onMounted(() => {
  console.log('click')
})
</script>

<template>
  <div id="student-shop">
    student-shop: {{ $route.params.id }}
  </div>
</template>

<style scoped>

</style>