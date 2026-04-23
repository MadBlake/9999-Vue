<script setup lang="ts">
const props = defineProps<{
  etiqueta: string
  tipus?: 'primari' | 'secundari' | 'perill'
  desactivat?: boolean
}>()

const emit = defineEmits<{
  clicat: [etiqueta: string]
}>()

function handleClick() {
  if (!props.desactivat) emit('clicat', props.etiqueta)
}
</script>

<template>
  <button
    class="boto"
    :class="[tipus ?? 'primari', { desactivat }]"
    :disabled="desactivat"
    @click="handleClick"
  >
    <slot>{{ etiqueta }}</slot>
  </button>
</template>

<style scoped>
.boto {
  border: none;
  border-radius: 6px;
  padding: 9px 22px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  transition: opacity 0.15s;
}
.boto:hover:not(:disabled) { opacity: 0.82; }
.primari   { background: #42b883; color: white; }
.secundari { background: #ecf0f1; color: #333; }
.perill    { background: #e74c3c; color: white; }
.desactivat { opacity: 0.45; cursor: not-allowed; }
</style>
