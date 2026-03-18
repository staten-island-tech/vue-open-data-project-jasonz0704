<template>
  <div>
    <h1>here is the data for H2O consumed by the yorkers</h1>
    <DataCard v-for="water in waterconsumption" :key="water.name" :water="water"></DataCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataCard from '@/components/DataCard.vue'

const APIURL = 'https://data.cityofnewyork.us/resource/ia2d-e54m.json'

const waterconsumption = ref([])

async function getData(APIURL) {
  try {
    const response = await fetch(APIURL)
    const data = await response.json()

    waterconsumption = data
  } catch (error) {
    console.log(error)
  }
}
getData(APIURL)
</script>

<style scoped></style>
