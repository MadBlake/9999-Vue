<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  valorInicial?: number
  min?: number
  max?: number
  pas?: number
}>()

const emit = defineEmits<{
  canvi: [valor: number]
}>()

const valor = ref(props.valorInicial ?? 0)

function incrementar() {
  const maxVal = props.max ?? Infinity
  const step   = props.pas ?? 1
  if (valor.value + step <= maxVal) { valor.value += step; emit('canvi', valor.value) }
}

function decrementar() {
  const minVal = props.min ?? -Infinity
  const step   = props.pas ?? 1
  if (valor.value - step >= minVal) { valor.value -= step; emit('canvi', valor.value) }
}
</script>

<template>
  <div class="comptador">
    <button @click="decrementar" :disabled="min !== undefined && valor <= min">−</button>
    <span class="valor">{{ valor }}</span>
    <button @click="incrementar" :disabled="max !== undefined && valor >= max">+</button>
  </div>
</template>

<style scoped>
.comptador { display: inline-flex; align-items: center; gap: 0; border: 2px solid #42b883; border-radius: 8px; overflow: hidden; }
.comptador button { background: #42b883; color: white; border: none; width: 36px; height: 36px; font-size: 1.2rem; font-weight: 700; cursor: pointer; }
.comptador button:disabled { background: #ccc; cursor: not-allowed; }
.valor { min-width: 48px; text-align: center; font-weight: 700; font-size: 1rem; padding: 0 8px; }
</style>
