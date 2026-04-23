<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  etiqueta?: string
  placeholder?: string
  regla?: (v: string) => string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const error = computed(() => props.regla ? props.regla(props.modelValue) : null)

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="camp">
    <span v-if="etiqueta" class="etiqueta">{{ etiqueta }}</span>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :class="{ invalid: error !== null }"
      @input="onInput"
    />
    <span v-if="error" class="missatge-error">{{ error }}</span>
  </label>
</template>

<style scoped>
.camp { display: flex; flex-direction: column; gap: 4px; }
.etiqueta { font-size: 0.85rem; font-weight: 700; color: #333; }
input { border: 1.5px solid #ccc; border-radius: 6px; padding: 7px 10px; font-size: 0.9rem; }
input.invalid { border-color: #e74c3c; background: #fff5f5; }
.missatge-error { color: #e74c3c; font-size: 0.8rem; }
</style>
