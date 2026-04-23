<script setup lang="ts">
import { ref } from 'vue'

interface Nota { id: number; text: string; color: string }

const colors = ['#fff9c4', '#c8e6c9', '#bbdefb', '#fce4ec', '#f3e5f5']
const notes = ref<Nota[]>([
  { id: 1, text: 'Recordar comprar pa', color: colors[0] },
  { id: 2, text: 'Estudiar Composition API', color: colors[1] },
])
let nextId = 3
const nouText = ref('')

function afegir() {
  const t = nouText.value.trim()
  if (!t) return
  notes.value.push({ id: nextId++, text: t, color: colors[Math.floor(Math.random() * colors.length)] })
  nouText.value = ''
}

function eliminar(id: number) { notes.value = notes.value.filter(n => n.id !== id) }
</script>

<template>
  <div class="page">
    <h1>Exercici 10 — Taulell de notes</h1>
    <p class="subtitol">ref(), array dinàmic, :style color aleatori</p>
    <div class="card">
      <div class="fila">
        <input v-model="nouText" placeholder="Nova nota..." @keyup.enter="afegir" style="flex:1" />
        <button :disabled="!nouText.trim()" @click="afegir">+ Nota</button>
      </div>
    </div>
    <div class="taulell">
      <p v-if="notes.length === 0" style="color:#aaa;grid-column:1/-1;text-align:center;padding:20px">
        Cap nota. Afegeix-ne una!
      </p>
      <div v-for="nota in notes" :key="nota.id" class="nota" :style="{ background: nota.color }">
        <p>{{ nota.text }}</p>
        <button class="btn-x" @click="eliminar(nota.id)">✕</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fila { display: flex; gap: 8px; }
.taulell { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-top: 8px; }
.nota { border-radius: 8px; padding: 14px; min-height: 100px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 2px 2px 6px #0001; }
.nota p { font-size: 0.9rem; word-break: break-word; }
.btn-x { background: none; border: none; cursor: pointer; color: #888; align-self: flex-end; font-size: 0.85rem; }
.btn-x:hover { color: #e74c3c; }
</style>
