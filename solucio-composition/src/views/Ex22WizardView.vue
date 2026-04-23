<script setup lang="ts">
import { ref, computed } from 'vue'

const pas = ref(1)
const totalPasOS = 4

// Dades del formulari
const nom        = ref('')
const correu     = ref('')
const empresa    = ref('')
const pla        = ref('')
const cardNom    = ref('')
const cardNum    = ref('')
const termes     = ref(false)

const progres = computed(() => Math.round((pas.value / totalPasOS) * 100))

const pasValid = computed(() => {
  if (pas.value === 1) return nom.value.trim().length >= 2 && correu.value.includes('@')
  if (pas.value === 2) return pla.value !== ''
  if (pas.value === 3) return cardNom.value.trim() !== '' && cardNum.value.length >= 16
  return termes.value
})

function seguent() { if (pasValid.value && pas.value < totalPasOS) pas.value++ }
function anterior() { if (pas.value > 1) pas.value-- }
</script>

<template>
  <div class="page">
    <h1>Exercici 22 — Formulari wizard</h1>
    <p class="subtitol">ref(), computed() validació per pas, navegació multi-pas</p>

    <div class="card" style="max-width:480px">
      <!-- Barra de progrés -->
      <div class="progres-bar">
        <div class="progres-fill" :style="{ width: progres + '%' }"></div>
      </div>
      <p class="progres-text">Pas {{ pas }} de {{ totalPasOS }}</p>

      <!-- Pas 1: Compte -->
      <div v-if="pas === 1">
        <h3>1. Informació del compte</h3>
        <label>Nom <input v-model="nom" placeholder="El teu nom" /></label>
        <label>Correu <input v-model="correu" type="email" placeholder="tu@correu.com" /></label>
        <label>Empresa <input v-model="empresa" placeholder="Opcional" /></label>
      </div>

      <!-- Pas 2: Pla -->
      <div v-else-if="pas === 2">
        <h3>2. Tria el teu pla</h3>
        <div class="plans">
          <label v-for="p in ['Bàsic — 0€/mes','Pro — 9€/mes','Empresa — 29€/mes']" :key="p" class="pla">
            <input type="radio" v-model="pla" :value="p" />
            {{ p }}
          </label>
        </div>
      </div>

      <!-- Pas 3: Pagament -->
      <div v-else-if="pas === 3">
        <h3>3. Dades de pagament</h3>
        <label>Titular <input v-model="cardNom" placeholder="Nom a la targeta" /></label>
        <label>Número <input v-model="cardNum" placeholder="16 dígits" maxlength="19" /></label>
      </div>

      <!-- Pas 4: Resum -->
      <div v-else>
        <h3>4. Confirmació</h3>
        <div class="resum">
          <p>👤 <strong>{{ nom }}</strong> ({{ correu }})</p>
          <p>📦 Pla: <strong>{{ pla }}</strong></p>
          <p>💳 Targeta de: <strong>{{ cardNom }}</strong></p>
        </div>
        <label class="termes">
          <input type="checkbox" v-model="termes" />
          Accepto els termes i condicions
        </label>
      </div>

      <!-- Navegació -->
      <div class="navegacio">
        <button v-if="pas > 1" @click="anterior" class="btn-sec">← Anterior</button>
        <span v-else></span>
        <button v-if="pas < totalPasOS" :disabled="!pasValid" @click="seguent">
          Següent →
        </button>
        <button v-else :disabled="!pasValid" style="background:#27ae60">
          ✅ Finalitzar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
label { display: flex; flex-direction: column; gap: 4px; font-weight: 600; font-size: 0.9rem; margin-bottom: 12px; }
label input[type="text"], label input[type="email"] { font-size: 0.9rem; }
.progres-bar { height: 6px; background: #e0e0e0; border-radius: 3px; margin-bottom: 6px; }
.progres-fill { height: 100%; background: #42b883; border-radius: 3px; transition: width 0.3s; }
.progres-text { font-size: 0.82rem; color: #888; margin-bottom: 18px; }
h3 { margin-bottom: 14px; font-size: 1rem; }
.plans { display: flex; flex-direction: column; gap: 10px; }
.pla { display: flex; flex-direction: row; align-items: center; gap: 10px; padding: 10px; border: 1px solid #e0e0e0; border-radius: 6px; cursor: pointer; font-weight: 600; }
.pla:has(input:checked) { border-color: #42b883; background: #e8f5ee; }
.resum { background: #f8f8f8; border-radius: 8px; padding: 14px; margin-bottom: 14px; display: flex; flex-direction: column; gap: 6px; }
.termes { flex-direction: row; align-items: center; gap: 8px; font-weight: 400; }
.navegacio { display: flex; justify-content: space-between; margin-top: 18px; }
.btn-sec { background: #ecf0f1; color: #333; border: none; border-radius: 6px; padding: 8px 18px; cursor: pointer; font-size: 0.9rem; font-weight: 600; }
</style>
