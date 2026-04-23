<script setup lang="ts">
import { ref, computed } from 'vue'

const nom = ref('')
const correu = ref('')
const contrasenya = ref('')
const enviat = ref(false)

const nomValid = computed(() => nom.value.trim().length >= 3)
const correuValid = computed(() => correu.value.includes('@') && correu.value.includes('.'))
const contrasenyaValid = computed(() => contrasenya.value.length >= 6)
const formulariValid = computed(() => nomValid.value && correuValid.value && contrasenyaValid.value)

function enviar() { enviat.value = true }
</script>

<template>
  <div class="page">
    <h1>Exercici 05 — Validació de formulari</h1>
    <p class="subtitol">ref(), computed() — validació reactiva sense watch</p>

    <div v-if="!enviat" class="card" style="max-width:420px">
      <label>
        Nom
        <input v-model="nom" placeholder="Mínim 3 caràcters" />
        <span v-show="nom && !nomValid" class="error">Mínim 3 caràcters</span>
      </label>
      <label>
        Correu
        <input v-model="correu" type="email" placeholder="exemple@correu.com" />
        <span v-show="correu && !correuValid" class="error">Format invàlid</span>
      </label>
      <label>
        Contrasenya
        <input v-model="contrasenya" type="password" placeholder="Mínim 6 caràcters" />
        <span v-show="contrasenya && !contrasenyaValid" class="error">Mínim 6 caràcters</span>
      </label>
      <button :disabled="!formulariValid" @click="enviar">Enviar</button>
    </div>

    <div v-else class="card" style="text-align:center">
      <p style="font-size:2.5rem">✅</p>
      <h3>Formulari enviat!</h3>
      <p>Benvingut/da, <strong>{{ nom }}</strong></p>
    </div>
  </div>
</template>

<style scoped>
label { display: flex; flex-direction: column; gap: 4px; font-weight: 600; font-size: 0.9rem; margin-bottom: 12px; }
.error { color: #e74c3c; font-size: 0.82rem; font-weight: 400; }
</style>
