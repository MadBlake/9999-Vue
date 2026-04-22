<script lang="ts">
import { defineComponent } from 'vue'

type Variant = 'primari' | 'secundari' | 'perill'

export default defineComponent({
  name: 'BotoComp',
  props: {
    etiqueta: {
      type: String,
      required: true,
    },
    variant: {
      type: String as () => Variant,
      default: 'primari',
    },
    desactivat: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['clicat'],
  methods: {
    gestionar(): void {
      if (!this.desactivat) {
        this.$emit('clicat', this.etiqueta)
      }
    },
  },
})
</script>

<template>
  <button
    class="boto"
    :class="variant"
    :disabled="desactivat"
    @click="gestionar"
  >
    {{ etiqueta }}
  </button>
</template>

<style scoped>
.boto {
  padding: 10px 22px; border: none; border-radius: 6px;
  font-size: 1rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s;
}
.boto:disabled { opacity: 0.45; cursor: not-allowed; }
.primari  { background: #42b883; color: white; }
.primari:not(:disabled):hover  { background: #3aa876; }
.secundari { background: #e0e0e0; color: #333; }
.secundari:not(:disabled):hover { background: #cacaca; }
.perill   { background: #e74c3c; color: white; }
.perill:not(:disabled):hover   { background: #c0392b; }
</style>
