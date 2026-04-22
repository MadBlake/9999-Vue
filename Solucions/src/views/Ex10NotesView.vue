<script lang="ts">
import { defineComponent } from 'vue'

interface Nota {
  id: number
  titol: string
  text: string
}

export default defineComponent({
  name: 'Ex10NotesView',
  data() {
    return {
      notes: [
        { id: 1, titol: 'Compres', text: 'Pa, llet, ous' },
        { id: 2, titol: 'Tasques Vue', text: 'Practicar computed i watchers' },
      ] as Nota[],
      titolNou: '',
      textNou: '',
      seguentId: 3,
    }
  },
  methods: {
    afegirNota(): void {
      if (!this.titolNou.trim()) return
      this.notes.push({
        id: this.seguentId++,
        titol: this.titolNou.trim(),
        text: this.textNou.trim(),
      })
      this.titolNou = ''
      this.textNou = ''
    },
    eliminarNota(id: number): void {
      this.notes = this.notes.filter(n => n.id !== id)
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 10 — Taulell de notes</h1>
    <p class="subtitol">Interface Nota, afegir/eliminar per id, v-for</p>

    <div class="card formulari">
      <h3>Nova nota</h3>
      <input v-model="titolNou" placeholder="Títol..." maxlength="40" />
      <textarea v-model="textNou" placeholder="Contingut..." rows="3"></textarea>
      <button :disabled="!titolNou.trim()" @click="afegirNota">+ Afegir nota</button>
    </div>

    <p v-if="notes.length === 0" style="text-align:center;color:#888;margin-top:20px">
      No hi ha notes. Crea'n una!
    </p>

    <div class="grid">
      <div v-for="nota in notes" :key="nota.id" class="card nota">
        <button class="eliminar" @click="eliminarNota(nota.id)">✕</button>
        <h3>{{ nota.titol }}</h3>
        <p>{{ nota.text || '(sense contingut)' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formulari { max-width: 480px; }
.formulari h3 { margin: 0 0 10px; }
.formulari input, .formulari textarea {
  width: 100%; margin-bottom: 10px; box-sizing: border-box;
}
.formulari textarea { resize: vertical; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px; margin-top: 14px;
}
.nota { position: relative; padding: 14px; min-height: 100px; }
.nota h3 { margin: 0 24px 8px 0; font-size: 1rem; }
.nota p { margin: 0; color: #555; font-size: 0.9rem; line-height: 1.5; }
.eliminar {
  position: absolute; top: 10px; right: 10px;
  background: none; border: none; color: #e74c3c;
  cursor: pointer; font-size: 1rem; padding: 2px 6px; border-radius: 4px;
}
.eliminar:hover { background: #fdecea; }
</style>
