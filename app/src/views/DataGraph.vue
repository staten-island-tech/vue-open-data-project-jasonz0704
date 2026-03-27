<template>
  <router-link to="/">
    <button>Click This To Go Back</button>
  </router-link>
  <div class="dashboard">
    <h1>NYC Water Consumption Over Time</h1>
    <p class="subtitle">Data sourced from NYC Open Data</p>

    <div v-if="loading" class="loading">Loading data...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="charts-wrapper">
      <!-- Chart 1: Total Consumption Bar Chart -->
      <div class="chart-card">
        <h2>Total Water Consumption (Million Gallons/Day)</h2>
        <canvas ref="barChartRef"></canvas>
      </div>

      <!-- Chart 2: Per Capita Line Chart -->
      <div class="chart-card">
        <h2>Per Capita Usage (Gallons/Person/Day)</h2>
        <canvas ref="lineChartRef"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const API_URL = 'https://data.cityofnewyork.us/resource/ia2d-e54m.json'

const barChartRef = ref(null)
const lineChartRef = ref(null)
const loading = ref(true)
const error = ref(null)

let barChartInstance = null
let lineChartInstance = null

// Dynamically load Chart.js from CDN
function loadChartJS() {
  return new Promise((resolve, reject) => {
    if (window.Chart) return resolve(window.Chart)
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
    script.onload = () => resolve(window.Chart)
    script.onerror = () => reject(new Error('Failed to load Chart.js'))
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  try {
    const [Chart, response] = await Promise.all([loadChartJS(), fetch(API_URL)])

    if (!response.ok) throw new Error('Failed to fetch data')
    const raw = await response.json()

    // Sort ascending by year
    const data = raw
      .filter((d) => d.per_capita_gallons_per_person_per_day)
      .sort((a, b) => Number(a.year) - Number(b.year))

    const years = data.map((d) => d.year)
    const consumption = data.map((d) => parseFloat(d.nyc_consumption_million_gallons_per_day))
    const perCapita = data.map((d) => parseFloat(d.per_capita_gallons_per_person_per_day))

    loading.value = false

    // Wait for Vue to render the canvas elements before initializing charts
    await nextTick()

    if (!barChartRef.value || !lineChartRef.value) {
      throw new Error('Chart canvas elements not found in the DOM.')
    }

    // --- Bar Chart: Total Consumption ---
    barChartInstance = new Chart(barChartRef.value, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Million Gallons/Day',
            data: consumption,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            borderRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y.toFixed(1)} MGD`,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 45,
              autoSkip: true,
              maxTicksLimit: 20,
            },
          },
          y: {
            title: { display: true, text: 'Million Gallons/Day' },
            beginAtZero: false,
          },
        },
      },
    })

    // --- Line Chart: Per Capita Usage ---
    lineChartInstance = new Chart(lineChartRef.value, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Gallons/Person/Day',
            data: perCapita,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.15)',
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y.toFixed(2)} gal/person/day`,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 45,
              autoSkip: true,
              maxTicksLimit: 20,
            },
          },
          y: {
            title: { display: true, text: 'Gallons/Person/Day' },
            beginAtZero: false,
          },
        },
      },
    })
  } catch (err) {
    error.value = err.message
    loading.value = false
  }
})

onBeforeUnmount(() => {
  barChartInstance?.destroy()
  lineChartInstance?.destroy()
})
</script>

<style scoped>
.dashboard {
  font-family: 'Segoe UI', sans-serif;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 1.8rem;
  color: #1a202c;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #718096;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #718096;
}

.error {
  color: #e53e3e;
}

.charts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.chart-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.chart-card h2 {
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 1rem;
}
</style>
