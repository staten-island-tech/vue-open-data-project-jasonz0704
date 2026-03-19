<template>
  <h1>here is the data for H2O consumed by the yorkers</h1>
  <div class="container">
    <DataCard v-for="water in waterconsumption" :key="water.name" :waterconsumption="water" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataCard from '@/components/DataCard.vue'

const waterconsumption = ref([])
async function getData() {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/ia2d-e54m.json?limit=150&offset=0',
    )
    const data = await response.json()

    waterconsumption.value = data.year
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getData()
})

console.log(waterconsumption)
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
