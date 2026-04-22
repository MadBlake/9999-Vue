<script lang="ts">
import { defineComponent } from 'vue'

interface Fase {
  color: string
  nom: string
  significat: string
  bg: string
}

export default defineComponent({
  name: 'Ex06SemaforView',
  data() {
    return {
      indexActiu: 0,
      fases: [
        { color: '#e74c3c', nom: 'Vermell', significat: '🛑 Para!', bg: '#fdecea' },
        { color: '#f39c12', nom: 'Groc', significat: '⚠️ Prepara\'t', bg: '#fff8e1' },
        { color: '#27ae60', nom: 'Verd', significat: '✅ Passa!', bg: '#e8f5e9' },
      ] as Fase[],
    }
  },
  computed: {
    faseActiva(): Fase {
      return this.fases[this.indexActiu]
    },
  },
  methods: {
    seguent(): void {
      this.indexActiu = (this.indexActiu + 1) % this.fases.length
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 6 — Semàfor</h1>
    <p class="subtitol">Array + :style dinàmic, computed, @click</p>

    <div class="card" style="text-align:center">
      <!-- :style: aplica el color de fons dinàmicament -->
      <div class="semafor" :style="{ background: faseActiva.bg }">
        <div
          v-for="(fase, i) in fases"
          :key="fase.color"
          class="llum"
          :style="{ background: i === indexActiu ? fase.color : '#333' }"
        ></div>
      </div>
      <p class="significat">{{ faseActiva.significat }}</p>
      <p style="font-size:0.85rem;color:#888;margin-bottom:14px">
        Color actiu: <strong :style="{ color: faseActiva.color }">{{ faseActiva.nom }}</strong>
      </p>
      <button @click="seguent">Següent fase →</button>
    </div>
  </div>
</template>

<style scoped>
.semafor {
  width: 80px; border-radius: 12px; padding: 14px 10px;
  margin: 0 auto 16px; border: 3px solid #333;
  display: flex; flex-direction: column; gap: 10px;
  transition: background 0.3s;
}
.llum {
  width: 50px; height: 50px; border-radius: 50%;
  transition: background 0.3s;
}
.significat { font-size: 1.4rem; font-weight: 700; margin-bottom: 4px; }
</style>
