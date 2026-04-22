<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'InputValidat',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    etiqueta: {
      type: String,
      default: 'Camp',
    },
    regla: {
      type: Function as PropType<(v: string) => string | null>,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    error(): string | null {
      if (!this.regla) return null
      return this.regla(this.modelValue)
    },
    teError(): boolean {
      return this.error !== null && this.modelValue !== ''
    },
  },
  methods: {
    onInput(e: Event): void {
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value)
    },
  },
})
</script>

<template>
  <div class="input-validat">
    <label>{{ etiqueta }}</label>
    <input
      :value="modelValue"
      :class="{ invalid: teError }"
      @input="onInput"
    />
    <p v-if="teError" class="missatge-error">{{ error }}</p>
  </div>
</template>

<style scoped>
.input-validat { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
label { font-weight: 600; font-size: 0.9rem; }
input.invalid { border-color: #e74c3c; }
.missatge-error { color: #e74c3c; font-size: 0.82rem; margin: 0; }
</style>
