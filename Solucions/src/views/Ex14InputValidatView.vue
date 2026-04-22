<script lang="ts">
import { defineComponent } from 'vue'
import InputValidat from '../components/ex14/InputValidat.vue'

export default defineComponent({
  name: 'Ex14InputValidatView',
  components: { InputValidat },
  data() {
    return {
      nom: '',
      correu: '',
      contrasenya: '',
      enviat: false,
    }
  },
  methods: {
    validarNom(v: string): string | null {
      if (v.length < 3) return 'El nom ha de tenir almenys 3 caràcters'
      return null
    },
    validarCorreu(v: string): string | null {
      if (!v.includes('@') || !v.includes('.')) return 'Format de correu invàlid'
      return null
    },
    validarContrasenya(v: string): string | null {
      if (v.length < 6) return 'La contrasenya ha de tenir almenys 6 caràcters'
      return null
    },
    enviar(): void {
      this.enviat = true
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 14 — v-model personalitzat</h1>
    <p class="subtitol">Props: modelValue + regla — emit update:modelValue</p>

    <div v-if="!enviat" class="card" style="max-width:420px">
      <h3>Registre d'usuari</h3>
      <InputValidat
        v-model="nom"
        etiqueta="Nom"
        :regla="validarNom"
      />
      <InputValidat
        v-model="correu"
        etiqueta="Correu electrònic"
        :regla="validarCorreu"
      />
      <InputValidat
        v-model="contrasenya"
        etiqueta="Contrasenya"
        :regla="validarContrasenya"
      />
      <button
        :disabled="!nom || !correu || !contrasenya"
        @click="enviar"
      >
        Registrar-se
      </button>
    </div>

    <div v-else class="card exit">
      <p style="font-size:2rem">✅</p>
      <h3>Registre completat!</h3>
      <p>Nom: <strong>{{ nom }}</strong></p>
      <p>Correu: <strong>{{ correu }}</strong></p>
    </div>
  </div>
</template>

<style scoped>
.exit { text-align: center; }
</style>
