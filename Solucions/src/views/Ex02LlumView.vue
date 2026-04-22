<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Ex02LlumView',
  data() {
    return {
      encesa: false,
    }
  },
  methods: {
    toggle(): void {
      this.encesa = !this.encesa
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 2 — Commutador de llum</h1>
    <p class="subtitol">data() booleà, @click, :class dinàmic</p>

    <!-- :class: afegeix 'encesa' o 'apagada' depenent del valor boolean -->
    <div class="card habitacio" :class="encesa ? 'encesa' : 'apagada'">
      <div class="bombeta">{{ encesa ? '💡' : '🌑' }}</div>
      <p class="estat">Llum {{ encesa ? 'encesa' : 'apagada' }}</p>
      <!-- @click: crida el mètode toggle -->
      <button @click="toggle" :class="encesa ? 'btn-apagar' : 'btn-encendre'">
        {{ encesa ? 'Apagar' : 'Encendre' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.habitacio {
  text-align: center;
  padding: 40px;
  transition: all 0.3s;
  border-radius: 10px;
}
.encesa { background: #fffde7; border-color: #f9c74f !important; }
.apagada { background: #2c2c3e; border-color: #444 !important; }
.bombeta { font-size: 4rem; margin-bottom: 12px; }
.estat { font-size: 1.2rem; font-weight: 700; margin-bottom: 16px; color: inherit; }
.encesa .estat { color: #555; }
.apagada .estat { color: #ccc; }
.btn-encendre { background: #f9c74f; color: #333; }
.btn-apagar { background: #555; color: white; }
</style>
