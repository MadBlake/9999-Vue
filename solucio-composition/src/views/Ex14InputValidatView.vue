<script setup lang="ts">
import { ref, computed } from 'vue'
import InputValidat from '@/components/ex14/InputValidat.vue'

const nom     = ref('')
const correu  = ref('')
const telefon = ref('')

const reglaNom = (v: string) => v.trim().length < 3 ? 'Mínim 3 caràcters' : null
const reglaCorreu = (v: string) =>
  v === '' ? null : (v.includes('@') && v.includes('.') ? null : 'Format de correu invàlid')
const reglaTelefon = (v: string) =>
  v === '' ? null : (/^\d{9}$/.test(v) ? null : '9 dígits numèrics')

const valid = computed(() =>
  reglaNom(nom.value) === null &&
  reglaCorreu(correu.value) === null &&
  reglaTelefon(telefon.value) === null
)
</script>

<template>
  <div class="page">
    <h1>Exercici 14 — v-model personalitzat</h1>
    <p class="subtitol">defineProps, defineEmits, update:modelValue — v-model en component fill</p>
    <div class="card" style="max-width:420px;display:flex;flex-direction:column;gap:14px">
      <InputValidat
        v-model="nom"
        etiqueta="Nom complet"
        placeholder="Mínim 3 caràcters"
        :regla="reglaNom"
      />
      <InputValidat
        v-model="correu"
        etiqueta="Correu electrònic"
        placeholder="exemple@domini.cat"
        :regla="reglaCorreu"
      />
      <InputValidat
        v-model="telefon"
        etiqueta="Telèfon"
        placeholder="9 dígits"
        :regla="reglaTelefon"
      />
      <button :disabled="!valid">Enviar</button>
    </div>
    <div class="card" style="margin-top:12px;max-width:420px">
      <h4 style="margin-bottom:8px">Valors reactius:</h4>
      <p>nom = <code>"{{ nom }}"</code></p>
      <p>correu = <code>"{{ correu }}"</code></p>
      <p>telefon = <code>"{{ telefon }}"</code></p>
    </div>
  </div>
</template>
