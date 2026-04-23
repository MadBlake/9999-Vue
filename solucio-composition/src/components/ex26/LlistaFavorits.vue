<script setup lang="ts">
import { ref } from 'vue'

const favorits = ref<string[]>([])
const nou = ref('')

function afegir() {
  const t = nou.value.trim()
  if (t && !favorits.value.includes(t)) { favorits.value.push(t); nou.value = '' }
}
</script>

<template>
  <div class="subcomp">
    <h4>⭐ Llista de favorits</h4>
    <div style="display:flex;gap:8px;margin-bottom:10px">
      <input v-model="nou" placeholder="Afegir favorit..." @keyup.enter="afegir" style="flex:1" />
      <button @click="afegir" :disabled="!nou.trim()">+</button>
    </div>
    <p v-if="!favorits.length" style="color:#aaa;font-size:0.88rem">Sense favorits.</p>
    <ul v-else style="list-style:none;padding:0">
      <li v-for="f in favorits" :key="f" style="padding:4px 0;font-size:0.9rem">⭐ {{ f }}</li>
    </ul>
    <p class="info">Estat conservat amb KeepAlive</p>
  </div>
</template>

<style scoped>
.subcomp { padding: 8px 0; }
.info { font-size: 0.8rem; color: #888; margin-top: 10px; }
</style>
