<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <div class="subcomp">
    <h4>📝 Formulari</h4>
    <label>
      Nom
      <input v-model="text" placeholder="Escriu aquí..." style="width:100%" />
    </label>
    <p style="margin-top:8px;color:#888;font-size:0.88rem">
      Text: "{{ text }}"
    </p>
    <p class="info">El text es conserva al canviar de pestanya (KeepAlive)</p>
  </div>
</template>

<style scoped>
.subcomp { padding: 8px 0; }
label { display: flex; flex-direction: column; gap: 6px; font-weight: 600; font-size: 0.9rem; }
.info { font-size: 0.8rem; color: #888; margin-top: 10px; }
</style>
