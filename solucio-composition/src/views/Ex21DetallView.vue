<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { USUARIS, type Usuari } from '@/data/usuaris'

const route  = useRoute()
const usuari = ref<Usuari | null>(null)

onMounted(() => {
  const id = Number(route.params.id)
  usuari.value = USUARIS.find(u => u.id === id) ?? null
})
</script>

<template>
  <div class="page">
    <RouterLink to="/ex21" class="enrere">← Tornar a la llista</RouterLink>

    <div v-if="!usuari" class="card" style="text-align:center;color:#888;padding:40px">
      Usuari no trobat (id: {{ route.params.id }})
    </div>

    <div v-else class="card perfil">
      <div class="avatar-gran">{{ usuari.nom.charAt(0) + usuari.cognom.charAt(0) }}</div>
      <h2>{{ usuari.nom }} {{ usuari.cognom }}</h2>
      <span class="rol">{{ usuari.rol }}</span>
      <table class="dades">
        <tr><td>📧 Correu</td><td>{{ usuari.email }}</td></tr>
        <tr><td>🏙️ Ciutat</td><td>{{ usuari.ciutat }}</td></tr>
        <tr><td>🆔 ID</td><td>#{{ usuari.id }}</td></tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.enrere { display: inline-block; margin-bottom: 16px; color: #42b883; text-decoration: none; font-weight: 600; }
.perfil { text-align: center; }
.avatar-gran { width: 80px; height: 80px; border-radius: 50%; background: #42b883; color: white; font-size: 1.8rem; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
.rol { background: #42b88322; color: #42b883; font-weight: 700; font-size: 0.82rem; padding: 3px 12px; border-radius: 12px; }
.dades { margin: 18px auto 0; border-collapse: collapse; text-align: left; }
.dades td { padding: 7px 14px; border-bottom: 1px solid #f0f0f0; }
.dades td:first-child { color: #888; font-size: 0.88rem; }
</style>
