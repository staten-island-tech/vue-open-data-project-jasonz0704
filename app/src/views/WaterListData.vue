<template>
  <div>
    <h2>{{ waterlist.year }}</h2>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const waterlist = ref({})
async function getData(year) {
  const response = await fetch(`https://data.cityofnewyork.us/resource/ia2d-e54m.json?year=${year}`)
  const data = await response.json()
  waterlist.value = data
}

onMounted(() => {
  getData(route.params.year)
})
watch(
  () => route.params.year,
  function (year) {
    getData(year)
  },
)
</script>

<style scoped></style>
