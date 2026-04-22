<script lang="ts">
import { defineComponent } from 'vue'
import PanellComp from '../components/ex20/PanellComp.vue'

interface Tema {
  color: string
  fosc: boolean
}

export default defineComponent({
  name: 'Ex20TemaView',
  components: { PanellComp },
  data() {
    return {
      temaObj: {
        color: '#42b883',
        fosc: false,
      } as Tema,
    }
  },
  provide(): Record<string, unknown> {
    // Proporciona la referència a l'objecte (pas per referència → reactiu)
    return {
      temaObj: this.temaObj,
    }
  },
  methods: {
    toggleTema(): void {
      // Mutar les propietats de l'objecte (NO substituir la referència)
      this.temaObj.fosc = !this.temaObj.fosc
      this.temaObj.color = this.temaObj.fosc ? '#e74c3c' : '#42b883'
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 20 — Provide / Inject</h1>
    <p class="subtitol">provide() a l'arrel, inject: ['temaObj'] al net — reactiu per referència</p>

    <div class="card">
      <h3>Ex20TemaView (proveïdor)</h3>
      <div class="hierarquia">
        <div class="box proveidor">
          📦 <strong>Ex20TemaView</strong>
          <span>provide: temaObj = {{ JSON.stringify(temaObj) }}</span>
          <button @click="toggleTema" style="margin-top:10px">
            {{ temaObj.fosc ? '☀️ Mode clar' : '🌙 Mode fosc' }}
          </button>
        </div>
        <PanellComp />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hierarquia { display: flex; flex-direction: column; gap: 0; }
.box {
  border: 2px solid #42b883; border-radius: 8px;
  padding: 12px 16px; background: #f0faf5;
}
.box span { display: block; font-size: 0.8rem; color: #555; margin-top: 4px; font-family: monospace; }
</style>
