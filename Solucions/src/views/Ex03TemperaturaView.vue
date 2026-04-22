<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Ex03TemperaturaView',
  data() {
    return {
      celsius: 0,
    }
  },
  computed: {
    // C → F: multiplicar per 9/5 i sumar 32
    fahrenheit(): string {
      return (this.celsius * 9 / 5 + 32).toFixed(2)
    },
    // C → K: sumar 273.15
    kelvin(): string {
      return (this.celsius + 273.15).toFixed(2)
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 3 — Conversió de temperatura</h1>
    <p class="subtitol">v-model.number, computed</p>

    <div class="card">
      <label class="lbl">Temperatura en Celsius (°C):</label>
      <!-- v-model.number: converteix automàticament el valor a número -->
      <input v-model.number="celsius" type="number" style="width:140px" />

      <div class="resultats">
        <div class="resultat" style="background:#fff3e0">
          <span class="icona">🌡️</span>
          <span class="valor">{{ fahrenheit }} °F</span>
          <span class="formula">= C × 9/5 + 32</span>
        </div>
        <div class="resultat" style="background:#e8f5e9">
          <span class="icona">🔬</span>
          <span class="valor">{{ kelvin }} K</span>
          <span class="formula">= C + 273.15</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lbl { display: block; margin-bottom: 8px; font-weight: 600; }
.resultats { display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap; }
.resultat {
  flex: 1; min-width: 160px;
  border-radius: 8px; padding: 16px; text-align: center;
}
.icona { font-size: 1.8rem; display: block; margin-bottom: 6px; }
.valor { font-size: 1.4rem; font-weight: 700; color: #1a1a2e; display: block; }
.formula { font-size: 0.75rem; color: #888; margin-top: 4px; display: block; }
</style>
