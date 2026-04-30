<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface ClimaData {
  temperature: number
  weather: string
}

const temperatura = ref(0)
const clima = ref('Desconegut')
const carregant = ref(false)
const error = ref('')
const pausat = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null
const ultimaActualitzacio = ref('')

const latitud = 41.3851  // Barcelona
const longitud = 2.1734

async function carregarClima() {
  if (pausat.value) return
  
  carregant.value = true
  error.value = ''
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,weather_code`
    )
    if (!res.ok) throw new Error('Error al carregar el clima')
    const data = await res.json()
    const current = data.current
    temperatura.value = current.temperature_2m
    
    // Interpretar el codi de clima
    const weatherCode = current.weather_code
    clima.value = interpretarClima(weatherCode)
    
    // Guardar hora d'actualització
    const ara = new Date()
    ultimaActualitzacio.value = ara.toLocaleTimeString('ca-ES')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconegut'
  } finally {
    carregant.value = false
  }
}

function interpretarClima(code: number): string {
  if (code === 0) return 'Clar'
  if (code === 1 || code === 2) return 'Parcialment Nublat'
  if (code === 3) return 'Nublat'
  if (code === 45 || code === 48) return 'Boira'
  if (code >= 51 && code <= 67) return 'Pluja'
  if (code >= 71 && code <= 77) return 'Neu'
  if (code >= 80 && code <= 82) return 'Ruixats'
  if (code >= 85 && code <= 86) return 'Neu'
  if (code >= 95 && code <= 99) return 'Tempesta'
  return 'Desconegut'
}

onMounted(() => {
  carregarClima()
  intervalId = setInterval(() => {
    carregarClima()
  }, 60000) // Actualitzar cada 60 segons
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

function togglePausa() {
  pausat.value = !pausat.value
}

const emojiClima = computed(() => {
  if (clima.value.includes('Clar')) return '☀️'
  if (clima.value.includes('Nublat') || clima.value.includes('Boira')) return '☁️'
  if (clima.value.includes('Pluja') || clima.value.includes('Ruixats')) return '🌧️'
  if (clima.value.includes('Neu')) return '❄️'
  if (clima.value.includes('Tempesta')) return '⛈️'
  return '🌤️'
})
</script>

<template>
  <div class="page">
    <h1>Exercici 34 — Clima en temps real</h1>
    <p class="subtitol">onMounted/onUnmounted, setInterval, API OpenMeteo</p>

    <div class="card clima-card">
      <div v-if="carregant" class="loading">⏳ Actualitzant...</div>
      <div v-else-if="error" class="error">❌ {{ error }}</div>
      <div v-else class="clima-content">
        <div class="clima-icon">{{ emojiClima }}</div>
        <div class="clima-info">
          <p class="temperatura">{{ temperatura }}°C</p>
          <p class="descripcio">{{ clima }}</p>
          <p class="ubicacio">📍 Barcelona (41.39°N, 2.17°E)</p>
        </div>

        <div class="controls">
          <button @click="carregarClima" :disabled="carregant">Actualitzar ara</button>
          <button @click="togglePausa" :class="{ pausat: pausat }">
            {{ pausat ? '▶ Reprendre' : '⏸ Pausar' }}
          </button>
        </div>

        <p v-if="ultimaActualitzacio" class="hora-actual">
          Última actualització: {{ ultimaActualitzacio }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading, .error { padding: 20px; text-align: center; }
.error { color: #e74c3c; }
.clima-card { max-width: 400px; margin: 20px auto; }
.clima-content { text-align: center; }
.clima-icon { font-size: 5rem; margin-bottom: 16px; }
.temperatura { font-size: 3rem; font-weight: bold; color: #42b883; margin: 0 0 4px 0; }
.descripcio { font-size: 1.3rem; color: #666; margin: 0 0 8px 0; }
.ubicacio { color: #999; font-size: 0.9rem; margin: 0; }
.clima-info { margin-bottom: 20px; }

.controls { display: flex; gap: 8px; justify-content: center; margin: 16px 0; }
.controls button { padding: 10px 16px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.controls button:hover:not(:disabled) { background: #369970; }
.controls button:disabled { background: #ccc; cursor: not-allowed; }
.controls button.pausat { background: #f39c12; }

.hora-actual { color: #999; font-size: 0.85rem; margin-top: 12px; }
</style>
