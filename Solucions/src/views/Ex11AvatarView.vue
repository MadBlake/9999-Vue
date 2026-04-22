<script lang="ts">
import { defineComponent } from 'vue'
import AvatarComp from '../components/ex11/AvatarComp.vue'

export default defineComponent({
  name: 'Ex11AvatarView',
  components: { AvatarComp },
  data() {
    return {
      avatars: [
        { nom: 'Joan Pérez', inicials: 'JP', color: '#42b883', mida: 'petit' as const },
        { nom: 'Maria Garcia', inicials: 'MG', color: '#2980b9', mida: 'mitjà' as const },
        { nom: 'Pau Martínez', inicials: 'PM', color: '#8e44ad', mida: 'gran' as const },
      ],
    }
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 11 — Component Avatar</h1>
    <p class="subtitol">Props: nom, inicials, color, mida — component reutilitzable</p>

    <div class="card">
      <h3>Avatars amb mides i colors personalitzats:</h3>
      <div class="fila-avatars">
        <AvatarComp
          v-for="av in avatars"
          :key="av.nom"
          :nom="av.nom"
          :inicials="av.inicials"
          :color="av.color"
          :mida="av.mida"
        />
      </div>
    </div>

    <div class="card">
      <h3>Valors per defecte (color i mida omesos):</h3>
      <div class="fila-avatars">
        <AvatarComp nom="Usuari Anònim" inicials="UA" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fila-avatars { display: flex; gap: 32px; align-items: flex-end; flex-wrap: wrap; margin-top: 12px; }
</style>
