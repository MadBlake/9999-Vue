<script setup lang="ts">
import { ref, computed } from 'vue'

interface Tasca { id: number; text: string; feta: boolean; prioritat: 'alta' | 'normal' | 'baixa' }

const tasques = ref<Tasca[]>([
  { id: 1, text: 'Aprendre Composition API', feta: true,  prioritat: 'alta' },
  { id: 2, text: 'Fer exercicis Vue',        feta: false, prioritat: 'alta' },
  { id: 3, text: 'Repassar router',          feta: false, prioritat: 'normal' },
  { id: 4, text: 'Estudiar Pinia',           feta: false, prioritat: 'baixa' },
])
let nextId = 5
const nouText    = ref('')
const prioritat  = ref<'alta' | 'normal' | 'baixa'>('normal')
const filtre     = ref<'totes' | 'pendents' | 'fetes'>('totes')

const tascasFiltrades = computed(() =>
  tasques.value.filter(t =>
    filtre.value === 'totes'   ? true :
    filtre.value === 'fetes'   ? t.feta :
    !t.feta
  )
)
const numFetes = computed(() => tasques.value.filter(t => t.feta).length)
const progres  = computed(() => tasques.value.length ? Math.round(numFetes.value / tasques.value.length * 100) : 0)

function afegir() {
  const t = nouText.value.trim()
  if (!t) return
  tasques.value.push({ id: nextId++, text: t, feta: false, prioritat: prioritat.value })
  nouText.value = ''
}
function eliminar(id: number) { tasques.value = tasques.value.filter(t => t.id !== id) }
function eliminarFetes() { tasques.value = tasques.value.filter(t => !t.feta) }

const colors: Record<string, string> = { alta: '#e74c3c', normal: '#f39c12', baixa: '#27ae60' }
</script>

<template>
  <div class="page">
    <h1>Exercici 23 — Gestor de tasques</h1>
    <p class="subtitol">ref() array, computed() filtrat, progrés reactiu</p>

    <div class="card">
      <div class="fila">
        <input v-model="nouText" placeholder="Nova tasca..." style="flex:1" @keyup.enter="afegir" />
        <select v-model="prioritat">
          <option value="alta">Alta</option>
          <option value="normal">Normal</option>
          <option value="baixa">Baixa</option>
        </select>
        <button :disabled="!nouText.trim()" @click="afegir">Afegir</button>
      </div>
    </div>

    <div class="card">
      <div class="capçalera">
        <div class="filtres-boto">
          <button v-for="f in ['totes','pendents','fetes']" :key="f"
            :class="{ actiu: filtre === f }" @click="filtre = (f as any)">
            {{ f.charAt(0).toUpperCase() + f.slice(1) }}
          </button>
        </div>
        <span style="font-size:0.85rem;color:#888">{{ numFetes }}/{{ tasques.length }}</span>
      </div>
      <div class="barra-p">
        <div class="barra-fill" :style="{ width: progres + '%' }"></div>
      </div>

      <p v-if="!tascasFiltrades.length" style="color:#aaa;text-align:center;padding:20px">
        Cap tasca
      </p>
      <ul v-else class="llista">
        <li v-for="t in tascasFiltrades" :key="t.id" :class="{ feta: t.feta }">
          <input type="checkbox" v-model="t.feta" />
          <span class="text">{{ t.text }}</span>
          <span class="p" :style="{ background: colors[t.prioritat] + '22', color: colors[t.prioritat] }">
            {{ t.prioritat }}
          </span>
          <button class="btn-x" @click="eliminar(t.id)">✕</button>
        </li>
      </ul>
      <button v-if="numFetes > 0" @click="eliminarFetes" style="margin-top:10px;background:#e74c3c">
        Eliminar fetes
      </button>
    </div>
  </div>
</template>

<style scoped>
.fila { display: flex; gap: 8px; flex-wrap: wrap; }
.capçalera { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.filtres-boto { display: flex; gap: 6px; }
.filtres-boto button { background: #f0f0f0; border: none; border-radius: 6px; padding: 5px 12px; font-size: 0.82rem; font-weight: 700; cursor: pointer; }
.filtres-boto button.actiu { background: #42b883; color: white; }
.barra-p { height: 6px; background: #e0e0e0; border-radius: 3px; margin-bottom: 12px; }
.barra-fill { height: 100%; background: #42b883; border-radius: 3px; transition: width 0.3s; }
.llista { list-style: none; padding: 0; }
.llista li { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
.llista li:last-child { border-bottom: none; }
.text { flex: 1; font-size: 0.9rem; }
.llista li.feta .text { text-decoration: line-through; color: #aaa; }
.p { font-size: 0.75rem; font-weight: 700; padding: 1px 8px; border-radius: 10px; }
.btn-x { background: none; border: none; color: #ccc; cursor: pointer; font-size: 0.9rem; }
.btn-x:hover { color: #e74c3c; }
</style>
