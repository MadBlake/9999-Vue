<script setup lang="ts">
import { reactive, computed } from 'vue'

interface Producte { id: number; nom: string; preu: number; quantitat: number }

const productes = reactive<Producte[]>([
  { id: 1, nom: 'Portàtil',  preu: 849, quantitat: 0 },
  { id: 2, nom: 'Ratolí',   preu: 29,  quantitat: 0 },
  { id: 3, nom: 'Teclat',   preu: 59,  quantitat: 0 },
  { id: 4, nom: 'Monitor',  preu: 299, quantitat: 0 },
  { id: 5, nom: 'Auriculars', preu: 89, quantitat: 0 },
])

const totalArticles = computed(() => productes.reduce((s, p) => s + p.quantitat, 0))
const total         = computed(() => productes.reduce((s, p) => s + p.preu * p.quantitat, 0))
const enCistella    = computed(() => productes.filter(p => p.quantitat > 0))

function incrementar(p: Producte) { p.quantitat++ }
function decrementar(p: Producte) { if (p.quantitat > 0) p.quantitat-- }
</script>

<template>
  <div class="page">
    <h1>Exercici 18 — Cistella de compra</h1>
    <p class="subtitol">reactive(), computed() total + articles, modificació d'objecte nested</p>

    <div class="card">
      <h3>Productes</h3>
      <div v-for="p in productes" :key="p.id" class="fila-producte">
        <span class="nom">{{ p.nom }}</span>
        <span class="preu">{{ p.preu }} €</span>
        <div class="controls">
          <button @click="decrementar(p)">−</button>
          <span>{{ p.quantitat }}</span>
          <button @click="incrementar(p)">+</button>
        </div>
      </div>
    </div>

    <div class="card cistella">
      <h3>🛒 Cistella ({{ totalArticles }} articles)</h3>
      <p v-if="!enCistella.length" style="color:#aaa">Buida</p>
      <div v-else>
        <div v-for="p in enCistella" :key="p.id" class="fila-cistella">
          <span>{{ p.nom }} × {{ p.quantitat }}</span>
          <span>{{ (p.preu * p.quantitat).toFixed(2) }} €</span>
        </div>
        <hr style="margin:10px 0;border-color:#e0e0e0" />
        <div class="total">
          <strong>Total:</strong>
          <strong>{{ total.toFixed(2) }} €</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fila-producte { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
.fila-producte:last-child { border-bottom: none; }
.nom { flex: 1; font-weight: 600; }
.preu { color: #888; font-size: 0.9rem; min-width: 60px; }
.controls { display: flex; align-items: center; gap: 8px; }
.controls button { width: 28px; height: 28px; border-radius: 4px; background: #42b883; color: white; border: none; font-size: 1rem; font-weight: 700; cursor: pointer; }
.fila-cistella { display: flex; justify-content: space-between; padding: 4px 0; font-size: 0.9rem; }
.total { display: flex; justify-content: space-between; font-size: 1.05rem; }
</style>
