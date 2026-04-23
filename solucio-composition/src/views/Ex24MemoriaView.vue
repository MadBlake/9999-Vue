<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Carta { id: number; emoji: string; girada: boolean; trobada: boolean }

const emojis = ['🦊','🐼','🦁','🐬','🦋','🌺','⚡','🎸']

function barajar<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const cartes = ref<Carta[]>([])
const seleccionades = ref<number[]>([])
const moviments = ref(0)
const bloquejat  = ref(false)

const trobades = computed(() => cartes.value.filter(c => c.trobada).length / 2)
const guanyat  = computed(() => trobades.value === emojis.length)

function inicialitzar() {
  const parelles = barajar([...emojis, ...emojis])
  cartes.value = parelles.map((emoji, i) => ({ id: i, emoji, girada: false, trobada: false }))
  seleccionades.value = []
  moviments.value = 0
  bloquejat.value = false
}

function girar(carta: Carta) {
  if (bloquejat.value || carta.girada || carta.trobada) return
  carta.girada = true
  seleccionades.value.push(carta.id)
  if (seleccionades.value.length === 2) {
    moviments.value++
    bloquejat.value = true
    const [a, b] = seleccionades.value.map(id => cartes.value.find(c => c.id === id)!)
    setTimeout(() => {
      if (a.emoji === b.emoji) { a.trobada = b.trobada = true }
      else { a.girada = b.girada = false }
      seleccionades.value = []
      bloquejat.value = false
    }, 900)
  }
}

onMounted(inicialitzar)
</script>

<template>
  <div class="page">
    <h1>Exercici 24 — Joc de memòria</h1>
    <p class="subtitol">onMounted(), ref(), lògica de joc, Fisher-Yates</p>

    <div class="capçalera">
      <span>🎯 Parelles: {{ trobades }}/{{ emojis.length }}</span>
      <span>🔁 Moviments: {{ moviments }}</span>
      <button @click="inicialitzar">Reiniciar</button>
    </div>

    <div v-if="guanyat" class="guanyat card">🎉 Has guanyat en {{ moviments }} moviments!</div>

    <div class="taulell">
      <div
        v-for="carta in cartes"
        :key="carta.id"
        class="carta"
        :class="{ girada: carta.girada || carta.trobada, trobada: carta.trobada }"
        @click="girar(carta)"
      >
        <div class="davant">{{ carta.emoji }}</div>
        <div class="darrere">❓</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.capçalera { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 14px; font-weight: 600; }
.guanyat { background: #e8f5e9; text-align: center; font-size: 1.2rem; font-weight: 700; color: #27ae60; margin-bottom: 14px; }
.taulell { display: grid; grid-template-columns: repeat(4, 80px); gap: 12px; justify-content: center; }
.carta { width: 80px; height: 80px; cursor: pointer; perspective: 600px; }
.carta > div { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 2rem; transition: transform 0.4s; }
.carta { position: relative; }
.davant { transform: rotateY(180deg); background: #fff; border: 2px solid #42b883; }
.darrere { background: #1a1a2e; color: white; }
.carta.girada .davant { transform: rotateY(0deg); }
.carta.girada .darrere { transform: rotateY(-180deg); }
.carta.trobada .davant { background: #e8f5e9; border-color: #27ae60; }
</style>
