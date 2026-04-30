<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Usuari {
  id: number
  name: string
  email: string
}

const usuaris = ref<Usuari[]>([])
const carregant = ref(false)
const error = ref('')

onMounted(async () => {
  carregant.value = true
  error.value = ''
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error('Error al carregar')
    usuaris.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconegut'
  } finally {
    carregant.value = false
  }
})
</script>

<template>
  <div class="page">
    <h1>Exercici 27 — Fetch bàsic amb loading</h1>
    <p class="subtitol">ref(), onMounted(), async/await, error handling</p>

    <div class="card">
      <div v-if="carregant" class="loading">⏳ Carregant...</div>
      <div v-else-if="error" class="error">❌ {{ error }}</div>
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
.loading, .error { padding: 20px; text-align: center; font-size: 1.1rem; }
.error { color: #e74c3c; }
.taula { width: 100%; border-collapse: collapse; }
.taula th, .taula td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
.taula th { background: #f5f5f5; font-weight: bold; }
.taula tr:hover { background: #fafafa; }
</style>
