<script setup lang="ts">
import { ref } from 'vue'

const nom = ref('Joan')
const cognoms = ref('Pérez García')
const edat = ref(25)
const professio = ref('Desenvolupador web')
function incrementarEdat(): void {
  edat.value++
}
/*export default defineComponent({
  name: 'Ex01TarjetaView',
  data() {
    return {
      nom: 'Joan',
      cognoms: 'Pérez García',
      edat: 25,
      professio: 'Desenvolupador web',
    }
  },
  methods: {
    incrementarEdat(): void {
      this.edat++
    },
  },
})*/
</script>

<template>
  <div class="page">
    <h1>Exercici 1 — Targeta de presentació</h1>
    <p class="subtitol">data(), interpolació {{ }}, @click</p>

    <div class="card" style="text-align:center">
      <div class="avatar">{{ nom[0] }}{{ cognoms[0] }}</div>
      <h2 style="margin:12px 0 4px">{{ nom }} {{ cognoms }}</h2>
      <p style="color:#888;margin-bottom:4px">{{ professio }}</p>
      <p style="font-size:1.3rem;margin-bottom:16px">
        Edat: <strong>{{ edat }}</strong> anys
      </p>
      <button @click="incrementarEdat">+1 Any 🎂</button>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: 70px; height: 70px;
  background: #42b883; color: white;
  border-radius: 50%; font-size: 1.6rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto;
}
</style>
