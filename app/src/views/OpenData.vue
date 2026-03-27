<template>
  <div class="page">
    <header class="hero">
      <div class="hero-bg">
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
      </div>
      <div class="hero-content">
        <p class="eyebrow">NYC Open Data</p>
        <h1>H2O Consumed<br /><span class="accent">by New Yorkers</span></h1>
        <router-link to="/datagraph">
          <button class="cta-btn">View Data Graphs →</button>
        </router-link>
      </div>
    </header>

    <main>
      <p class="section-label">All Records</p>
      <div class="container">
        <DataCard v-for="water in waterlist" :key="water.year" :waterlist="water" />
      </div>
    </main>
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
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --blue-deep: #0a1628;
  --blue-mid: #0d3b6e;
  --blue-bright: #1a78c2;
  --blue-light: #56b4f5;
  --cyan: #00d4ff;
  --white: #f0f8ff;
  --card-bg: #ffffff;
}

.page {
  min-height: 100vh;
  background: #f0f6fc;
  font-family: 'DM Sans', sans-serif;
}

/* ── HERO ── */
.hero {
  position: relative;
  background: var(--blue-deep);
  overflow: hidden;
  padding: 80px 40px 120px;
  text-align: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.wave {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 200%;
  height: 80px;
  background-repeat: repeat-x;
}

.wave1 {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 80'%3E%3Cpath fill='%230d3b6e' fill-opacity='0.6' d='M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z'/%3E%3C/svg%3E");
  animation: wave-move 8s linear infinite;
}

.wave2 {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 80'%3E%3Cpath fill='%23f0f6fc' d='M0,60 C240,20 480,70 720,50 C960,30 1200,70 1440,55 L1440,80 L0,80 Z'/%3E%3C/svg%3E");
  animation: wave-move 12s linear infinite reverse;
}

@keyframes wave-move {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.eyebrow {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cyan);
  margin: 0 0 12px;
}

h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3.5rem, 8vw, 7rem);
  line-height: 1;
  color: var(--white);
  margin: 0 0 36px;
  letter-spacing: 0.02em;
}

.accent {
  color: var(--cyan);
}

.cta-btn {
  background: transparent;
  border: 2px solid var(--cyan);
  color: var(--cyan);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 36px;
  cursor: pointer;
  transition:
    background 0.25s,
    color 0.25s;
}

.cta-btn:hover {
  background: var(--cyan);
  color: var(--blue-deep);
}

/* ── MAIN ── */
main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #7a9abf;
  margin-bottom: 24px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
