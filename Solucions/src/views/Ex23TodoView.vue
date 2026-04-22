<script lang="ts">
import { defineComponent } from 'vue'

type Prioritat = 'alta' | 'normal' | 'baixa'
type EstatFiltre = 'totes' | 'pendent' | 'completada'

interface Tasca {
  id: number
  text: string
  completada: boolean
  prioritat: Prioritat
}

export default defineComponent({
  name: 'Ex23TodoView',
  data() {
    return {
      textNou: '',
      prioritatNova: 'normal' as Prioritat,
      filtreEstat: 'totes' as EstatFiltre,
      filtrePrioritat: '' as Prioritat | '',
      seguentId: 4,
      tasques: [
        { id: 1, text: 'Fer la compra', completada: false, prioritat: 'alta' },
        { id: 2, text: 'Estudiar Vue Router', completada: true, prioritat: 'alta' },
        { id: 3, text: 'Anar al gimnàs', completada: false, prioritat: 'baixa' },
      ] as Tasca[],
    }
  },
  computed: {
    tasquesFiltrades(): Tasca[] {
      return this.tasques.filter(t => {
        const estatOk =
          this.filtreEstat === 'totes' ||
          (this.filtreEstat === 'completada' && t.completada) ||
          (this.filtreEstat === 'pendent' && !t.completada)
        const prioritatOk = this.filtrePrioritat === '' || t.prioritat === this.filtrePrioritat
        return estatOk && prioritatOk
      })
    },
    pendents(): number {
      return this.tasques.filter(t => !t.completada).length
    },
  },
  methods: {
    afegirTasca(): void {
      if (!this.textNou.trim()) return
      this.tasques.push({
        id: this.seguentId++,
        text: this.textNou.trim(),
        completada: false,
        prioritat: this.prioritatNova,
      })
      this.textNou = ''
    },
    eliminarTasca(id: number): void {
      this.tasques = this.tasques.filter(t => t.id !== id)
    },
    eliminarCompletades(): void {
      this.tasques = this.tasques.filter(t => !t.completada)
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 23 — Gestor de tasques</h1>
    <p class="subtitol">Interface Tasca, filtres estat + prioritat, computed tasquesFiltrades</p>

    <!-- Afegir tasca -->
    <div class="card formulari">
      <input
        v-model="textNou"
        placeholder="Nova tasca..."
        @keyup.enter="afegirTasca"
        style="flex:1"
      />
      <select v-model="prioritatNova">
        <option value="alta">Alta</option>
        <option value="normal">Normal</option>
        <option value="baixa">Baixa</option>
      </select>
      <button :disabled="!textNou.trim()" @click="afegirTasca">+ Afegir</button>
    </div>

    <!-- Filtres -->
    <div class="filtres">
      <label>Estat:
        <select v-model="filtreEstat">
          <option value="totes">Totes</option>
          <option value="pendent">Pendent</option>
          <option value="completada">Completada</option>
        </select>
      </label>
      <label>Prioritat:
        <select v-model="filtrePrioritat">
          <option value="">Qualsevol</option>
          <option value="alta">Alta</option>
          <option value="normal">Normal</option>
          <option value="baixa">Baixa</option>
        </select>
      </label>
      <span class="recompte">{{ pendents }} pendent{{ pendents !== 1 ? 's' : '' }}</span>
      <button
        class="netejar"
        :disabled="tasques.every(t => !t.completada)"
        @click="eliminarCompletades"
      >
        🗑️ Eliminar completades
      </button>
    </div>

    <p v-if="tasquesFiltrades.length === 0" style="text-align:center;color:#888;margin-top:20px">
      No hi ha tasques que coincideixin.
    </p>

    <ul v-else class="llista">
      <li
        v-for="t in tasquesFiltrades"
        :key="t.id"
        class="item"
        :class="{ completada: t.completada }"
      >
        <input type="checkbox" v-model="t.completada" />
        <span class="text">{{ t.text }}</span>
        <span :class="['prioritat', t.prioritat]">{{ t.prioritat }}</span>
        <button class="eliminar" @click="eliminarTasca(t.id)">✕</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.formulari { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
.filtres { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; font-size: 0.9rem; }
.filtres label { display: flex; align-items: center; gap: 6px; font-weight: 600; }
.recompte { margin-left: auto; color: #888; }
.netejar { background: none; border: 1px solid #e74c3c; color: #e74c3c; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 0.82rem; }
.netejar:disabled { opacity: 0.4; cursor: default; }
.llista { list-style: none; padding: 0; margin: 0; }
.item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-bottom: 1px solid #eee;
}
.item.completada .text { text-decoration: line-through; color: #aaa; }
.text { flex: 1; }
.prioritat { font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; font-weight: 600; }
.prioritat.alta   { background: #fdecea; color: #e74c3c; }
.prioritat.normal { background: #fff3cd; color: #856404; }
.prioritat.baixa  { background: #e8f5e9; color: #27ae60; }
.eliminar { background: none; border: none; color: #bbb; cursor: pointer; font-size: 1rem; padding: 2px 6px; border-radius: 4px; }
.eliminar:hover { background: #fdecea; color: #e74c3c; }
</style>
