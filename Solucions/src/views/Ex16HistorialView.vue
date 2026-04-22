<script lang="ts">
import { defineComponent } from 'vue'

const CIUTATS = [
  'Barcelona', 'Madrid', 'València', 'Sevilla', 'Bilbao',
  'Girona', 'Tarragona', 'Lleida', 'Palma', 'Zaragoza',
]

export default defineComponent({
  name: 'Ex16HistorialView',
  data() {
    return {
      cerca: '',
      ciutats: CIUTATS,
      historial: [] as string[],
    }
  },
  computed: {
    resultats(): string[] {
      if (!this.cerca.trim()) return []
      const q = this.cerca.trim().toLowerCase()
      return this.ciutats.filter(c => c.toLowerCase().includes(q))
    },
  },
  watch: {
    cerca(nova: string): void {
      const terme = nova.trim()
      if (terme && !this.historial.includes(terme)) {
        this.historial.unshift(terme)
      }
    },
  },
  methods: {
    netejaarHistorial(): void {
      this.historial = []
    },
    seleccionarCiutat(ciutat: string): void {
      this.cerca = ciutat
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 16 — Historial de cerca</h1>
    <p class="subtitol">watch, computed filter, historial sense duplicats</p>

    <div class="card">
      <input
        v-model="cerca"
        placeholder="Cerca una ciutat..."
        style="width:100%;box-sizing:border-box"
      />

      <!-- Resultats filtrats -->
      <ul v-if="resultats.length > 0" class="resultats">
        <li
          v-for="c in resultats"
          :key="c"
          @click="seleccionarCiutat(c)"
        >
          {{ c }}
        </li>
      </ul>
      <p v-else-if="cerca.trim()" style="color:#888;font-size:0.9rem;margin-top:8px">
        Cap resultat per "{{ cerca }}"
      </p>
    </div>

    <div class="card">
      <div class="historial-cap">
        <h3>Historial de cerques</h3>
        <button v-if="historial.length > 0" class="netejar" @click="netejaarHistorial">
          Netejar
        </button>
      </div>
      <p v-if="historial.length === 0" style="color:#888;font-size:0.9rem">
        (Encara no hi ha cerques)
      </p>
      <div v-else class="etiquetes">
        <span
          v-for="terme in historial"
          :key="terme"
          class="etiqueta"
          @click="cerca = terme"
        >
          🔍 {{ terme }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resultats {
  list-style: none; padding: 0; margin: 8px 0 0;
  border: 1px solid #ddd; border-radius: 6px; overflow: hidden;
}
.resultats li {
  padding: 9px 14px; cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}
.resultats li:last-child { border-bottom: none; }
.resultats li:hover { background: #f0faf5; }
.historial-cap { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.historial-cap h3 { margin: 0; }
.netejar { background: none; border: 1px solid #e74c3c; color: #e74c3c; padding: 4px 10px; border-radius: 5px; cursor: pointer; font-size: 0.85rem; }
.etiquetes { display: flex; flex-wrap: wrap; gap: 8px; }
.etiqueta {
  background: #e8f5e9; color: #27ae60; padding: 4px 12px;
  border-radius: 20px; cursor: pointer; font-size: 0.85rem;
}
.etiqueta:hover { background: #c8e6c9; }
</style>
