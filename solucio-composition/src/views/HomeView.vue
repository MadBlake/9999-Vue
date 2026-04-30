<script setup lang="ts">
const exercicis = Array.from({ length: 35 }, (_, i) => String(i + 1).padStart(2, '0'))
</script>

<template>
  <div class="page">
    <h1>Solucions — Composition API</h1>
    <p class="subtitol">35 exercicis: Sintaxi bàsica, Components, Reactivitat avançada, Router, i <strong>Connexió a APIs amb reactivitat</strong></p>
    <div class="blocs">
      <div>
        <h3>Bloc 1-3: Bàsics (Ex 01-15)</h3>
        <div class="grid">
          <RouterLink
            v-for="num in exercicis.slice(0, 15)"
            :key="num"
            :to="'/ex' + num"
            class="box"
          >
            <span class="num">{{ num }}</span>
          </RouterLink>
        </div>
      </div>

      <div>
        <h3>Bloc 4: Reactivitat avançada (Ex 16-20)</h3>
        <div class="grid">
          <RouterLink
            v-for="num in exercicis.slice(15, 20)"
            :key="num"
            :to="'/ex' + num"
            class="box"
          >
            <span class="num">{{ num }}</span>
          </RouterLink>
        </div>
      </div>

      <div>
        <h3>Bloc 5: Router (Ex 21-26)</h3>
        <div class="grid">
          <RouterLink
            v-for="num in exercicis.slice(20, 26)"
            :key="num"
            :to="'/ex' + num"
            class="box"
          >
            <span class="num">{{ num }}</span>
          </RouterLink>
        </div>
      </div>

      <div>
        <h3>Bloc 6: APIs amb reactivitat (Ex 27-35)</h3>
        <div class="grid">
          <RouterLink
            v-for="num in exercicis.slice(26)"
            :key="num"
            :to="'/ex' + num"
            class="box api"
          >
            <span class="num">{{ num }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blocs > div { margin-bottom: 24px; }
.blocs h3 { margin: 0 0 8px 0; font-size: 0.95rem; color: #666; font-weight: 600; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap: 10px; }
.box {
  aspect-ratio: 1; border-radius: 10px; background: #42b883; color: white;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1.1rem; text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
}
.box:hover { opacity: 0.8; transform: scale(1.05); }
.box.api { background: linear-gradient(135deg, #42b883 0%, #21896f 100%); }
.num { font-variant-numeric: tabular-nums; }
</style>
