<script setup lang="ts">
import { ref } from 'vue'

const compte = ref(0)
</script>

<template>
  <div class="subcomp">
    <h4>🔢 Comptador</h4>
    <p>Valor: <strong>{{ compte }}</strong></p>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button @click="compte--">−</button>
      <button @click="compte++">+</button>
      <button @click="compte = 0" style="background:#e74c3c">Reset</button>
    </div>
    <p class="info">L'estat es conserva amb &lt;KeepAlive&gt;</p>
  </div>
</template>

<style scoped>
.subcomp { padding: 8px 0; }
.info { font-size: 0.8rem; color: #888; margin-top: 10px; }
</style>
