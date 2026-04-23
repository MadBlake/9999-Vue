<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const hores   = ref(0)
const minuts  = ref(0)
const segons  = ref(0)

let interval: ReturnType<typeof setInterval> | null = null

function actualitzar() {
  const ara = new Date()
  hores.value  = ara.getHours()
  minuts.value = ara.getMinutes()
  segons.value = ara.getSeconds()
}

function graus(valor: number, max: number, offset = 0) {
  return (valor / max) * 360 + offset
}

onMounted(() => { actualitzar(); interval = setInterval(actualitzar, 1000) })
onUnmounted(() => { if (interval) clearInterval(interval) })
</script>

<template>
  <div class="page">
    <h1>Exercici 19 — Rellotge en temps real</h1>
    <p class="subtitol">onMounted(), onUnmounted(), setInterval, ref() numèric</p>
    <div class="card" style="text-align:center">
      <div class="rellotge">
        <svg viewBox="0 0 100 100" class="esfera">
          <circle cx="50" cy="50" r="48" fill="#1a1a2e" />
          <circle cx="50" cy="50" r="44" fill="#22253a" />
          <text v-for="n in 12" :key="n"
            :x="50 + 36 * Math.sin((n / 12) * 2 * Math.PI)"
            :y="54 - 36 * Math.cos((n / 12) * 2 * Math.PI)"
            text-anchor="middle" font-size="5" fill="#aaa" font-family="Arial">{{ n }}</text>
          <!-- Busca hores -->
          <line x1="50" y1="50"
            :x2="50 + 22 * Math.sin((graus(hores % 12, 12) + graus(minuts, 60) / 12) * Math.PI / 180)"
            :y2="50 - 22 * Math.cos((graus(hores % 12, 12) + graus(minuts, 60) / 12) * Math.PI / 180)"
            stroke="white" stroke-width="3" stroke-linecap="round" />
          <!-- Busca minuts -->
          <line x1="50" y1="50"
            :x2="50 + 30 * Math.sin(graus(minuts, 60) * Math.PI / 180)"
            :y2="50 - 30 * Math.cos(graus(minuts, 60) * Math.PI / 180)"
            stroke="#42b883" stroke-width="2" stroke-linecap="round" />
          <!-- Busca segons -->
          <line x1="50" y1="50"
            :x2="50 + 34 * Math.sin(graus(segons, 60) * Math.PI / 180)"
            :y2="50 - 34 * Math.cos(graus(segons, 60) * Math.PI / 180)"
            stroke="#e74c3c" stroke-width="1" stroke-linecap="round" />
          <circle cx="50" cy="50" r="2.5" fill="white" />
        </svg>
      </div>
      <p class="digital">
        {{ String(hores).padStart(2,'0') }}:{{ String(minuts).padStart(2,'0') }}:{{ String(segons).padStart(2,'0') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.rellotge { display: inline-block; }
.esfera { width: 200px; height: 200px; }
.digital { font-size: 2rem; font-weight: 700; font-family: monospace; color: #1a1a2e; margin-top: 12px; }
</style>
