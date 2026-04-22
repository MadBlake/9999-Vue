<script lang="ts">
import { defineComponent } from 'vue'

interface Producte {
  id: number
  nom: string
  categoria: string
  preu: number
}

export default defineComponent({
  name: 'Ex08FiltreView',
  data() {
    return {
      cercaNom: '',
      categoriaFiltro: '',
      productes: [
        { id: 1, nom: 'Portàtil Legion 5', categoria: 'Informàtica', preu: 1299 },
        { id: 2, nom: 'Auriculars Sony WH', categoria: 'So', preu: 249 },
        { id: 3, nom: 'Teclat Mecànic', categoria: 'Informàtica', preu: 89 },
        { id: 4, nom: 'Monitor LG 27"', categoria: 'Informàtica', preu: 399 },
        { id: 5, nom: 'Altaveu Marshall', categoria: 'So', preu: 199 },
        { id: 6, nom: 'Càmera Sony A7', categoria: 'Fotografia', preu: 2499 },
        { id: 7, nom: 'Ratolí Logitech', categoria: 'Informàtica', preu: 59 },
        { id: 8, nom: 'Trípode Joby', categoria: 'Fotografia', preu: 79 },
      ] as Producte[],
    }
  },
  computed: {
    categories(): string[] {
      return [...new Set(this.productes.map(p => p.categoria))].sort()
    },
    productesFiltrats(): Producte[] {
      return this.productes.filter(p => {
        const coincideixNom = p.nom.toLowerCase().includes(this.cercaNom.toLowerCase())
        const coincideixCat = this.categoriaFiltro === '' || p.categoria === this.categoriaFiltro
        return coincideixNom && coincideixCat
      })
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 8 — Filtre de llista</h1>
    <p class="subtitol">v-model, computed filter, interface TypeScript</p>

    <div class="card filtres">
      <label>
        Cerca nom:
        <input v-model="cercaNom" placeholder="Buscar producte..." />
      </label>
      <label>
        Categoria:
        <select v-model="categoriaFiltro">
          <option value="">Totes</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </label>
    </div>

    <p style="margin:8px 0;color:#888;font-size:0.9rem">
      {{ productesFiltrats.length }} producte{{ productesFiltrats.length !== 1 ? 's' : '' }} trobat{{ productesFiltrats.length !== 1 ? 's' : '' }}
    </p>

    <div v-if="productesFiltrats.length === 0" class="buit">No s'han trobat productes.</div>

    <div class="grid">
      <div v-for="p in productesFiltrats" :key="p.id" class="card producte">
        <span class="badge">{{ p.categoria }}</span>
        <h3>{{ p.nom }}</h3>
        <p class="preu">{{ p.preu }} €</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filtres { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; }
.filtres label { display: flex; flex-direction: column; gap: 4px; font-weight: 600; font-size: 0.9rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-top: 8px; }
.producte { padding: 14px; }
.badge { font-size: 0.75rem; background: #e8f5e9; color: #27ae60; padding: 2px 8px; border-radius: 20px; }
.producte h3 { margin: 8px 0 4px; font-size: 0.95rem; }
.preu { font-size: 1.2rem; font-weight: 700; color: #2980b9; margin: 0; }
.buit { padding: 20px; text-align: center; color: #888; }
</style>
