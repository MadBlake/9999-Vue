<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContadorBasicView',

  // v-model: sincronitza l'input "passos" amb la propietat de dades
  data() {
    return {
      valor: 0,
      passos: 1,
    }
  },

  methods: {
    // Event @click: incrementa el valor actual pels passos definits
    incrementar(): void {
      this.valor += this.passos
    },

    // Event @click: decrementa però mai per sota de 0
    decrementar(): void {
      if (this.valor - this.passos >= 0) {
        this.valor -= this.passos
      } else {
        this.valor = 0
      }
    },
  },
})
</script>

<template>
  <div>
    <h1>Contador Bàsic</h1>
    <p class="subtitol">Exemple de <strong>v-bind</strong>, <strong>v-model</strong> i <strong>events</strong></p>

    <!-- v-bind: vincula l'atribut class de forma dinàmica -->
    <div class="valor" :class="{ zero: valor === 0, positiu: valor > 0 }">
      {{ valor }}
    </div>

    <div class="controls">
      <!-- @click (event): crida el mètode decrementar -->
      <!-- v-bind :disabled: desactiva el botó quan valor és 0 -->
      <button @click="decrementar" :disabled="valor === 0">− Menys</button>

      <!-- @click (event): crida el mètode incrementar -->
      <button @click="incrementar">+ Més</button>
    </div>

    <div class="passos-box">
      <label for="passos">Passos per increment:</label>
      <!-- v-model: binding bidireccional amb la propietat "passos" -->
      <!-- .number: converteix el valor de l'input a número -->
      <input
        id="passos"
        v-model.number="passos"
        type="number"
        min="1"
      />
    </div>

    <div class="info">
      <p>📌 <code>:disabled="valor === 0"</code> → <strong>v-bind</strong> desactiva el botó dinàmicament</p>
      <p>📌 <code>:class="{ zero: valor === 0 }"</code> → <strong>v-bind</strong> aplica classes dinàmiques</p>
      <p>📌 <code>@click="decrementar"</code> → <strong>event</strong> que crida un mètode</p>
      <p>📌 <code>v-model.number="passos"</code> → <strong>v-model</strong> binding bidireccional</p>
    </div>
  </div>
</template>

<style scoped>
h1 { font-size: 1.6rem; color: #1a1a2e; margin-bottom: 4px; }
.subtitol { font-size: 0.9rem; color: #666; margin-bottom: 24px; }

.valor {
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  background: white;
  border: 3px solid #ddd;
  margin-bottom: 20px;
  transition: all 0.2s;
}
.valor.zero { color: #aaa; border-color: #ddd; }
.valor.positiu { color: #42b883; border-color: #42b883; }

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
}

button {
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
}
button:hover { opacity: 0.85; }
button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 1;
}

.passos-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 0.9rem;
}
.passos-box input {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 4px 8px;
  width: 70px;
  font-size: 0.9rem;
}

.info {
  background: #f0f4f8;
  border-radius: 8px;
  padding: 14px 16px;
}
.info p { font-size: 0.82rem; color: #555; margin-bottom: 6px; }
.info p:last-child { margin-bottom: 0; }
</style>
