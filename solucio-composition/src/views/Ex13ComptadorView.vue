<script setup lang="ts">
import { ref } from 'vue'
import ComptadorComp from '@/components/ex13/ComptadorComp.vue'

const historial = ref<string[]>([])

function registrar(valor: number, nom: string) {
  historial.value.unshift(`${nom}: ${valor}`)
}
</script>

<template>
  <div class="page">
    <h1>Exercici 13 — Comptador pare–fill</h1>
    <p class="subtitol">defineProps&lt;&gt;(), defineEmits&lt;&gt;(), comunicació pare–fill</p>
    <div class="card">
      <h3>Comptadors</h3>
      <div class="fila">
        <div class="grup-comptador">
          <p>Sense límits</p>
          <ComptadorComp :valorInicial="0" @canvi="v => registrar(v, 'Sense límits')" />
        </div>
        <div class="grup-comptador">
          <p>Rang 0–10</p>
          <ComptadorComp :valorInicial="5" :min="0" :max="10" @canvi="v => registrar(v, 'Rang 0-10')" />
        </div>
        <div class="grup-comptador">
          <p>Pas de 5</p>
          <ComptadorComp :valorInicial="0" :pas="5" @canvi="v => registrar(v, 'Pas de 5')" />
        </div>
      </div>
    </div>
    <div class="card">
      <h3>Historial d'events del pare:</h3>
      <p v-if="!historial.length" style="color:#aaa">Cap canvi registrat.</p>
      <ul v-else class="log">
        <li v-for="(e, i) in historial.slice(0, 6)" :key="i">{{ e }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.fila { display: flex; gap: 24px; flex-wrap: wrap; }
.grup-comptador { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.grup-comptador p { font-size: 0.85rem; color: #888; }
.log { list-style: none; padding: 0; }
.log li { font-size: 0.88rem; padding: 5px 0; border-bottom: 1px solid #f0f0f0; }
.log li:last-child { border-bottom: none; }
</style>
