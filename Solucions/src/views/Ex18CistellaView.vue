<script lang="ts">
import { defineComponent } from 'vue'

interface Producte {
  id: number
  nom: string
  preu: number
  quantitat: number
  emoji: string
}

export default defineComponent({
  name: 'Ex18CistellaView',
  data() {
    return {
      productes: [
        { id: 1, nom: 'Portàtil Gaming', preu: 1299, quantitat: 0, emoji: '💻' },
        { id: 2, nom: 'Auriculars BT', preu: 89, quantitat: 1, emoji: '🎧' },
        { id: 3, nom: 'Ratolí Sense Fil', preu: 45, quantitat: 0, emoji: '🖱️' },
        { id: 4, nom: 'Teclat Mecànic', preu: 129, quantitat: 2, emoji: '⌨️' },
        { id: 5, nom: 'Monitor 27"', preu: 399, quantitat: 0, emoji: '🖥️' },
      ] as Producte[],
    }
  },
  computed: {
    total(): number {
      return this.productes.reduce((sum, p) => sum + p.preu * p.quantitat, 0)
    },
    totalArticles(): number {
      return this.productes.reduce((sum, p) => sum + p.quantitat, 0)
    },
  },
  methods: {
    incrementar(id: number): void {
      const p = this.productes.find(p => p.id === id)
      if (p) p.quantitat++
    },
    decrementar(id: number): void {
      const p = this.productes.find(p => p.id === id)
      if (p && p.quantitat > 0) p.quantitat--
    },
    buidarCistella(): void {
      this.productes.forEach(p => (p.quantitat = 0))
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 18 — Cistella de compra</h1>
    <p class="subtitol">Interface Producte, computed total, +/− quantitat</p>

    <div class="card">
      <table class="taula">
        <thead>
          <tr>
            <th>Producte</th>
            <th>Preu</th>
            <th>Quantitat</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in productes" :key="p.id">
            <td>{{ p.emoji }} {{ p.nom }}</td>
            <td>{{ p.preu }} €</td>
            <td>
              <div class="controls-q">
                <button @click="decrementar(p.id)" :disabled="p.quantitat === 0">−</button>
                <span>{{ p.quantitat }}</span>
                <button @click="incrementar(p.id)">+</button>
              </div>
            </td>
            <td :class="{ actiu: p.quantitat > 0 }">
              {{ (p.preu * p.quantitat).toFixed(2) }} €
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <button class="buidar" @click="buidarCistella" :disabled="totalArticles === 0">
                🗑️ Buidar cistella
              </button>
            </td>
            <td><strong>{{ totalArticles }} articles</strong></td>
            <td class="total-final"><strong>{{ total.toFixed(2) }} €</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style scoped>
.taula { width: 100%; border-collapse: collapse; }
.taula th, .taula td {
  border: 1px solid #e0e0e0; padding: 10px 14px; text-align: center;
}
.taula th { background: #42b883; color: white; }
.taula tbody tr:hover { background: #f0faf5; }
td.actiu { color: #2980b9; font-weight: 600; }
.controls-q { display: flex; align-items: center; justify-content: center; gap: 8px; }
.controls-q button { width: 28px; height: 28px; border-radius: 5px; font-size: 1rem; }
.total-final { font-size: 1.1rem; color: #27ae60; }
tfoot td { background: #f9f9f9; border-top: 2px solid #42b883; }
.buidar {
  background: none; border: 1px solid #e74c3c; color: #e74c3c;
  padding: 5px 12px; border-radius: 5px; cursor: pointer; font-size: 0.85rem;
}
.buidar:disabled { opacity: 0.4; }
</style>
