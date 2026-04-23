<script setup lang="ts">
import { ref, watch } from 'vue'

const cerca = ref('')
const historial = ref<string[]>([])

watch(cerca, (nou, vell) => {
  if (nou.trim() && nou !== vell) {
    const t = nou.trim()
    if (!historial.value.includes(t)) {
      historial.value.unshift(t)
      if (historial.value.length > 8) historial.value.pop()
    }
  }
})
</script>

<template>
  <div class="page">
    <h1>Exercici 16 — Historial de cerca</h1>
    <p class="subtitol">watch(source, callback) — evitar duplicats</p>
    <div class="card">
      <input v-model="cerca" placeholder="🔍 Escriu per cercar..." style="width:100%" />
    </div>
    <div class="card">
      <h3>Historial (últims 8 valors únics):</h3>
      <p v-if="!historial.length" style="color:#aaa;margin-top:8px">Sense historial.</p>
      <ul v-else class="historial">
        <li v-for="(h, i) in historial" :key="i" @click="cerca = h">
          🕐 {{ h }}
        </li>
      </ul>
      <button v-if="historial.length" @click="historial = []" style="margin-top:10px">
        Esborrar historial
      </button>
    </div>
  </div>
</template>

<style scoped>
.historial { list-style: none; padding: 0; margin-top: 8px; }
.historial li { padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 0.9rem; transition: background 0.15s; }
.historial li:hover { background: #f0f0f0; }
</style>
