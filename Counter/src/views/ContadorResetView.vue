<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContadorResetView',

  data() {
    return {
      valor: 0,
      // Guardem l'ID de l'interval per poder cancel·lar-lo quan el component es destrueix
      intervalId: null as ReturnType<typeof setInterval> | null,
      segonsRestants: 30,
    }
  },

  methods: {
    incrementar(): void {
      this.valor++
    },

    // L'usuari mai pot baixar de 0
    decrementar(): void {
      if (this.valor > 0) {
        this.valor--
      }
    },

    // Aquesta funció s'executa automàticament cada 30 segons via setInterval
    reset(): void {
      this.valor = -1
      this.segonsRestants = 30
    },
  },

  // Lifecycle hook: quan el component es munta al DOM, iniciem el temporitzador
  mounted(): void {
    // Comptem enrere per mostrar quan farà el reset
    this.intervalId = setInterval(() => {
      this.segonsRestants--
      if (this.segonsRestants <= 0) {
        this.reset()
      }
    }, 1000)
  },

  // Lifecycle hook: quan el component es desmunta, cancel·lem l'interval per evitar memory leaks
  unmounted(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
    }
  },
})
</script>

<template>
  <div>
    <h1>Contador amb Reset automàtic</h1>
    <p class="subtitol">El valor es reseteja a <strong>0</strong> cada 30 segons</p>

    <!-- v-bind: vincula l'atribut class dinàmicament -->
    <div class="valor" :class="{ zero: valor === 0, positiu: valor > 0 }">
      {{ valor }}
    </div>

    <!-- v-bind :class: afegeix la classe "aviat" quan queden menys de 10 segons -->
    <div class="temporitzador" :class="{ aviat: segonsRestants <= 10 }">
      ⏱ Reset en <strong>{{ segonsRestants }}</strong> s
    </div>

    <div class="controls">
      <!-- v-bind :disabled + event @click -->
      <button @click="decrementar" :disabled="valor === 0">− Menys</button>
      <button @click="incrementar">+ Més</button>
    </div>

    <!-- v-model en el template: mostra el valor actual sincronitzat -->
    <div class="model-box">
      <label>Edita el valor directament (v-model):</label>
      <!-- v-model.number: binding bidireccional que converteix a número -->
      <input v-model.number="valor" type="number" min="0" />
      <span class="hint">← v-model sincronitza el valor en temps real</span>
    </div>

    <div class="info">
      <p>📌 <code>@click="decrementar"</code> → <strong>event</strong> vinculat al botó</p>
      <p>📌 <code>:disabled="valor === 0"</code> → <strong>v-bind</strong>: botó desactivat si val 0</p>
      <p>📌 <code>:class="{ aviat: segonsRestants &lt;= 10 }"</code> → <strong>v-bind</strong>: classe dinàmica</p>
      <p>📌 <code>v-model.number="valor"</code> → <strong>v-model</strong>: sincronitza input ↔ dades</p>
      <p>📌 <code>setInterval</code> en <code>mounted()</code> → reset automàtic cada 30 s</p>
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
  margin-bottom: 12px;
  transition: all 0.2s;
}
.valor.zero { color: #aaa; border-color: #ddd; }
.valor.positiu { color: #42b883; border-color: #42b883; }

.temporitzador {
  text-align: center;
  font-size: 0.9rem;
  color: #555;
  background: #f0f4f8;
  border-radius: 6px;
  padding: 6px;
  margin-bottom: 20px;
  transition: all 0.3s;
}
.temporitzador.aviat {
  background: #fff3e0;
  color: #e67e22;
  font-weight: 700;
}

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
}

.model-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 0.9rem;
}
.model-box input {
  border: 2px solid #42b883;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 1rem;
  width: 100px;
}
.hint { font-size: 0.78rem; color: #888; font-style: italic; }

.info {
  background: #f0f4f8;
  border-radius: 8px;
  padding: 14px 16px;
}
.info p { font-size: 0.82rem; color: #555; margin-bottom: 6px; }
.info p:last-child { margin-bottom: 0; }
</style>
