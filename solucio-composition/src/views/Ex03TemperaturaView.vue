<script setup lang="ts">
import { ref, computed } from 'vue'

const celsius = ref(20)
const fahrenheit = computed(() => ((celsius.value * 9) / 5 + 32).toFixed(1))
const kelvin = computed(() => (celsius.value + 273.15).toFixed(2))
</script>

<template>
  <div class="page">
    <h1>Exercici 03 — Conversió de temperatura</h1>
    <p class="subtitol">ref(), computed() derivat — v-model.number</p>
    <div class="card">
      <label>
        Celsius (°C)
        <input v-model.number="celsius" type="number" step="0.5" style="width:140px" />
      </label>
    </div>
    <div class="card resultats">
      <div class="resultat">
        <span class="label">Fahrenheit</span>
        <span class="valor">{{ fahrenheit }} °F</span>
      </div>
      <div class="resultat">
        <span class="label">Kelvin</span>
        <span class="valor">{{ kelvin }} K</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
label { display: flex; flex-direction: column; gap: 6px; font-weight: 600; }
.resultats { display: flex; gap: 24px; flex-wrap: wrap; }
.resultat { display: flex; flex-direction: column; gap: 4px; }
.label { font-size: 0.82rem; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
.valor { font-size: 1.8rem; font-weight: 700; color: #2980b9; }
</style>
