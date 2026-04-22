<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({ name: 'HomeView' })
</script>

<template>
  <div class="page">
    <h1>Solucions dels exercicis Vue.js + TypeScript</h1>
    <p class="subtitol">Selecciona un exercici de la barra lateral per veure la solució.</p>
    <div class="grid">
      <RouterLink v-for="n in 25" :key="n" :to="'/ex' + String(n).padStart(2, '0')" class="ex-card">
        <span class="num">{{ String(n).padStart(2, '0') }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
.ex-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.15s;
}
.ex-card:hover { border-color: #42b883; background: #e8f5e9; }
.num { font-size: 1.1rem; font-weight: 700; color: #1a1a2e; }
</style>
