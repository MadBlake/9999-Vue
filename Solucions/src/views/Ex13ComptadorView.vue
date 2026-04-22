<script lang="ts">
import { defineComponent } from 'vue'
import ComptadorComp from '../components/ex13/ComptadorComp.vue'

interface Stat {
  id: number
  etiqueta: string
  valorInicial: number
  valorActual: number
}

export default defineComponent({
  name: 'Ex13ComptadorView',
  components: { ComptadorComp },
  data() {
    return {
      comptadors: [
        { id: 1, etiqueta: 'Pomes 🍎', valorInicial: 0, valorActual: 0 },
        { id: 2, etiqueta: 'Taronges 🍊', valorInicial: 3, valorActual: 3 },
        { id: 3, etiqueta: 'Plàtans 🍌', valorInicial: 5, valorActual: 5 },
      ] as Stat[],
    }
  },
  computed: {
    total(): number {
      return this.comptadors.reduce((sum, c) => sum + c.valorActual, 0)
    },
  },
  methods: {
    onActualitzat(payload: { id: number; valor: number }): void {
      const c = this.comptadors.find(c => c.id === payload.id)
      if (c) c.valorActual = payload.valor
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 13 — Comptadors pare-fill</h1>
    <p class="subtitol">Props: id, valorInicial, etiqueta — emit actualitzat — computed total</p>

    <div class="card">
      <div class="fila-comptadors">
        <ComptadorComp
          v-for="c in comptadors"
          :key="c.id"
          :id="c.id"
          :valor-inicial="c.valorInicial"
          :etiqueta="c.etiqueta"
          @actualitzat="onActualitzat"
        />
      </div>
      <div class="total">
        Total articles: <strong>{{ total }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fila-comptadors { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
.total { margin-top: 20px; text-align: center; font-size: 1.2rem; padding-top: 16px; border-top: 1px solid #eee; }
</style>
