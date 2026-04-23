<script setup lang="ts">
import TarjetaComp from '@/components/ex15/TarjetaComp.vue'
</script>

<template>
  <div class="page">
    <h1>Exercici 15 — Targeta amb slots</h1>
    <p class="subtitol">slots nomenats (cap, default, peu) — contingut des del pare</p>
    <div class="grid">
      <TarjetaComp>
        <template #cap>🎓 Curs de Vue 3</template>
        <p>Aprèn Vue 3 des de zero: Composition API, Router, Pinia i molt més.</p>
        <p style="margin-top:8px">⏱ Durada: 40 hores</p>
        <template #peu>Dificultat: Mitjana</template>
      </TarjetaComp>

      <TarjetaComp>
        <template #cap>🚀 Projecte Final</template>
        <p>Crea una aplicació completa amb Vue 3 + TypeScript + API REST.</p>
        <ul style="margin-top:8px;padding-left:18px">
          <li>Autenticació JWT</li>
          <li>CRUD complet</li>
          <li>Desplegament</li>
        </ul>
        <template #peu>Dificultat: Avançada</template>
      </TarjetaComp>

      <TarjetaComp>
        <template #cap>📖 Documentació</template>
        <p>La documentació oficial de Vue 3 és excel·lent i inclou exemples interactius.</p>
        <template #peu>
          <a href="https://vuejs.org" target="_blank">vuejs.org ↗</a>
        </template>
      </TarjetaComp>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-top: 8px; }
</style>
