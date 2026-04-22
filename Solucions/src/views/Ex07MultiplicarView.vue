<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Ex07MultiplicarView',
  data() {
    return {
      numero: 5,
    }
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 7 — Taula de multiplicar</h1>
    <p class="subtitol">v-model.number, v-for amb rang, :class condicional</p>

    <div class="card">
      <label>
        Número (1–10):
        <input v-model.number="numero" type="range" min="1" max="10" style="margin-left:10px" />
        <strong style="margin-left:8px;font-size:1.3rem">{{ numero }}</strong>
      </label>
    </div>

    <!-- v-for amb rang 1..10 -->
    <table class="taula">
      <thead>
        <tr>
          <th>Operació</th>
          <th>Resultat</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="n in 10"
          :key="n"
          :class="{ ressaltat: numero * n > 50 }"
        >
          <td>{{ numero }} × {{ n }}</td>
          <td><strong>{{ numero * n }}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.taula {
  width: 100%; max-width: 420px; border-collapse: collapse;
  margin: 16px auto 0;
}
.taula th, .taula td {
  border: 1px solid #ddd; padding: 9px 14px; text-align: center;
}
.taula th { background: #42b883; color: white; }
.taula tr.ressaltat { background: #fff3cd; }
</style>
