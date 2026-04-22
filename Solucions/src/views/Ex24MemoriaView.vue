<script lang="ts">
import { defineComponent } from 'vue'

interface Carta {
  id: number
  emoji: string
  virada: boolean
  trobada: boolean
}

const EMOJIS = ['🍕', '🍔', '🌮', '🍜', '🍣', '🥐', '🍩', '🌯']

export default defineComponent({
  name: 'Ex24MemoriaView',
  data() {
    return {
      cartes: [] as Carta[],
      virades: [] as number[],
      intents: 0,
      blocat: false,
    }
  },
  computed: {
    trobades(): number {
      return this.cartes.filter(c => c.trobada).length / 2
    },
    completat(): boolean {
      return this.cartes.length > 0 && this.cartes.every(c => c.trobada)
    },
  },
  mounted(): void {
    this.inicialitzar()
  },
  methods: {
    inicialitzar(): void {
      const paresCopies = [...EMOJIS, ...EMOJIS]
      // Fisher-Yates shuffle
      for (let i = paresCopies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[paresCopies[i], paresCopies[j]] = [paresCopies[j], paresCopies[i]]
      }
      this.cartes = paresCopies.map((emoji, i) => ({
        id: i,
        emoji,
        virada: false,
        trobada: false,
      }))
      this.virades = []
      this.intents = 0
      this.blocat = false
    },
    clicarCarta(carta: Carta): void {
      if (this.blocat || carta.virada || carta.trobada) return
      carta.virada = true
      this.virades.push(carta.id)

      if (this.virades.length === 2) {
        this.intents++
        this.blocat = true
        const [id1, id2] = this.virades
        const c1 = this.cartes.find(c => c.id === id1)!
        const c2 = this.cartes.find(c => c.id === id2)!

        if (c1.emoji === c2.emoji) {
          c1.trobada = true
          c2.trobada = true
          this.virades = []
          this.blocat = false
        } else {
          setTimeout(() => {
            c1.virada = false
            c2.virada = false
            this.virades = []
            this.blocat = false
          }, 900)
        }
      }
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 24 — Joc de memòria</h1>
    <p class="subtitol">Fisher-Yates shuffle, flip logic, setTimeout, mounted()</p>

    <div class="capçalera-joc">
      <span>Parelles: <strong>{{ trobades }}/{{ EMOJIS.length }}</strong></span>
      <span>Intents: <strong>{{ intents }}</strong></span>
      <button @click="inicialitzar">🔄 Nova partida</button>
    </div>

    <div v-if="completat" class="victòria">
      🎉 Has guanyat en <strong>{{ intents }}</strong> intents!
    </div>

    <div class="tauler">
      <button
        v-for="carta in cartes"
        :key="carta.id"
        class="carta"
        :class="{ virada: carta.virada || carta.trobada, trobada: carta.trobada }"
        @click="clicarCarta(carta)"
      >
        <span class="frontal">{{ carta.emoji }}</span>
        <span class="dors">?</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.capçalera-joc {
  display: flex; gap: 16px; align-items: center; flex-wrap: wrap;
  margin-bottom: 14px; font-size: 0.95rem;
}
.capçalera-joc button { margin-left: auto; }
.victòria {
  background: #d4edda; color: #155724;
  border-radius: 8px; padding: 12px; margin-bottom: 12px;
  text-align: center; font-size: 1.1rem;
}
.tauler {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px; max-width: 360px; margin: 0 auto;
}
.carta {
  aspect-ratio: 1; border-radius: 10px;
  border: none; font-size: 0;
  cursor: pointer; transition: transform 0.25s;
  background: #2980b9; position: relative;
}
.carta:hover:not(.virada) { transform: scale(1.05); }
.carta .frontal { display: none; font-size: 1.8rem; }
.carta .dors { display: block; font-size: 1.5rem; color: white; }
.carta.virada .frontal { display: block; font-size: 1.8rem; }
.carta.virada .dors { display: none; }
.carta.virada { background: white; border: 2px solid #e0e0e0; cursor: default; }
.carta.trobada { background: #d4edda; border: 2px solid #27ae60; cursor: default; }
</style>
