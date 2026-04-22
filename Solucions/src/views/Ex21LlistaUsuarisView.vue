<script lang="ts">
import { defineComponent } from 'vue'

interface Usuari {
  id: number
  nom: string
  rol: string
  email: string
}

export const USUARIS: Usuari[] = [
  { id: 1, nom: 'Joan Pérez', rol: 'Admin', email: 'joan@exemple.cat' },
  { id: 2, nom: 'Maria Garcia', rol: 'Editor', email: 'maria@exemple.cat' },
  { id: 3, nom: 'Pau Martínez', rol: 'Viewer', email: 'pau@exemple.cat' },
  { id: 4, nom: 'Anna López', rol: 'Editor', email: 'anna@exemple.cat' },
  { id: 5, nom: 'Marc Sánchez', rol: 'Viewer', email: 'marc@exemple.cat' },
]

export default defineComponent({
  name: 'Ex21LlistaUsuarisView',
  data() {
    return {
      usuaris: USUARIS,
    }
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 21 — Navegació amb paràmetres</h1>
    <p class="subtitol">RouterLink amb :to dinàmic, $route.params.id en la vista de detall</p>

    <div class="card">
      <h3>Llista d'usuaris</h3>
      <ul class="llista">
        <li v-for="u in usuaris" :key="u.id" class="usuari-item">
          <RouterLink :to="'/ex21/' + u.id" class="link-usuari">
            <span class="avatar-mini">{{ u.nom.charAt(0) }}</span>
            <span class="info">
              <strong>{{ u.nom }}</strong>
              <em>{{ u.rol }}</em>
            </span>
            <span class="fletxa">›</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.llista { list-style: none; padding: 0; margin: 8px 0 0; }
.usuari-item { border-bottom: 1px solid #eee; }
.usuari-item:last-child { border-bottom: none; }
.link-usuari {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 8px; text-decoration: none; color: inherit;
}
.link-usuari:hover { background: #f0faf5; border-radius: 6px; }
.avatar-mini {
  width: 38px; height: 38px; border-radius: 50%; background: #42b883;
  color: white; font-weight: 700; font-size: 1.1rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.info em { font-size: 0.82rem; color: #888; font-style: normal; }
.fletxa { color: #bbb; font-size: 1.4rem; }
</style>
