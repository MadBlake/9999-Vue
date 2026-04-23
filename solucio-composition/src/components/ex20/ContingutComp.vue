<script setup lang="ts">
import { inject, computed } from 'vue'

interface Tema { fosc: boolean; primari: string; fons: string; text: string }

const tema = inject<Tema>('temaObj')!
const estil = computed(() => ({ background: tema.fons, color: tema.text, borderColor: tema.primari }))
</script>

<template>
  <div class="contingut" :style="estil">
    <h4>Contingut injectat</h4>
    <p>Sóc un component fill que rep el tema via <code>inject()</code>.</p>
    <p>Color primari: <strong :style="{ color: tema.primari }">{{ tema.primari }}</strong></p>
    <p>Mode: <strong>{{ tema.fosc ? 'Fosc' : 'Clar' }}</strong></p>
  </div>
</template>

<style scoped>
.contingut { border: 2px solid; border-radius: 8px; padding: 14px; transition: all 0.3s; }
code { font-family: monospace; background: #0002; padding: 1px 4px; border-radius: 3px; }
</style>
