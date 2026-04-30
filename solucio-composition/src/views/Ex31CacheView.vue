<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Usuari {
  id: number
  name: string
  email: string
}

const usuaris = ref<Usuari[]>([])
const carregant = ref(false)
const error = ref('')
const dadesMarcades = ref<string>('sitio') // 'sitio' o 'local'

onMounted(() => {
  const cached = localStorage.getItem('usuarisCached')
  if (cached) {
    try {
      usuaris.value = JSON.parse(cached)
      dadesMarcades.value = 'local'
      return
    } catch {
      localStorage.removeItem('usuarisCached')
    }
  }
  carregarDades()
})

async function carregarDades() {
  carregant.value = true
  error.value = ''
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error('Error al carregar')
    const data = await res.json()
    usuaris.value = data
    dadesMarcades.value = 'sitio'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconegut'
  } finally {
    carregant.value = false
  }
}

watch(() => usuaris.value.length, (newLen) => {
  if (newLen > 0 && dadesMarcades.value === 'sitio') {
    localStorage.setItem('usuarisCached', JSON.stringify(usuaris.value))
  }
})

function buidarCache() {
  localStorage.removeItem('usuarisCached')
  usuaris.value = []
  dadesMarcades.value = 'sitio'
}

const origen = computed(() => {
  if (dadesMarcades.value === 'local') return '📍 Des de localStorage (cache)'
  return '🌐 Des de l\'API'
})
</script>

<template>
  <div class="page">
    <h1>Exercici 31 — Cache de dades amb watch</h1>
    <p class="subtitol">watch() condicional, localStorage, ref()</p>

    <div class="card">
      <div class="header-cache">
        <div>
          <p style="margin: 0; color: #666;">{{ origen }}</p>
          <p v-if="usuaris.length" style="margin: 4px 0 0 0; color: #999; font-size: 0.85rem;">
            {{ usuaris.length }} usuaris carregats
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button @click="carregarDades" :disabled="carregant">Recarregar des API</button>
          <button @click="buidarCache" style="background: #e74c3c;">Buidar cache</button>
        </div>
      </div>

      <div v-if="carregant" class="loading">⏳ Carregant...</div>
      <div v-else-if="error" class="error">❌ {{ error }}</div>
      <div v-else-if="usuaris.length === 0" class="info">Sin dades. Fes clic en "Recarregar".</div>
      <div v-else>
        <table class="taula">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in usuaris" :key="u.id">
              <td>{{ u.id }}</td>
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-cache { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #eee; }
.loading, .error, .info { padding: 20px; text-align: center; }
.error { color: #e74c3c; }
.info { color: #999; }
.taula { width: 100%; border-collapse: collapse; }
.taula th, .taula td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
.taula th { background: #f5f5f5; font-weight: bold; }
.taula tr:hover { background: #fafafa; }
button { padding: 8px 12px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
button:hover:not(:disabled) { background: #369970; }
button:disabled { background: #ccc; cursor: not-allowed; }
</style>
