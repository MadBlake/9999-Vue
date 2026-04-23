<script setup lang="ts">
import { ref, computed } from 'vue'

interface Fase { color: string; nom: string; significat: string; bg: string }

const fases: Fase[] = [
  { color: '#e74c3c', nom: 'Vermell', significat: '🛑 Para!',    bg: '#fdecea' },
  { color: '#f39c12', nom: 'Groc',    significat: "⚠️ Prepara't", bg: '#fff8e1' },
  { color: '#27ae60', nom: 'Verd',    significat: '✅ Passa!',    bg: '#e8f5e9' },
]

const indexActiu = ref(0)
const faseActiva = computed(() => fases[indexActiu.value])
function seguent() { indexActiu.value = (indexActiu.value + 1) % fases.length }
</script>

<template>
  <div class="page">
    <h1>Exercici 06 — Semàfor</h1>
    <p class="subtitol">ref(), computed(), array de fases, :style dinàmic</p>
    <div class="card" style="text-align:center">
      <div class="semafor" :style="{ background: faseActiva.bg }">
        <div v-for="(f, i) in fases" :key="f.color" class="llum"
          :style="{ background: i === indexActiu ? f.color : '#333' }"></div>
      </div>
      <p class="significat">{{ faseActiva.significat }}</p>
      <p style="font-size:0.85rem;color:#888;margin-bottom:14px">
        Color: <strong :style="{ color: faseActiva.color }">{{ faseActiva.nom }}</strong>
      </p>
      <button @click="seguent">Següent fase →</button>
    </div>
  </div>
</template>

<style scoped>
.semafor { width: 80px; border-radius: 12px; padding: 14px 10px; margin: 0 auto 16px; border: 3px solid #333; display: flex; flex-direction: column; gap: 10px; transition: background 0.3s; }
.llum { width: 50px; height: 50px; border-radius: 50%; transition: background 0.3s; }
.significat { font-size: 1.4rem; font-weight: 700; margin-bottom: 4px; }
</style>
