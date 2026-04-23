<script setup lang="ts">
import { ref } from 'vue'

const productes = ref<string[]>(['Pa', 'Llet'])
const nouProducte = ref('')

function afegir() {
  const t = nouProducte.value.trim()
  if (t) { productes.value.push(t); nouProducte.value = '' }
}
function eliminar(i: number) { productes.value.splice(i, 1) }
</script>

<template>
  <div class="page">
    <h1>Exercici 04 — Llista de la compra</h1>
    <p class="subtitol">ref() array, v-for, afegir/eliminar elements</p>
    <div class="card">
      <div class="fila">
        <input v-model="nouProducte" placeholder="Nou producte..." @keyup.enter="afegir" />
        <button :disabled="!nouProducte.trim()" @click="afegir">Afegir</button>
      </div>
    </div>
    <div class="card">
      <p v-if="productes.length === 0" style="color:#888">La llista és buida.</p>
      <ul v-else class="llista">
        <li v-for="(p, i) in productes" :key="i">
          <span>{{ p }}</span>
          <button class="btn-eliminar" @click="eliminar(i)">✕</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.fila { display: flex; gap: 8px; }
.fila input { flex: 1; }
.llista { list-style: none; padding: 0; }
.llista li { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
.llista li:last-child { border-bottom: none; }
.btn-eliminar { background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 1rem; padding: 2px 6px; }
</style>
