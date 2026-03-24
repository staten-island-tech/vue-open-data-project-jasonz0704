<template>
  <router-link :to="wtrdataPath" class="card">
    <h2>{{ waterlist.year }}</h2>
    <h3>Population of NYC : {{ waterlist.new_york_city_population }}</h3>
    <h3>
      Water Consumption Per Day (millions of gallons):
      {{ waterlist.nyc_consumption_million_gallons_per_day }}
    </h3>
    <h3>Gallons Per Person Per Day : {{ waterlist.per_capita_gallons_per_person_per_day }}</h3>
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
  width: 475px;
  height: 300px;
  background-color: aliceblue;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  text-transform: uppercase;
  text-decoration: none;
  color: black;
}

h2 {
  font-size: 40px;
  margin: 20px;
}

h3 {
  font-size: 20px;
  text-align: center;
  margin: 15px;
}
</style>
