<template>
  <router-link :to="wtrdataPath" class="card">
    <div class="card-year">{{ waterlist.year }}</div>
    <div class="divider"></div>
    <div class="card-stats">
      <div class="stat">
        <span class="stat-label">Population of NYC</span>
        <span class="stat-value">{{ waterlist.new_york_city_population }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Water Consumption Per Day (millions of gallons)</span>
        <span class="stat-value">{{ waterlist.nyc_consumption_million_gallons_per_day }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Gallons Per Person Per Day</span>
        <span class="stat-value">{{ waterlist.per_capita_gallons_per_person_per_day }}</span>
      </div>
    </div>
    <div class="card-arrow">→</div>
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
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

.card {
  width: 340px;
  background: #ffffff;
  border: 1px solid #d6e8f7;
  border-top: 4px solid #00d4ff;
  border-radius: 4px;
  padding: 24px 28px 20px;
  text-decoration: none;
  color: #0a1628;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-top-color 0.2s ease;
  box-shadow: 0 2px 8px rgba(10, 22, 40, 0.06);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(10, 22, 40, 0.12);
  border-top-color: #1a78c2;
}

.card-year {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  line-height: 1;
  color: #0d3b6e;
  letter-spacing: 0.04em;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, #00d4ff44, transparent);
}

.card-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-label {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #7a9abf;
}

.stat-value {
  font-size: 1.05rem;
  font-weight: 400;
  color: #0a1628;
}

.card-arrow {
  align-self: flex-end;
  font-size: 1rem;
  color: #00d4ff;
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>
