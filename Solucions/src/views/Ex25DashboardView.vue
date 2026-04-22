<script lang="ts">
import { defineComponent } from 'vue'

interface Venda {
  id: number
  producte: string
  import: number
  mes: string
  categoria: string
}

const VENDES: Venda[] = [
  { id: 1,  producte: 'Portàtil Pro',    import: 1299, mes: 'Gener',  categoria: 'Informàtica' },
  { id: 2,  producte: 'Auriculars BT',   import: 89,   mes: 'Gener',  categoria: 'So' },
  { id: 3,  producte: 'Monitor 4K',      import: 549,  mes: 'Febrer', categoria: 'Informàtica' },
  { id: 4,  producte: 'Teclat Mecànic',  import: 129,  mes: 'Febrer', categoria: 'Informàtica' },
  { id: 5,  producte: 'Càmera Sony A7',  import: 2499, mes: 'Març',   categoria: 'Fotografia' },
  { id: 6,  producte: 'Altaveu Marshall',import: 199,  mes: 'Març',   categoria: 'So' },
  { id: 7,  producte: 'Ratolí Logitech', import: 59,   mes: 'Abril',  categoria: 'Informàtica' },
  { id: 8,  producte: 'Trípode Joby',    import: 79,   mes: 'Abril',  categoria: 'Fotografia' },
  { id: 9,  producte: 'Disc SSD 2TB',    import: 169,  mes: 'Abril',  categoria: 'Informàtica' },
  { id: 10, producte: 'Objectiu 50mm',   import: 399,  mes: 'Maig',   categoria: 'Fotografia' },
  { id: 11, producte: 'Micrò Podcast',   import: 149,  mes: 'Maig',   categoria: 'So' },
  { id: 12, producte: 'Tablet Pro 12',   import: 899,  mes: 'Juny',   categoria: 'Informàtica' },
  { id: 13, producte: 'Altaveu JBL',     import: 249,  mes: 'Juny',   categoria: 'So' },
  { id: 14, producte: 'Filtre UV 77mm',  import: 39,   mes: 'Juny',   categoria: 'Fotografia' },
  { id: 15, producte: 'RAM DDR5 32GB',   import: 199,  mes: 'Juliol', categoria: 'Informàtica' },
]

export default defineComponent({
  name: 'Ex25DashboardView',
  data() {
    return {
      vendes: VENDES,
      filtreMes: '',
      filtreCategoria: '',
    }
  },
  computed: {
    mesos(): string[] {
      return [...new Set(this.vendes.map(v => v.mes))]
    },
    categories(): string[] {
      return [...new Set(this.vendes.map(v => v.categoria))].sort()
    },
    vendesFiltrades(): Venda[] {
      return this.vendes
        .filter(v =>
          (this.filtreMes === '' || v.mes === this.filtreMes) &&
          (this.filtreCategoria === '' || v.categoria === this.filtreCategoria)
        )
        .sort((a, b) => b.import - a.import)
    },
    total(): number {
      return this.vendesFiltrades.reduce((s, v) => s + v.import, 0)
    },
    maxim(): number {
      if (!this.vendesFiltrades.length) return 0
      return Math.max(...this.vendesFiltrades.map(v => v.import))
    },
    minim(): number {
      if (!this.vendesFiltrades.length) return 0
      return Math.min(...this.vendesFiltrades.map(v => v.import))
    },
    mitjana(): number {
      if (!this.vendesFiltrades.length) return 0
      return Math.round(this.total / this.vendesFiltrades.length)
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 25 — Dashboard d'estadístiques</h1>
    <p class="subtitol">Dades simulades, computed stats, doble filtre, ordenació</p>

    <!-- Filtres -->
    <div class="filtres">
      <label>
        Mes:
        <select v-model="filtreMes">
          <option value="">Tots</option>
          <option v-for="m in mesos" :key="m" :value="m">{{ m }}</option>
        </select>
      </label>
      <label>
        Categoria:
        <select v-model="filtreCategoria">
          <option value="">Totes</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>
    </div>

    <!-- KPI -->
    <div class="kpis">
      <div class="kpi">
        <span class="kpi-label">Total vendes</span>
        <span class="kpi-valor">{{ total.toLocaleString('ca-ES') }} €</span>
      </div>
      <div class="kpi">
        <span class="kpi-label">Màxima venda</span>
        <span class="kpi-valor">{{ maxim.toLocaleString('ca-ES') }} €</span>
      </div>
      <div class="kpi">
        <span class="kpi-label">Mínima venda</span>
        <span class="kpi-valor">{{ minim.toLocaleString('ca-ES') }} €</span>
      </div>
      <div class="kpi">
        <span class="kpi-label">Mitjana</span>
        <span class="kpi-valor">{{ mitjana.toLocaleString('ca-ES') }} €</span>
      </div>
    </div>

    <!-- Taula -->
    <div class="card" style="padding:0;overflow:hidden">
      <p v-if="vendesFiltrades.length === 0" style="padding:20px;text-align:center;color:#888">
        Cap venda que coincideixi amb el filtre.
      </p>
      <table v-else class="taula">
        <thead>
          <tr>
            <th>#</th>
            <th>Producte</th>
            <th>Mes</th>
            <th>Categoria</th>
            <th>Import</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in vendesFiltrades" :key="v.id">
            <td>{{ v.id }}</td>
            <td>{{ v.producte }}</td>
            <td>{{ v.mes }}</td>
            <td><span :class="['badge', v.categoria.toLowerCase()]">{{ v.categoria }}</span></td>
            <td class="import"><strong>{{ v.import.toLocaleString('ca-ES') }} €</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.filtres { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }
.filtres label { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.9rem; }
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 14px; }
.kpi {
  background: white; border-radius: 10px; padding: 14px 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,.06); display: flex; flex-direction: column; gap: 4px;
}
.kpi-label { font-size: 0.8rem; color: #888; }
.kpi-valor { font-size: 1.4rem; font-weight: 700; color: #1a1a2e; }
.taula { width: 100%; border-collapse: collapse; }
.taula th, .taula td { border: 1px solid #eee; padding: 9px 12px; text-align: left; }
.taula th { background: #42b883; color: white; }
.taula tbody tr:nth-child(even) { background: #f9f9f9; }
.taula tbody tr:hover { background: #f0faf5; }
.import { text-align: right; }
.badge { padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; }
.badge.informàtica { background: #e3f2fd; color: #1565c0; }
.badge.so          { background: #fce4ec; color: #ad1457; }
.badge.fotografia  { background: #fff3e0; color: #e65100; }
</style>
