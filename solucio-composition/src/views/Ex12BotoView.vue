<script setup lang="ts">
import { ref } from 'vue'
import BotoComp from '@/components/ex12/BotoComp.vue'

const log = ref<string[]>([])

function registrar(etiqueta: string) {
  log.value.unshift(`Clicat: "${etiqueta}" — ${new Date().toLocaleTimeString()}`)
  if (log.value.length > 5) log.value.pop()
}
</script>

<template>
  <div class="page">
    <h1>Exercici 12 — Botó personalitzat</h1>
    <p class="subtitol">defineProps&lt;&gt;(), defineEmits&lt;&gt;(), slot, tipus</p>
    <div class="card">
      <div class="fila">
        <BotoComp etiqueta="Primari" @clicat="registrar" />
        <BotoComp etiqueta="Secundari" tipus="secundari" @clicat="registrar" />
        <BotoComp etiqueta="Perill" tipus="perill" @clicat="registrar" />
        <BotoComp etiqueta="Desactivat" :desactivat="true" @clicat="registrar" />
      </div>
    </div>
    <div class="card">
      <h3>Registre d'events:</h3>
      <p v-if="log.length === 0" style="color:#aaa">Cap acció registrada.</p>
      <ul v-else class="log">
        <li v-for="(e, i) in log" :key="i">{{ e }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.fila { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.log { list-style: none; padding: 0; }
.log li { font-size: 0.88rem; padding: 5px 0; border-bottom: 1px solid #f0f0f0; }
.log li:last-child { border-bottom: none; }
</style>
