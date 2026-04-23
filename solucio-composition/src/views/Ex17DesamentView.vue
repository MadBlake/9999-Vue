<script setup lang="ts">
import { ref, watch } from 'vue'

const text = ref('')
const estat = ref<'escrivint' | 'desant' | 'desat'>('desat')
let timer: ReturnType<typeof setTimeout> | null = null

watch(text, () => {
  estat.value = 'escrivint'
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { estat.value = 'desant'; setTimeout(() => { estat.value = 'desat' }, 600) }, 1500)
})
</script>

<template>
  <div class="page">
    <h1>Exercici 17 — Desament automàtic</h1>
    <p class="subtitol">watch() + setTimeout debounce — simulació autosave</p>
    <div class="card">
      <textarea
        v-model="text"
        placeholder="Escriu aquí... (es desa automàticament)"
        rows="6"
        style="width:100%;resize:vertical;font-family:inherit"
      ></textarea>
      <div class="estat" :class="estat">
        <span v-if="estat === 'escrivint'">✏️ Escrivint...</span>
        <span v-else-if="estat === 'desant'">💾 Desant...</span>
        <span v-else>✅ Desat</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.estat { margin-top: 8px; font-size: 0.88rem; font-weight: 600; }
.escrivint { color: #888; }
.desant    { color: #f39c12; }
.desat     { color: #27ae60; }
</style>
