<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

interface Usuari {
  id: number
  name: string
}

const posts = ref<Post[]>([])
const usuaris = ref<Usuari[]>([])
const carregant = ref(false)
const error = ref('')
const filtreAutor = ref<number | ''>('')

interface PostAmbAutor extends Post {
  autorNom: string
}

onMounted(async () => {
  carregant.value = true
  error.value = ''
  try {
    const [resPosts, resUsuaris] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/users')
    ])
    if (!resPosts.ok || !resUsuaris.ok) throw new Error('Error al carregar')
    posts.value = await resPosts.json()
    usuaris.value = await resUsuaris.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconegut'
  } finally {
    carregant.value = false
  }
})

const postsAmbAutor = computed<PostAmbAutor[]>(() => {
  return posts.value.map(p => {
    const autor = usuaris.value.find(u => u.id === p.userId)
    return { ...p, autorNom: autor?.name || 'Desconegut' }
  })
})

const postsFiltrats = computed(() => {
  if (filtreAutor.value === '') return postsAmbAutor.value
  return postsAmbAutor.value.filter(p => p.userId === filtreAutor.value)
})

const estatsAutors = computed(() => {
  const stats: Record<number, { nom: string; count: number }> = {}
  postsAmbAutor.value.forEach(p => {
    if (!stats[p.userId]) {
      stats[p.userId] = { nom: p.autorNom, count: 0 }
    }
    stats[p.userId].count++
  })
  return stats
})

const postMesLlarg = computed(() => {
  if (!postsAmbAutor.value.length) return null
  return [...postsAmbAutor.value].sort((a, b) => b.body.length - a.body.length)[0]
})

const mitjanaPostsPerAutor = computed(() => {
  if (!usuaris.value.length) return 0
  return Math.round(posts.value.length / usuaris.value.length)
})
</script>

<template>
  <div class="page">
    <h1>Exercici 30 — Transformació de dades amb computed</h1>
    <p class="subtitol">Promise.all, unió de dades, computed complexos</p>

    <div class="card">
      <div v-if="carregant" class="loading">⏳ Carregant...</div>
      <div v-else-if="error" class="error">❌ {{ error }}</div>
      <div v-else>
        <!-- Stats -->
        <div class="stats">
          <div class="stat">
            <p class="label">Total posts</p>
            <p class="valor">{{ posts.length }}</p>
          </div>
          <div class="stat">
            <p class="label">Mitjana posts/autor</p>
            <p class="valor">{{ mitjanaPostsPerAutor }}</p>
          </div>
          <div class="stat v-if="postMesLlarg">
            <p class="label">Post més llarg</p>
            <p class="valor">{{ postMesLlarg.body.length }} caràcters</p>
          </div>
        </div>

        <!-- Filtre d'autor -->
        <label style="margin: 16px 0 12px 0; display: block;">
          Filtrar per autor:
          <select v-model.number="filtreAutor" style="margin-left: 8px; padding: 6px;">
            <option :value="''">Tots ({{ posts.length }})</option>
            <option v-for="(stat, userId) in estatsAutors" :key="userId" :value="Number(userId)">
              {{ stat.nom }} ({{ stat.count }})
            </option>
          </select>
        </label>

        <!-- Taula de posts -->
        <table class="taula">
          <thead>
            <tr>
              <th>ID</th>
              <th>Títol</th>
              <th>Autor</th>
              <th>Caràcters</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in postsFiltrats" :key="p.id" class="fila-post">
              <td>{{ p.id }}</td>
              <td class="titol">{{ p.title }}</td>
              <td>{{ p.autorNom }}</td>
              <td>{{ p.body.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading, .error { padding: 20px; text-align: center; }
.error { color: #e74c3c; }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 16px; }
.stat { background: #f5f5f5; padding: 12px; border-radius: 6px; text-align: center; }
.stat .label { font-size: 0.8rem; color: #999; margin: 0; }
.stat .valor { font-size: 1.5rem; font-weight: bold; color: #42b883; margin: 4px 0 0 0; }
.taula { width: 100%; border-collapse: collapse; margin-top: 12px; }
.taula th, .taula td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; font-size: 0.9rem; }
.taula th { background: #f5f5f5; font-weight: bold; }
.taula .fila-post:hover { background: #fafafa; }
.taula .titol { max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
