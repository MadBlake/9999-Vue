<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AvatarComp',
  props: {
    nom: {
      type: String,
      required: true,
    },
    inicials: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#42b883',
    },
    mida: {
      type: String as () => 'petit' | 'mitjà' | 'gran',
      default: 'mitjà',
    },
  },
  computed: {
    midesPx(): number {
      return this.mida === 'petit' ? 48 : this.mida === 'gran' ? 96 : 72
    },
    fontPx(): number {
      return Math.round(this.midesPx * 0.38)
    },
  },
})
</script>

<template>
  <div class="avatar-wrapper">
    <div
      class="cercle"
      :style="{
        width: midesPx + 'px',
        height: midesPx + 'px',
        background: color,
        fontSize: fontPx + 'px',
      }"
    >
      {{ inicials.toUpperCase() }}
    </div>
    <span class="nom-text">{{ nom }}</span>
  </div>
</template>

<style scoped>
.avatar-wrapper { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.cercle {
  border-radius: 50%; color: white; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  user-select: none;
}
.nom-text { font-size: 0.85rem; color: #555; }
</style>
