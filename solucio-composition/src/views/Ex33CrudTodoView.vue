<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const nouText = ref('')
const carregant = ref(false)
const error = ref('')
let nextId = 101

onMounted(async () => {
  carregant.value = true
  error.value = ''
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    if (!res.ok) throw new Error('Error al carregar')
    const data = await res.json()
    todos.value = data
    nextId = Math.max(...data.map((t: Todo) => t.id)) + 1
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error desconegut'
  } finally {
    carregant.value = false
  }
})

const pendents = computed(() => todos.value.filter(t => !t.completed).length)
const completades = computed(() => todos.value.filter(t => t.completed).length)
const progressPercent = computed(() => 
  todos.value.length > 0 ? Math.round((completades.value / todos.value.length) * 100) : 0
)

function afegir() {
  const text = nouText.value.trim()
  if (!text) return
  
  const novaTodo: Todo = {
    userId: 1,
    id: nextId++,
    title: text,
    completed: false
  }
  todos.value.push(novaTodo)
  nouText.value = ''
}

function eliminar(id: number) {
  if (confirm('Estàs segur?')) {
    todos.value = todos.value.filter(t => t.id !== id)
  }
}

function editarTitol(id: number, nouTitol: string) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.title = nouTitol
  }
}

function marcarCompletada(id: number) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
</script>

<template>
  <div class="page">
    <h1>Exercici 33 — CRUD de tasques amb TODO API</h1>
    <p class="subtitol">Create, Read, Update, Delete, simulació de POST/PUT/DELETE</p>

    <div class="card">
      <div v-if="carregant" class="loading">⏳ Carregant...</div>
      <div v-else-if="error" class="error">❌ {{ error }}</div>
      <div v-else>
        <!-- Formulari d'afegir -->
        <div class="afegir-form">
          <input v-model="nouText" placeholder="Nova tasca..." @keyup.enter="afegir" />
          <button :disabled="!nouText.trim()" @click="afegir">+ Afegir</button>
        </div>

        <!-- Stats -->
        <div class="stats">
          <div class="stat">
            <p class="label">Pendent</p>
            <p class="valor">{{ pendents }}</p>
          </div>
          <div class="stat">
            <p class="label">Completada</p>
            <p class="valor">{{ completades }}</p>
          </div>
          <div class="stat">
            <p class="label">Progrés</p>
            <p class="valor">{{ progressPercent }}%</p>
          </div>
        </div>

        <!-- Barra de progrés -->
        <div class="barra-p">
          <div class="barra-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>

        <!-- Llista de tasques -->
        <ul class="llista">
          <li v-for="todo in todos" :key="todo.id" :class="{ completada: todo.completed }">
            <input type="checkbox" :checked="todo.completed" @change="marcarCompletada(todo.id)" />
            <input 
              type="text" 
              :value="todo.title" 
              @input="editarTitol(todo.id, ($event.target as HTMLInputElement).value)"
              class="text-input"
            />
            <button class="btn-eliminar" @click="eliminar(todo.id)">✕</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading, .error { padding: 20px; text-align: center; }
.error { color: #e74c3c; }
.afegir-form { display: flex; gap: 8px; margin-bottom: 16px; }
.afegir-form input { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
.afegir-form button { padding: 8px 16px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
.afegir-form button:disabled { background: #ccc; cursor: not-allowed; }

.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.stat { background: #f5f5f5; padding: 12px; border-radius: 6px; text-align: center; }
.stat .label { font-size: 0.8rem; color: #999; margin: 0; }
.stat .valor { font-size: 1.5rem; font-weight: bold; color: #42b883; margin: 4px 0 0 0; }

.barra-p { height: 6px; background: #e0e0e0; border-radius: 3px; margin-bottom: 16px; }
.barra-fill { height: 100%; background: #42b883; border-radius: 3px; transition: width 0.3s; }

.llista { list-style: none; padding: 0; }
.llista li { display: flex; align-items: center; gap: 10px; padding: 10px; border-bottom: 1px solid #f0f0f0; transition: background 0.3s; }
.llista li:hover { background: #f9f9f9; }
.llista li.completada .text-input { text-decoration: line-through; color: #999; }
.text-input { flex: 1; padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 0.9rem; }
.btn-eliminar { background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
.btn-eliminar:hover { background: #c0392b; }
</style>
