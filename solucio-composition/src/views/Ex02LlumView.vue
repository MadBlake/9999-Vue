<script setup lang="ts">
import { ref } from 'vue'

const encesa = ref(false)
</script>

<template>
  <div class="page">
    <h1>Exercici 02 — Commutador de llum</h1>
    <p class="subtitol">ref() boolean, :class dinàmic, @click</p>
    <div class="card" style="text-align:center">
      <div class="bombeta" :class="encesa ? 'encesa' : 'apagada'">
        {{ encesa ? '💡' : '🌑' }}
      </div>
      <p style="margin:12px 0">La llum està <strong>{{ encesa ? 'encesa' : 'apagada' }}</strong></p>
      <button @click="encesa = !encesa">
        {{ encesa ? 'Apagar' : 'Engegar' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.bombeta { font-size: 4rem; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; transition: all 0.3s; }
.encesa  { background: #fff9c4; box-shadow: 0 0 30px #f9a825; }
.apagada { background: #e0e0e0; }
</style>
