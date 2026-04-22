<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Ex04LlistaCompraView',
  data() {
    return {
      productes: ['Pa', 'Llet', 'Ous'] as string[],
      nouProducte: '',
    }
  },
  methods: {
    afegir(): void {
      const nom = this.nouProducte.trim()
      if (nom) {
        this.productes.push(nom)
        this.nouProducte = ''
      }
    },
    eliminar(index: number): void {
      this.productes.splice(index, 1)
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 4 — Llista de la compra</h1>
    <p class="subtitol">v-model, v-for, @click, :disabled</p>

    <div class="card">
      <div class="afegir-row">
        <!-- v-model: sincronitza el camp amb nouProducte -->
        <input
          v-model="nouProducte"
          placeholder="Producte nou..."
          @keyup.enter="afegir"
          style="flex:1"
        />
        <!-- :disabled: desactiva el botó si el camp és buit -->
        <button @click="afegir" :disabled="!nouProducte.trim()">Afegir</button>
      </div>

      <!-- v-for: renderitza un element per cada producte de l'array -->
      <ul class="llista">
        <li v-for="(p, i) in productes" :key="i">
          <span>🛒 {{ p }}</span>
          <!-- @click: elimina el producte per índex -->
          <button class="btn-del" @click="eliminar(i)">✕</button>
        </li>
      </ul>

      <p class="total">Total: <strong>{{ productes.length }}</strong> productes</p>
    </div>
  </div>
</template>

<style scoped>
.afegir-row { display: flex; gap: 8px; margin-bottom: 14px; }
.llista { list-style: none; }
.llista li {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 4px; border-bottom: 1px solid #eee; font-size: 0.9rem;
}
.btn-del {
  background: #e74c3c; color: white; border: none;
  border-radius: 4px; padding: 2px 8px; cursor: pointer; font-size: 0.8rem;
}
.total { margin-top: 12px; font-size: 0.9rem; color: #555; }
</style>
