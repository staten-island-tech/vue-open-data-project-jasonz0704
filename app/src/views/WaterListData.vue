<template>
  <div class="data" v-for="item in waterlist" :key="item.year">
    <h2>Year: {{ item.year }}</h2>
    <h3>Population of NYC : {{ item.new_york_city_population }}</h3>
    <h3>
      Water Consumption Per Day (millions of gallons):
      {{ item.nyc_consumption_million_gallons_per_day }}
    </h3>
    <h3>Gallons Per Person Per Day : {{ item.per_capita_gallons_per_person_per_day }}</h3>
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

<style scoped>
h2 {
  font-size: 50px;
}
.data {
  text-align: center;
  margin: 40px;
}
</style>
