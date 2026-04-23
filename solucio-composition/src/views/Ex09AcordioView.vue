<script setup lang="ts">
import { reactive } from 'vue'

interface Faq { pregunta: string; resposta: string; oberta: boolean }

const faqs = reactive<Faq[]>([
  { pregunta: 'Què és Vue 3?', resposta: 'Vue 3 és un framework progressiu de JavaScript per construir interfícies d\'usuari. Inclou Composition API, Teleport i moltes millores de rendiment.', oberta: false },
  { pregunta: 'Diferència entre Options API i Composition API?', resposta: 'Options API organitza el codi per opcions (data, methods, computed...). Composition API organitza el codi per lògica de funcionalitat, usant funcions setup.', oberta: false },
  { pregunta: 'Què és ref() en Vue?', resposta: 'ref() crea una referència reactiva per a valors primitius. Cal accedir-hi amb .value al codi JS, però no cal al template HTML.', oberta: false },
  { pregunta: 'Quan usar reactive() vs ref()?', resposta: 'reactive() és per a objectes. ref() per a primitius. En general, ref() és més versàtil i es pot usar per a tot.', oberta: false },
])

function toggle(faq: Faq) { faq.oberta = !faq.oberta }
</script>

<template>
  <div class="page">
    <h1>Exercici 09 — Acordió FAQ</h1>
    <p class="subtitol">reactive(), toggle, v-show/v-if, transicions</p>
    <div class="card" style="padding:0;overflow:hidden">
      <div v-for="(faq, i) in faqs" :key="i" class="faq-item">
        <button class="faq-pregunta" @click="toggle(faq)">
          <span>{{ faq.pregunta }}</span>
          <span class="icona" :class="{ girada: faq.oberta }">▼</span>
        </button>
        <div v-show="faq.oberta" class="faq-resposta">
          {{ faq.resposta }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-item { border-bottom: 1px solid #e0e0e0; }
.faq-item:last-child { border-bottom: none; }
.faq-pregunta { width: 100%; background: none; border: none; padding: 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.95rem; font-weight: 600; text-align: left; }
.faq-pregunta:hover { background: #f8f8f8; }
.icona { transition: transform 0.25s; flex-shrink: 0; color: #42b883; }
.icona.girada { transform: rotate(180deg); }
.faq-resposta { padding: 0 16px 16px; color: #555; font-size: 0.9rem; line-height: 1.6; }
</style>
