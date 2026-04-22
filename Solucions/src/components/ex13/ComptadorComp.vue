<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComptadorComp',
  props: {
    id: {
      type: Number,
      required: true,
    },
    valorInicial: {
      type: Number,
      default: 0,
    },
    etiqueta: {
      type: String,
      default: 'Comptador',
    },
  },
  emits: ['actualitzat'],
  data() {
    return {
      valor: this.valorInicial,
    }
  },
  methods: {
    incrementar(): void {
      this.valor++
      this.$emit('actualitzat', { id: this.id, valor: this.valor })
    },
    decrementar(): void {
      if (this.valor > 0) {
        this.valor--
        this.$emit('actualitzat', { id: this.id, valor: this.valor })
      }
    },
  },
})
</script>

<template>
  <div class="comp-comptador">
    <p class="etiqueta">{{ etiqueta }}</p>
    <div class="controls">
      <button @click="decrementar" :disabled="valor === 0">−</button>
      <span class="valor">{{ valor }}</span>
      <button @click="incrementar">+</button>
    </div>
  </div>
</template>

<style scoped>
.comp-comptador {
  border: 2px solid #e0e0e0; border-radius: 10px;
  padding: 16px 20px; text-align: center; min-width: 130px;
}
.etiqueta { margin: 0 0 10px; font-weight: 600; font-size: 0.95rem; color: #555; }
.controls { display: flex; align-items: center; justify-content: center; gap: 10px; }
.valor { font-size: 1.8rem; font-weight: 700; min-width: 40px; }
button { width: 34px; height: 34px; font-size: 1.3rem; border-radius: 6px; }
button:disabled { opacity: 0.35; }
</style>
