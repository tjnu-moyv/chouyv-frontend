<script setup lang="ts">
import RandomTree from "@/components/RandomTree.vue";
import dayjs from "dayjs";
import {ref} from "vue";

let randomTreeKeyToClickReload = ref(dayjs().unix())

const reloadRandomTree = () => {
  randomTreeKeyToClickReload.value += 1
}

</script>

<template>
  <RandomTree :key="randomTreeKeyToClickReload" @click="reloadRandomTree"/>
</template>
