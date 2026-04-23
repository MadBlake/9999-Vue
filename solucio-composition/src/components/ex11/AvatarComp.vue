<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  nom: string
  inicials: string
  color?: string
  mida?: string
}>()

const midesPx = computed(() => props.mida === 'gran' ? 96 : props.mida === 'petit' ? 48 : 72)
const fontPx  = computed(() => Math.round(midesPx.value * 0.38))
</script>

<template>
  <div class="avatar" :style="{
    width: midesPx + 'px',
    height: midesPx + 'px',
    background: color ?? '#42b883',
    fontSize: fontPx + 'px'
  }">
    {{ inicials.toUpperCase() }}
    <div class="tooltip">{{ nom }}</div>
  </div>
</template>

<style scoped>
.avatar {
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  cursor: default;
  position: relative;
  flex-shrink: 0;
  user-select: none;
}
.tooltip {
  display: none;
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
}
.avatar:hover .tooltip { display: block; }
</style>
