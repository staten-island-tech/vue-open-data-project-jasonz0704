<template>
  <router-link :to="wtrdataPath" class="card">
    <h2>{{ waterlist.year }}</h2>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  waterlist: {
    type: Object,
    required: true,
  },
})

const wtrdataPath = computed(() => {
  return `/wtrdata/${props.waterlist.year}`
})
</script>

<style scoped>
.card {
  width: 28%;
  height: 500px;
  background-color: aliceblue;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  text-transform: uppercase;
}
</style>
