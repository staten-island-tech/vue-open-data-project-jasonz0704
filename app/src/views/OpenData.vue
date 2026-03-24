<template>
  <h1>Here is the data for H2O consumed by the yorkers</h1>
  <div class="container">
    <DataCard v-for="water in waterlist" :key="water.year" :waterlist="water" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataCard from '@/components/DataCard.vue'

const waterlist = ref([])
async function getData() {
  try {
    const response = await fetch(`https://data.cityofnewyork.us/resource/ia2d-e54m.json`)
    const data = await response.json()

    waterlist.value = data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getData()
})
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

h1 {
  text-align: center;
}
</style>
