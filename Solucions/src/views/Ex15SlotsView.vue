<script lang="ts">
import { defineComponent } from 'vue'
import TarjetaComp from '../components/ex15/TarjetaComp.vue'

export default defineComponent({
  name: 'Ex15SlotsView',
  components: { TarjetaComp },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 15 — Targeta amb slots</h1>
    <p class="subtitol">3 slots nomenats: capcalera, default, peu</p>

    <div class="targetes">
      <!-- Primer ús: contingut personalitzat en tots 3 slots -->
      <TarjetaComp>
        <template #capcalera>
          🌍 Viatge a París
        </template>
        <p>Explora la Torre Eiffel, el Louvre i passeja per Montmartre.</p>
        <p>Durada: <strong>5 dies</strong></p>
        <template #peu>
          Preu aproximat: 1.200 € per persona
        </template>
      </TarjetaComp>

      <!-- Segon ús: slot per defecte i peu personalitzat -->
      <TarjetaComp>
        <template #capcalera>
          🎓 Curs de Vue.js
        </template>
        <ul>
          <li>Sintaxi bàsica</li>
          <li>Components i props</li>
          <li>Vue Router</li>
          <li>Pinia (gestió d'estat)</li>
        </ul>
        <template #peu>
          Durada: 40h — Nivell: Intermedi
        </template>
      </TarjetaComp>
    </div>
  </div>
</template>

<style scoped>
.targetes { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px; }
</style>
