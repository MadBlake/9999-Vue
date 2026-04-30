<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Comentari {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const comentaris = ref<Comentari[]>([])
const carregant = ref(false)
const error = ref('')
const busqueda = ref('')
const filtreEmail = ref('')

onMounted(async () => {
  carregant.value = true
  error.value = ''
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
    if (!res.ok) throw new Error('Error al carregar')
    comentaris.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconegut'
  } finally {
    carregant.value = false
  }
})

const emailsUnics = computed(() => {
  const emails = new Set<string>()
  comentaris.value.forEach(c => emails.add(c.email))
  return Array.from(emails).sort()
})

const comentarisFiltrats = computed(() => {
  return comentaris.value.filter(c => {
    const coincideixTexto = !busqueda.value || 
      c.body.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      c.name.toLowerCase().includes(busqueda.value.toLowerCase())
    
    const coincideixEmail = !filtreEmail.value || c.email === filtreEmail.value
    
    return coincideixTexto && coincideixEmail
  })
})

const resultatCount = computed(() => comentarisFiltrats.value.length)
</script>

<template>
  <div class="page">
    <h1>Exercici 32 — Filtre de comentaris amb API</h1>
    <p class="subtitol">watch() múltiple, computed amb lògica condicional, filtres combinats</p>

    <div class="card">
      <div v-if="carregant" class="loading">⏳ Carregant...</div>
      <div v-else-if="error" class="error">❌ {{ error }}</div>
      <div v-else>
        <!-- Filtres -->
        <div class="filtres">
          <input v-model="busqueda" placeholder="Buscar per text..." />
          <select v-model="filtreEmail">
            <option value="">Tots els emails</option>
            <option v-for="email in emailsUnics" :key="email" :value="email">
              {{ email }}
            </option>
          </select>
        </div>

        <p class="info">{{ resultatCount }} comentaris trobats</p>

        <!-- Taula -->
        <table class="taula">
          <thead>
            <tr>
              <th>Email</th>
              <th>Nom</th>
              <th>Comentari</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in comentarisFiltrats" :key="c.id">
              <td class="email">{{ c.email }}</td>
              <td>{{ c.name }}</td>
              <td class="body">{{ c.body }}</td>
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
.filtres { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.filtres input, .filtres select { flex: 1; min-width: 150px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
.info { color: #666; margin-bottom: 12px; font-size: 0.9rem; }
.taula { width: 100%; border-collapse: collapse; }
.taula th, .taula td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; font-size: 0.9rem; }
.taula th { background: #f5f5f5; font-weight: bold; }
.taula tr:hover { background: #fafafa; }
.taula .email { font-weight: 500; }
.taula .body { max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
