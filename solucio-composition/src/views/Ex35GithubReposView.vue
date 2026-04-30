<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface Repo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
}

const usuari = ref('torvalds')
const repos = ref<Repo[]>([])
const carregant = ref(false)
const error = ref('')

async function carregarRepos() {
  carregant.value = true
  error.value = ''
  repos.value = []
  
  if (!usuari.value.trim()) return
  
  try {
    const res = await fetch(`https://api.github.com/users/${usuari.value}/repos?sort=stars&per_page=30`)
    if (!res.ok) {
      if (res.status === 404) throw new Error('Usuari no trobat')
      throw new Error('Error al carregar repos')
    }
    const data = await res.json()
    repos.value = data
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconegut'
  } finally {
    carregant.value = false
  }
}

// Watch para detectar canvis en el nom d'usuari
watch(() => usuari.value, () => {
  if (usuari.value.trim()) {
    carregarRepos()
  }
}, { debounce: 500 })

// Carregador inicial
onMounted(() => {
  carregarRepos()
})

const reposOrderades = computed(() => {
  return [...repos.value].sort((a, b) => b.stargazers_count - a.stargazers_count)
})

const reposPorLlenguatge = computed(() => {
  const agrupat: Record<string, number> = {}
  repos.value.forEach(r => {
    const lang = r.language || 'Altres'
    agrupat[lang] = (agrupat[lang] || 0) + 1
  })
  return agrupat
})

const statsGlobals = computed(() => {
  return {
    totalRepos: repos.value.length,
    starsTotal: repos.value.reduce((sum, r) => sum + r.stargazers_count, 0),
    forksTotal: repos.value.reduce((sum, r) => sum + r.forks_count, 0),
    starsMitjana: repos.value.length > 0 ? Math.round(repos.value.reduce((sum, r) => sum + r.stargazers_count, 0) / repos.value.length) : 0,
    repoPopular: repos.value.length > 0 ? repos.value.reduce((max, r) => r.stargazers_count > max.stargazers_count ? r : max) : null
  }
})
</script>

<template>
  <div class="page">
    <h1>Exercici 35 — GitHub Repos amb estadístiques</h1>
    <p class="subtitol">watch() paràmetres dinàmics, GitHub API, computed estadístiques complexes</p>

    <div class="card">
      <div class="header">
        <input 
          v-model="usuari" 
          placeholder="Escriu un usuari de GitHub..." 
          type="text"
        />
      </div>

      <div v-if="carregant" class="loading">⏳ Carregant repos...</div>
      <div v-else-if="error" class="error">❌ {{ error }}</div>
      <div v-else-if="repos.length === 0" class="info">Sin repos per aquest usuari</div>
      <div v-else>
        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat">
            <p class="label">Total repos</p>
            <p class="valor">{{ statsGlobals.totalRepos }}</p>
          </div>
          <div class="stat">
            <p class="label">Estrelles totals</p>
            <p class="valor">{{ statsGlobals.starsTotal.toLocaleString() }}</p>
          </div>
          <div class="stat">
            <p class="label">Forks totals</p>
            <p class="valor">{{ statsGlobals.forksTotal.toLocaleString() }}</p>
          </div>
          <div class="stat">
            <p class="label">Estelles mitjana</p>
            <p class="valor">{{ statsGlobals.starsMitjana }}</p>
          </div>
        </div>

        <!-- Repo popular -->
        <div v-if="statsGlobals.repoPopular" class="repo-popular">
          <p class="label">🏆 Repo més popular</p>
          <p class="nom">{{ statsGlobals.repoPopular.name }}</p>
          <p class="stars">⭐ {{ statsGlobals.repoPopular.stargazers_count }} stars</p>
        </div>

        <!-- Repos per llenguatge -->
        <div class="llenguatges">
          <p class="label">Repos per llenguatge</p>
          <div class="tags">
            <span v-for="(count, lang) in reposPorLlenguatge" :key="lang" class="tag">
              {{ lang }}: <strong>{{ count }}</strong>
            </span>
          </div>
        </div>

        <!-- Taula de repos -->
        <table class="taula">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Descripció</th>
              <th>⭐ Stars</th>
              <th>🔀 Forks</th>
              <th>Llenguatge</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in reposOrderades" :key="r.id">
              <td class="nom-repo">
                <a :href="`https://github.com/${usuari}/${r.name}`" target="_blank">
                  {{ r.name }}
                </a>
              </td>
              <td class="descripcio">{{ r.description || '—' }}</td>
              <td>{{ r.stargazers_count }}</td>
              <td>{{ r.forks_count }}</td>
              <td>{{ r.language || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header { margin-bottom: 16px; }
.header input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; }

.loading, .error, .info { padding: 20px; text-align: center; }
.error { color: #e74c3c; }
.info { color: #999; }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 16px; }
.stat { background: #f5f5f5; padding: 12px; border-radius: 6px; text-align: center; }
.stat .label { font-size: 0.75rem; color: #999; margin: 0; font-weight: bold; }
.stat .valor { font-size: 1.5rem; font-weight: bold; color: #42b883; margin: 4px 0 0 0; }

.repo-popular { background: #fffacd; padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 4px solid #f39c12; }
.repo-popular .label { font-size: 0.85rem; margin: 0; color: #666; }
.repo-popular .nom { font-weight: bold; font-size: 1rem; margin: 4px 0; color: #333; }
.repo-popular .stars { color: #f39c12; margin: 0; font-size: 0.9rem; }

.llenguatges { margin-bottom: 16px; }
.llenguatges .label { font-size: 0.9rem; font-weight: bold; color: #666; margin: 0 0 8px 0; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag { background: #e8f5e9; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; color: #2e7d32; }

.taula { width: 100%; border-collapse: collapse; margin-top: 12px; }
.taula th, .taula td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; font-size: 0.85rem; }
.taula th { background: #f5f5f5; font-weight: bold; }
.taula tr:hover { background: #fafafa; }
.taula .nom-repo a { color: #42b883; text-decoration: none; }
.taula .nom-repo a:hover { text-decoration: underline; }
.taula .descripcio { max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #999; }
</style>
