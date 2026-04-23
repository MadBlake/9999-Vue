<script setup lang="ts">
import { ref, computed } from 'vue'

const nom = ref('Joan')
const cognoms = ref('Pérez García')
const edat = ref(25)
const professio = ref('Desenvolupador Vue')

const inicials = computed(() =>
  (nom.value.charAt(0) + (cognoms.value.charAt(0) ?? '')).toUpperCase()
)

function incrementarEdat() { edat.value++ }
</script>

<template>
  <div class="page">
    <h1>Exercici 01 — Targeta de presentació</h1>
    <p class="subtitol">ref(), computed() — interpolació, binding, event</p>
    <div class="card targeta">
      <div class="avatar">{{ inicials }}</div>
      <h2>{{ nom }} {{ cognoms }}</h2>
      <p class="professio">{{ professio }}</p>
      <p>Edat: <strong>{{ edat }}</strong> anys</p>
      <button @click="incrementarEdat">+1 any</button>
    </div>
    <div class="card">
      <h3>Edita les dades:</h3>
      <label>Nom <input v-model="nom" /></label>
      <label>Cognoms <input v-model="cognoms" /></label>
      <label>Edat <input v-model.number="edat" type="number" min="0" /></label>
      <label>Professió <input v-model="professio" /></label>
    </div>
  </div>
</template>

<style scoped>
.targeta { text-align: center; }
.avatar { width: 72px; height: 72px; border-radius: 50%; background: #42b883; color: white; font-size: 1.6rem; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
.professio { color: #888; margin-bottom: 8px; }
label { display: flex; flex-direction: column; gap: 4px; font-weight: 600; font-size: 0.9rem; margin-bottom: 10px; }
</style>
