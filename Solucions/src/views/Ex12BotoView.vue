<script lang="ts">
import { defineComponent } from 'vue'
import BotoComp from '../components/ex12/BotoComp.vue'

export default defineComponent({
  name: 'Ex12BotoView',
  components: { BotoComp },
  data() {
    return {
      historial: [] as string[],
    }
  },
  methods: {
    onClicat(etiqueta: string): void {
      this.historial.unshift(`S'ha clicat: "${etiqueta}"`)
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 12 — Botó personalitzat</h1>
    <p class="subtitol">Props: etiqueta, variant, desactivat — emit clicat</p>

    <div class="card">
      <h3>Variants del botó:</h3>
      <div class="fila">
        <BotoComp etiqueta="Confirmar" variant="primari" @clicat="onClicat" />
        <BotoComp etiqueta="Cancel·lar" variant="secundari" @clicat="onClicat" />
        <BotoComp etiqueta="Eliminar" variant="perill" @clicat="onClicat" />
        <BotoComp etiqueta="Desactivat" variant="primari" :desactivat="true" @clicat="onClicat" />
      </div>
    </div>

    <div class="card" style="min-height:80px">
      <h3>Historial d'events emesos:</h3>
      <p v-if="historial.length === 0" style="color:#888;font-size:0.9rem">
        (Clica un botó per veure l'event)
      </p>
      <ul v-else class="historial-llista">
        <li v-for="(msg, i) in historial" :key="i">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.fila { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 10px; }
.historial-llista { margin: 6px 0 0; padding-left: 18px; font-size: 0.9rem; line-height: 1.8; }
</style>
