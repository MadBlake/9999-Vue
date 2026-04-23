<script setup lang="ts">
import AvatarComp from '@/components/ex11/AvatarComp.vue'
</script>

<template>
  <div class="page">
    <h1>Exercici 11 — Component Avatar</h1>
    <p class="subtitol">defineProps&lt;&gt;(), computed(), :style binding</p>

    <div class="card">
      <h3>Mides</h3>
      <div class="fila-avatars">
        <AvatarComp nom="Petit" inicials="P" mida="petit" color="#8e44ad" />
        <AvatarComp nom="Normal" inicials="N" color="#2980b9" />
        <AvatarComp nom="Gran" inicials="G" mida="gran" color="#e67e22" />
      </div>
    </div>

    <div class="card">
      <h3>Colors i inicials</h3>
      <div class="fila-avatars">
        <AvatarComp nom="Anna Puig" inicials="AP" color="#e74c3c" />
        <AvatarComp nom="Bernat Cas" inicials="BC" color="#27ae60" />
        <AvatarComp nom="Carles Mir" inicials="CM" color="#f39c12" />
        <AvatarComp nom="Dora Font" inicials="DF" color="#1abc9c" />
        <AvatarComp nom="Eduard Mas" inicials="EM" color="#8e44ad" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fila-avatars { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
</style>
