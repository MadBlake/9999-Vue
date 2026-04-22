<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Ex05ValidacioView',
  data() {
    return {
      nom: '',
      correu: '',
      contrasenya: '',
      enviat: false,
    }
  },
  computed: {
    nomValid(): boolean { return this.nom.trim().length >= 3 },
    correuValid(): boolean { return this.correu.includes('@') && this.correu.includes('.') },
    contrasenyaValid(): boolean { return this.contrasenya.length >= 6 },
    formulariValid(): boolean {
      return this.nomValid && this.correuValid && this.contrasenyaValid
    },
  },
  methods: {
    enviar(): void {
      if (this.formulariValid) this.enviat = true
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 5 — Validació de formulari</h1>
    <p class="subtitol">v-model, computed, :disabled, v-show</p>

    <div class="card" v-if="!enviat">
      <!-- Camp Nom -->
      <div class="camp">
        <label>Nom (mínim 3 caràcters):</label>
        <input v-model="nom" type="text" :class="{ 'invalid': nom && !nomValid }" />
        <!-- v-show: mostra l'error de forma reactiva -->
        <p class="error" v-show="nom && !nomValid">⚠️ El nom ha de tenir almenys 3 caràcters</p>
      </div>
      <!-- Camp Correu -->
      <div class="camp">
        <label>Correu electrònic:</label>
        <input v-model="correu" type="text" :class="{ 'invalid': correu && !correuValid }" />
        <p class="error" v-show="correu && !correuValid">⚠️ El correu ha de ser vàlid (conté @ i .)</p>
      </div>
      <!-- Camp Contrasenya -->
      <div class="camp">
        <label>Contrasenya (mínim 6 caràcters):</label>
        <input v-model="contrasenya" type="password" :class="{ 'invalid': contrasenya && !contrasenyaValid }" />
        <p class="error" v-show="contrasenya && !contrasenyaValid">⚠️ La contrasenya ha de tenir almenys 6 caràcters</p>
      </div>
      <!-- :disabled: desactivat fins que formulariValid sigui true -->
      <button @click="enviar" :disabled="!formulariValid" style="margin-top:8px">
        Enviar registre
      </button>
    </div>

    <div class="card success" v-else>
      <p>✅ Registre completat per <strong>{{ nom }}</strong>!</p>
      <button @click="enviat = false; nom = ''; correu = ''; contrasenya = ''" style="margin-top:10px">
        Tornar al formulari
      </button>
    </div>
  </div>
</template>

<style scoped>
.camp { margin-bottom: 14px; }
.camp label { display: block; font-size: 0.88rem; font-weight: 600; margin-bottom: 4px; }
.camp input { width: 100%; }
.invalid { border-color: #e74c3c !important; outline-color: #e74c3c !important; }
.error { color: #e74c3c; font-size: 0.8rem; margin-top: 4px; }
.success { background: #e8f5e9; border-color: #42b883 !important; }
</style>
