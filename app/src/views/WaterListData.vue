<template>
  <div class="page">
    <router-link to="/" class="back-btn">← Back to All Years</router-link>
 
    <div class="detail" v-for="item in waterlist" :key="item.year">
      <div class="year-hero">
        <p class="eyebrow">NYC Water Data</p>
        <h1>{{ item.year }}</h1>
      </div>
 
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-icon">🏙️</span>
          <span class="stat-label">Population of NYC</span>
          <span class="stat-value">{{ item.new_york_city_population }}</span>
        </div>
 
        <div class="stat-card featured">
          <span class="stat-icon">💧</span>
          <span class="stat-label">Water Consumption Per Day (millions of gallons)</span>
          <span class="stat-value">{{ item.nyc_consumption_million_gallons_per_day }}</span>
        </div>
 
        <div class="stat-card">
          <span class="stat-icon">🚿</span>
          <span class="stat-label">Gallons Per Person Per Day</span>
          <span class="stat-value">{{ item.per_capita_gallons_per_person_per_day }}</span>
        </div>
      </div>
    </div>
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
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
 
.page {
  min-height: 100vh;
  background: #f0f6fc;
  font-family: 'DM Sans', sans-serif;
  padding: 40px 24px 80px;
}
 
/* ── BACK BUTTON ── */
.back-btn {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1a78c2;
  text-decoration: none;
  margin-bottom: 48px;
  transition: color 0.2s;
}
 
.back-btn:hover {
  color: #00d4ff;
}
 
/* ── YEAR HERO ── */
.detail {
  max-width: 860px;
  margin: 0 auto;
}
 
.year-hero {
  text-align: center;
  margin-bottom: 56px;
}
 
.eyebrow {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #00d4ff;
  margin: 0 0 8px;
}
 
h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(6rem, 18vw, 12rem);
  line-height: 1;
  color: #0a1628;
  margin: 0;
  letter-spacing: 0.04em;
}
 
/* ── STATS GRID ── */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
 
@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
 
.stat-card {
  background: #ffffff;
  border: 1px solid #d6e8f7;
  border-top: 4px solid #d6e8f7;
  border-radius: 4px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 8px rgba(10, 22, 40, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}
 
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(10, 22, 40, 0.1);
}
 
.stat-card.featured {
  border-top-color: #00d4ff;
  background: #0a1628;
  color: #f0f8ff;
}
 
.stat-icon {
  font-size: 1.6rem;
}
 
.stat-label {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a9abf;
  line-height: 1.4;
}
 
.stat-card.featured .stat-label {
  color: #56b4f5;
}
 
.stat-value {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.6rem;
  letter-spacing: 0.04em;
  color: #0d3b6e;
  line-height: 1;
}
 
.stat-card.featured .stat-value {
  color: #00d4ff;
}
</style>