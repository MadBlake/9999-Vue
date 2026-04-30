<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface GithubUsuari {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

interface GithubResponse {
  items: GithubUsuari[]
  total_count: number
}

const terme = ref('')
const resultats = ref<GithubUsuari[]>([])
const carregant = ref(false)
const error = ref('')
let timeoutId: ReturnType<typeof setTimeout>

const resultatsCount = computed(() => resultats.value.length)

async function buscar(text: string) {
  if (!text.trim()) {
    resultats.value = []
    return
  }
  carregant.value = true
  error.value = ''
  try {
    const res = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(text)}`)
    if (!res.ok) throw new Error('Error en la búsqueda')
    const data: GithubResponse = await res.json()
    resultats.value = data.items
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconegut'
  } finally {
    carregant.value = false
  }
}

watch(terme, (nouTerme) => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => buscar(nouTerme), 500) // debounce 500ms
})
</script>

<template>
  <div class="page">
    <h1>Exercici 28 — Búsqueda en temps real amb API</h1>
    <p class="subtitol">watch(), debounce, GitHub API, async búsqueda</p>

    <div class="card">
      <input v-model="terme" placeholder="Buscar usuari de GitHub (ex: torvalds)..." style="width: 100%; margin-bottom: 16px;" />
      
      <div v-if="carregant" class="loading">⏳ Buscant...</div>
      <div v-else-if="error" class="error">❌ {{ error }}</div>
      <div v-else-if="terme && resultats.length === 0" class="info">Sin resultats</div>
      <div v-else-if="terme">
        <p style="color: #666; margin-bottom: 12px;">{{ resultatsCount }} resultats</p>
        <div class="usuaris-grid">
          <a v-for="u in resultats" :key="u.id" :href="u.html_url" target="_blank" class="card-usuari">
            <img :src="u.avatar_url" :alt="u.login" class="avatar" />
            <p class="login">{{ u.login }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading, .error, .info { padding: 20px; text-align: center; font-size: 1rem; }
.error { color: #e74c3c; }
.info { color: #999; }
.usuaris-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }
.card-usuari { display: flex; flex-direction: column; align-items: center; padding: 12px; background: #f9f9f9; border-radius: 8px; text-decoration: none; color: #333; transition: all 0.3s; }
.card-usuari:hover { background: #42b883; color: white; transform: scale(1.05); }
.avatar { width: 60px; height: 60px; border-radius: 50%; margin-bottom: 8px; }
.login { font-weight: bold; font-size: 0.9rem; margin: 0; word-break: break-word; }
</style>
