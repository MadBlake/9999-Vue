<script setup lang="ts">
import { reactive, provide } from 'vue'
import PanellComp from '@/components/ex20/PanellComp.vue'

interface Tema { fosc: boolean; primari: string; fons: string; text: string }

const temaObj = reactive<Tema>({
  fosc: false,
  primari: '#42b883',
  fons: '#ffffff',
  text: '#1a1a2e',
})

provide('temaObj', temaObj)

const colors = ['#42b883', '#2980b9', '#8e44ad', '#e67e22', '#e74c3c']

function toggleFosc() {
  temaObj.fosc = !temaObj.fosc
  temaObj.fons = temaObj.fosc ? '#1a1a2e' : '#ffffff'
  temaObj.text = temaObj.fosc ? '#f0f0f0' : '#1a1a2e'
}
</script>

<template>
  <div class="page">
    <h1>Exercici 20 — Provide / Inject tema</h1>
    <p class="subtitol">provide() al pare, inject() al nét — prop drilling evitat</p>
    <div class="card">
      <h3>Controls del tema (proveïdor):</h3>
      <div class="controls">
        <button @click="toggleFosc">
          {{ temaObj.fosc ? '☀️ Mode clar' : '🌙 Mode fosc' }}
        </button>
        <div class="colors">
          <span style="font-size:0.85rem;color:#888">Color primari:</span>
          <button
            v-for="c in colors"
            :key="c"
            class="boto-color"
            :style="{ background: c, outline: temaObj.primari === c ? '2px solid #333' : 'none' }"
            @click="temaObj.primari = c"
          ></button>
        </div>
      </div>
    </div>
    <div class="card">
      <h3 style="margin-bottom:12px">Jerarquia de components:</h3>
      <p style="font-size:0.82rem;color:#888;margin-bottom:10px">
        Ex20TemaView (provide) → PanellComp → ContingutComp (inject)
      </p>
      <PanellComp />
    </div>
  </div>
</template>

<style scoped>
.controls { display: flex; flex-direction: column; gap: 12px; }
.colors { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.boto-color { width: 28px; height: 28px; border: none; border-radius: 50%; cursor: pointer; }
</style>
