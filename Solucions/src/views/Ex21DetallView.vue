<script lang="ts">
import { defineComponent } from 'vue'
import { USUARIS } from './Ex21LlistaUsuarisView.vue'

interface Usuari {
  id: number
  nom: string
  rol: string
  email: string
}

export default defineComponent({
  name: 'Ex21DetallView',
  data() {
    return {
      usuari: null as Usuari | null,
    }
  },
  mounted(): void {
    const idParam = this.$route.params.id
    const id = parseInt(String(idParam), 10)
    this.usuari = USUARIS.find(u => u.id === id) ?? null
  },
})
</script>

<template>
  <div class="page">
    <RouterLink to="/ex21" class="tornar">← Tornar a la llista</RouterLink>

    <div v-if="usuari" class="card detall">
      <div class="avatar-gran">{{ usuari.nom.charAt(0) }}</div>
      <h2>{{ usuari.nom }}</h2>
      <span class="rol-badge">{{ usuari.rol }}</span>
      <table class="taula-info">
        <tr>
          <th>ID</th>
          <td>#{{ usuari.id }}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{{ usuari.email }}</td>
        </tr>
        <tr>
          <th>Rol</th>
          <td>{{ usuari.rol }}</td>
        </tr>
      </table>
    </div>

    <div v-else class="card" style="text-align:center;padding:40px">
      <p style="font-size:2rem">❓</p>
      <p>Usuari no trobat.</p>
    </div>
  </div>
</template>

<style scoped>
.tornar {
  display: inline-block; margin-bottom: 14px;
  color: #42b883; text-decoration: none; font-weight: 600;
}
.tornar:hover { text-decoration: underline; }
.detall { text-align: center; max-width: 380px; }
.avatar-gran {
  width: 80px; height: 80px; border-radius: 50%; background: #42b883;
  color: white; font-size: 2rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px;
}
.detall h2 { margin: 0 0 8px; }
.rol-badge {
  background: #e8f5e9; color: #27ae60;
  padding: 3px 12px; border-radius: 20px; font-size: 0.85rem;
}
.taula-info { width: 100%; margin-top: 16px; border-collapse: collapse; }
.taula-info th, .taula-info td {
  padding: 9px 12px; border: 1px solid #eee; text-align: left;
}
.taula-info th { background: #f9f9f9; width: 80px; }
</style>
