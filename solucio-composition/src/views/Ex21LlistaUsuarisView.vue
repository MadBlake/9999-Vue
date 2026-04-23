<script setup lang="ts">
import { USUARIS } from '@/data/usuaris'

const colors: Record<string, string> = { Admin: '#8e44ad', Editor: '#2980b9', Viewer: '#27ae60' }
</script>

<template>
  <div class="page">
    <h1>Exercici 21 — Llista d'usuaris</h1>
    <p class="subtitol">RouterLink amb :to dinàmic, $route.params al fill</p>
    <div class="card" style="padding:0;overflow:hidden">
      <RouterLink
        v-for="u in USUARIS"
        :key="u.id"
        :to="'/ex21/' + u.id"
        class="fila-usuari"
      >
        <div class="avatar" :style="{ background: colors[u.rol] }">
          {{ u.nom.charAt(0) + u.cognom.charAt(0) }}
        </div>
        <div class="info">
          <strong>{{ u.nom }} {{ u.cognom }}</strong>
          <span>{{ u.email }}</span>
        </div>
        <span class="rol" :style="{ background: colors[u.rol] + '22', color: colors[u.rol] }">
          {{ u.rol }}
        </span>
        <span class="fletxa">›</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.fila-usuari { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #f0f0f0; text-decoration: none; color: inherit; transition: background 0.15s; }
.fila-usuari:last-child { border-bottom: none; }
.fila-usuari:hover { background: #f8f8f8; }
.avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; font-size: 0.85rem; flex-shrink: 0; }
.info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.info span { font-size: 0.82rem; color: #888; }
.rol { font-size: 0.78rem; font-weight: 700; padding: 2px 10px; border-radius: 12px; flex-shrink: 0; }
.fletxa { color: #ccc; font-size: 1.3rem; }
</style>
