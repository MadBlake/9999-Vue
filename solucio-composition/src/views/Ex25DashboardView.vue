<script setup lang="ts">
import { ref, computed } from 'vue'

interface Venda { id: number; producte: string; categoria: string; mes: string; import: number; unitats: number }

const vendes = ref<Venda[]>([
  { id: 1,  producte: 'Portàtil Pro',    categoria: 'Electrònica', mes: 'Gener',  import: 1200, unitats: 8 },
  { id: 2,  producte: 'Ratolí Ergonòm', categoria: 'Perifèrics',  mes: 'Gener',  import: 45,   unitats: 32 },
  { id: 3,  producte: 'Monitor 4K',     categoria: 'Electrònica', mes: 'Febrer', import: 599,  unitats: 5 },
  { id: 4,  producte: 'Teclat Mecànic', categoria: 'Perifèrics',  mes: 'Febrer', import: 129,  unitats: 18 },
  { id: 5,  producte: 'Auriculars BT',  categoria: 'Àudio',       mes: 'Març',   import: 89,   unitats: 25 },
  { id: 6,  producte: 'Webcam HD',      categoria: 'Perifèrics',  mes: 'Març',   import: 79,   unitats: 14 },
  { id: 7,  producte: 'SSD 1TB',        categoria: 'Emmagatzemat', mes: 'Abril',  import: 110,  unitats: 22 },
  { id: 8,  producte: 'Hub USB-C',      categoria: 'Perifèrics',  mes: 'Abril',  import: 59,   unitats: 30 },
  { id: 9,  producte: 'Altaveu WiFi',   categoria: 'Àudio',       mes: 'Maig',   import: 149,  unitats: 12 },
  { id: 10, producte: 'RAM 32GB',       categoria: 'Emmagatzemat', mes: 'Maig',   import: 95,   unitats: 20 },
])

const categoriaF = ref('Totes')
const mesF = ref('Tots')
const ordenar = ref<'import' | 'unitats' | 'producte'>('import')

const categories = computed(() => ['Totes', ...new Set(vendes.value.map(v => v.categoria))])
const mesos = computed(() => ['Tots', ...new Set(vendes.value.map(v => v.mes))])

const vendesFiltrades = computed(() =>
  vendes.value
    .filter(v =>
      (categoriaF.value === 'Totes' || v.categoria === categoriaF.value) &&
      (mesF.value === 'Tots' || v.mes === mesF.value)
    )
    .sort((a, b) => {
      if (ordenar.value === 'producte') return a.producte.localeCompare(b.producte)
      return (b[ordenar.value] as number) - (a[ordenar.value] as number)
    })
)

const totalImport = computed(() => vendesFiltrades.value.reduce((s, v) => s + v.import * v.unitats, 0))
const totalUnitats = computed(() => vendesFiltrades.value.reduce((s, v) => s + v.unitats, 0))
const millor = computed(() => vendesFiltrades.value.reduce<Venda | null>((m, v) => !m || v.import * v.unitats > m.import * m.unitats ? v : m, null))
</script>

<template>
  <div class="page">
    <h1>Exercici 25 — Dashboard de vendes</h1>
    <p class="subtitol">ref(), computed() encadenat, doble filtre + ordenació</p>

    <div class="kpis">
      <div class="kpi">
        <span class="k-label">Total facturació</span>
        <span class="k-val">{{ totalImport.toLocaleString() }} €</span>
      </div>
      <div class="kpi">
        <span class="k-label">Unitats venudes</span>
        <span class="k-val">{{ totalUnitats }}</span>
      </div>
      <div class="kpi">
        <span class="k-label">Productes mostrats</span>
        <span class="k-val">{{ vendesFiltrades.length }}</span>
      </div>
      <div class="kpi" v-if="millor">
        <span class="k-label">Millor producte</span>
        <span class="k-val" style="font-size:0.95rem">{{ millor.producte }}</span>
      </div>
    </div>

    <div class="card">
      <div class="filtres">
        <select v-model="categoriaF">
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
        <select v-model="mesF">
          <option v-for="m in mesos" :key="m" :value="m">{{ m }}</option>
        </select>
        <select v-model="ordenar">
          <option value="import">Ordenar per preu</option>
          <option value="unitats">Ordenar per unitats</option>
          <option value="producte">Ordenar per nom</option>
        </select>
      </div>

      <table class="taula">
        <thead>
          <tr>
            <th>Producte</th><th>Categoria</th><th>Mes</th>
            <th>Preu unit.</th><th>Unitats</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in vendesFiltrades" :key="v.id">
            <td><strong>{{ v.producte }}</strong></td>
            <td><span class="cat-badge">{{ v.categoria }}</span></td>
            <td>{{ v.mes }}</td>
            <td>{{ v.import }} €</td>
            <td>{{ v.unitats }}</td>
            <td><strong>{{ (v.import * v.unitats).toLocaleString() }} €</strong></td>
          </tr>
          <tr v-if="!vendesFiltrades.length">
            <td colspan="6" style="text-align:center;color:#aaa;padding:20px">Cap resultat</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.kpis { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 14px; }
.kpi { background: white; border-radius: 10px; padding: 14px; border: 1px solid #e0e0e0; display: flex; flex-direction: column; gap: 4px; }
.k-label { font-size: 0.78rem; color: #888; text-transform: uppercase; letter-spacing: 0.4px; }
.k-val { font-size: 1.3rem; font-weight: 700; color: #1a1a2e; }
.filtres { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.taula { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
.taula th, .taula td { padding: 9px 12px; text-align: left; border-bottom: 1px solid #f0f0f0; }
.taula th { background: #1a1a2e; color: white; font-size: 0.8rem; }
.cat-badge { background: #42b88322; color: #42b883; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 10px; }
</style>
