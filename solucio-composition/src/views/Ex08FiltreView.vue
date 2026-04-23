<script setup lang="ts">
import { ref, computed } from 'vue'

interface Producte { nom: string; preu: number; categoria: string }

const productes = ref<Producte[]>([
  { nom: 'Poma',     preu: 1.20, categoria: 'Fruita' },
  { nom: 'Pastanaga', preu: 0.80, categoria: 'Verdura' },
  { nom: 'Plàtan',  preu: 0.60, categoria: 'Fruita' },
  { nom: 'Tomàquet', preu: 1.50, categoria: 'Verdura' },
  { nom: 'Síndria', preu: 3.00, categoria: 'Fruita' },
  { nom: 'Enciam',  preu: 0.90, categoria: 'Verdura' },
])

const filtre = ref('')
const categoriaFiltre = ref('Totes')
const categories = ['Totes', 'Fruita', 'Verdura']

const productesFiltrats = computed(() =>
  productes.value.filter(p => {
    const coincideix = p.nom.toLowerCase().includes(filtre.value.toLowerCase())
    const cat = categoriaFiltre.value === 'Totes' || p.categoria === categoriaFiltre.value
    return coincideix && cat
  })
)
</script>

<template>
  <div class="page">
    <h1>Exercici 08 — Filtre de llista</h1>
    <p class="subtitol">ref(), computed() filtrat, v-for + v-model</p>
    <div class="card">
      <div class="filtres">
        <input v-model="filtre" placeholder="🔍 Cercar producte..." style="flex:1" />
        <select v-model="categoriaFiltre">
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>
    <div class="card">
      <p style="color:#888;font-size:0.85rem;margin-bottom:10px">
        {{ productesFiltrats.length }} de {{ productes.length }} productes
      </p>
      <p v-if="productesFiltrats.length === 0" style="color:#ccc;text-align:center;padding:20px">
        Cap producte coincideix.
      </p>
      <ul class="llista" v-else>
        <li v-for="p in productesFiltrats" :key="p.nom">
          <span class="nom">{{ p.nom }}</span>
          <span class="cat" :class="p.categoria.toLowerCase()">{{ p.categoria }}</span>
          <span class="preu">{{ p.preu.toFixed(2) }} €</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.filtres { display: flex; gap: 8px; flex-wrap: wrap; }
.llista { list-style: none; padding: 0; }
.llista li { display: flex; align-items: center; padding: 9px 0; border-bottom: 1px solid #f0f0f0; gap: 10px; }
.llista li:last-child { border-bottom: none; }
.nom { flex: 1; font-weight: 600; }
.cat { font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; }
.cat.fruita { background: #fde8d8; color: #e67e22; }
.cat.verdura { background: #e8f5e9; color: #27ae60; }
.preu { font-weight: 700; color: #2980b9; }
</style>
