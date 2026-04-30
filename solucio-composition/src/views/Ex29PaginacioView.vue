<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const posts = ref<Post[]>([])
const paginaActual = ref(1)
const carregant = ref(false)
const error = ref('')
const itemsPerPagina = 10

onMounted(async () => {
  carregant.value = true
  error.value = ''
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!res.ok) throw new Error('Error al carregar posts')
    posts.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconegut'
  } finally {
    carregant.value = false
  }
})

const totalPagines = computed(() => Math.ceil(posts.value.length / itemsPerPagina))

const postsFiltrats = computed(() => {
  const inicio = (paginaActual.value - 1) * itemsPerPagina
  const fin = inicio + itemsPerPagina
  return posts.value.slice(inicio, fin)
})

const puedeAnterior = computed(() => paginaActual.value > 1)
const puedeSeguent = computed(() => paginaActual.value < totalPagines.value)

function anterior() {
  if (puedeAnterior.value) paginaActual.value--
}

function seguent() {
  if (puedeSeguent.value) paginaActual.value++
}
</script>

<template>
  <div class="page">
    <h1>Exercici 29 — Llista de posts amb paginació</h1>
    <p class="subtitol">computed() amb slice, navegació entre pàgines, control de botons</p>

    <div class="card">
      <div v-if="carregant" class="loading">⏳ Carregant...</div>
      <div v-else-if="error" class="error">❌ {{ error }}</div>
      <div v-else>
        <!-- Posts -->
        <div class="posts-list">
          <article v-for="post in postsFiltrats" :key="post.id" class="post-item">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <small style="color: #999">Post #{{ post.id }} per usuari #{{ post.userId }}</small>
          </article>
        </div>

        <!-- Paginació -->
        <div class="paginacio">
          <button :disabled="!puedeAnterior" @click="anterior">← Anterior</button>
          <span class="info-pagina">
            Pàgina {{ paginaActual }} de {{ totalPagines }}
          </span>
          <button :disabled="!puedeSeguent" @click="seguent">Següent →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading, .error { padding: 20px; text-align: center; font-size: 1rem; }
.error { color: #e74c3c; }
.posts-list { display: grid; gap: 12px; margin-bottom: 16px; max-height: 500px; overflow-y: auto; }
.post-item { padding: 12px; background: #f9f9f9; border-left: 4px solid #42b883; border-radius: 4px; }
.post-item h3 { margin: 0 0 8px 0; color: #333; font-size: 1rem; }
.post-item p { margin: 0; color: #666; font-size: 0.9rem; line-height: 1.4; }
.paginacio { display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 16px; }
.info-pagina { font-weight: bold; color: #666; }
.paginacio button { padding: 8px 16px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s; }
.paginacio button:hover:not(:disabled) { background: #369970; transform: scale(1.05); }
.paginacio button:disabled { background: #ccc; cursor: not-allowed; }
</style>
