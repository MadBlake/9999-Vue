<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContingutComp',
  inject: {
    temaObj: { from: 'temaObj', default: () => ({ color: '#42b883', fosc: false }) },
  },
  computed: {
    tema(): { color: string; fosc: boolean } {
      return this.temaObj as { color: string; fosc: boolean }
    },
  },
})
</script>

<template>
  <div
    class="contingut-injectat"
    :style="{
      background: tema.fosc ? '#1a1a2e' : '#f9f9f9',
      color: tema.fosc ? '#eee' : '#333',
      borderColor: tema.color,
    }"
  >
    <p><strong>Component ContingutComp</strong></p>
    <p>Color del tema (injectat): <strong :style="{ color: tema.color }">{{ tema.color }}</strong></p>
    <p>Mode fosc: <strong>{{ tema.fosc ? 'Sí ✅' : 'No ❌' }}</strong></p>
    <p style="font-size:0.8rem;opacity:0.65">
      (Injectat amb inject: ['temaObj'] — dades de l'avantpassat)
    </p>
  </div>
</template>

<style scoped>
.contingut-injectat {
  border: 2px solid; border-radius: 8px;
  padding: 14px; transition: all 0.3s;
}
</style>
