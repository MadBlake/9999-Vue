<script setup lang="ts">
const exercicis = Array.from({ length: 26 }, (_, i) => String(i + 1).padStart(2, '0'))
</script>

<template>
  <div class="page">
    <h1>Solucions — Composition API</h1>
    <p class="subtitol">Mateixos 26 exercicis que Options API, però amb &lt;script setup&gt; i Composition API</p>
    <div class="grid">
      <RouterLink
        v-for="num in exercicis"
        :key="num"
        :to="'/ex' + num"
        class="box"
      >
        <span class="num">{{ num }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap: 10px; margin-top: 16px; }
.box {
  aspect-ratio: 1; border-radius: 10px; background: #42b883; color: white;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1.1rem; text-decoration: none;
  transition: opacity 0.2s;
}
.box:hover { opacity: 0.8; }
.num { font-variant-numeric: tabular-nums; }
</style>
