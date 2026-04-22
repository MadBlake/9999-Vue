<script lang="ts">
import { defineComponent } from 'vue'

interface Faq {
  id: number
  pregunta: string
  resposta: string
  oberta: boolean
}

export default defineComponent({
  name: 'Ex09AcordioView',
  data() {
    return {
      faqs: [
        {
          id: 1,
          pregunta: 'Què és Vue.js?',
          resposta: 'Vue.js és un framework progressiu de JavaScript per construir interfícies d\'usuari. Està dissenyat per ser adoptat incrementalment.',
          oberta: false,
        },
        {
          id: 2,
          pregunta: 'Quina diferència hi ha entre Options API i Composition API?',
          resposta: 'Options API organitza el codi per opcions (data, computed, methods). Composition API agrupa la lògica per funcionalitat amb setup(). Tots dos són vàlids.',
          oberta: false,
        },
        {
          id: 3,
          pregunta: 'Quan s\'utilitza computed vs methods?',
          resposta: 'Computed es fa servir quan el resultat depèn de dades reactives i es vol cache. Methods s\'executen cada vegada que es criden, sense cache.',
          oberta: false,
        },
        {
          id: 4,
          pregunta: 'Per a què serveix Vue Router?',
          resposta: 'Vue Router és la biblioteca oficial de routing per a Vue.js. Permet crear SPAs amb múltiples pàgines sense recarregar el navegador.',
          oberta: false,
        },
      ] as Faq[],
    }
  },
  methods: {
    toggle(id: number): void {
      const faq = this.faqs.find(f => f.id === id)
      if (faq) faq.oberta = !faq.oberta
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 9 — Acordió FAQ</h1>
    <p class="subtitol">Interface TypeScript, v-for, v-show, toggle per id</p>

    <div class="acordio">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="item"
        :class="{ oberta: faq.oberta }"
      >
        <button class="capçalera" @click="toggle(faq.id)">
          <span>{{ faq.pregunta }}</span>
          <span class="fletxa">{{ faq.oberta ? '▼' : '▶' }}</span>
        </button>
        <!-- v-show: oculta/mostra sense eliminar del DOM -->
        <div v-show="faq.oberta" class="contingut">
          <p>{{ faq.resposta }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.acordio { max-width: 640px; margin: 0 auto; }
.item { border: 1px solid #ddd; border-radius: 8px; margin-bottom: 8px; overflow: hidden; }
.item.oberta { border-color: #42b883; }
.capçalera {
  width: 100%; padding: 14px 16px; background: white; border: none;
  display: flex; justify-content: space-between; align-items: center;
  cursor: pointer; font-size: 1rem; font-weight: 600; text-align: left;
}
.item.oberta .capçalera { background: #f0faf5; color: #42b883; }
.fletxa { color: #42b883; font-size: 0.85rem; }
.contingut { padding: 12px 16px; background: white; border-top: 1px solid #e8f5e9; }
.contingut p { margin: 0; color: #555; line-height: 1.6; }
</style>
