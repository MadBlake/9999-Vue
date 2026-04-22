<script lang="ts">
import { defineComponent } from 'vue'

interface Dades {
  nom: string
  cognom: string
  correu: string
  telefon: string
  accepta: boolean
}

export default defineComponent({
  name: 'Ex22WizardView',
  data() {
    return {
      pas: 1,
      enviat: false,
      dades: {
        nom: '',
        cognom: '',
        correu: '',
        telefon: '',
        accepta: false,
      } as Dades,
    }
  },
  computed: {
    progressPercent(): number {
      return Math.round((this.pas / 3) * 100)
    },
    pas1Valid(): boolean {
      return this.dades.nom.trim().length >= 2 && this.dades.cognom.trim().length >= 2
    },
    pas2Valid(): boolean {
      return this.dades.correu.includes('@') && this.dades.telefon.trim().length >= 9
    },
    pas3Valid(): boolean {
      return this.dades.accepta
    },
  },
  methods: {
    seguent(): void {
      if (this.pas < 3) this.pas++
    },
    anterior(): void {
      if (this.pas > 1) this.pas--
    },
    enviar(): void {
      this.enviat = true
    },
    reiniciar(): void {
      this.pas = 1
      this.enviat = false
      this.dades = { nom: '', cognom: '', correu: '', telefon: '', accepta: false }
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 22 — Formulari Wizard</h1>
    <p class="subtitol">Formulari multi-pas amb pas data(), v-if/v-else-if, barra de progrés</p>

    <div v-if="!enviat" class="card wizard" style="max-width:480px">
      <!-- Barra de progrés -->
      <div class="barra-progrés">
        <div class="barra-fons">
          <div class="barra-farcit" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <p style="margin:6px 0 0;font-size:0.85rem;color:#888">Pas {{ pas }} de 3</p>
      </div>

      <!-- Pas 1: Dades personals -->
      <div v-if="pas === 1">
        <h3>Pas 1 — Dades personals</h3>
        <label>Nom <input v-model="dades.nom" placeholder="Joan" /></label>
        <label>Cognom <input v-model="dades.cognom" placeholder="Pérez" /></label>
      </div>

      <!-- Pas 2: Contacte -->
      <div v-else-if="pas === 2">
        <h3>Pas 2 — Informació de contacte</h3>
        <label>Correu electrònic <input v-model="dades.correu" type="email" placeholder="joan@exemple.cat" /></label>
        <label>Telèfon <input v-model="dades.telefon" type="tel" placeholder="600 123 456" /></label>
      </div>

      <!-- Pas 3: Confirmació -->
      <div v-else>
        <h3>Pas 3 — Confirmació</h3>
        <div class="resum">
          <p><strong>Nom:</strong> {{ dades.nom }} {{ dades.cognom }}</p>
          <p><strong>Correu:</strong> {{ dades.correu }}</p>
          <p><strong>Telèfon:</strong> {{ dades.telefon }}</p>
        </div>
        <label class="checkbox-label">
          <input v-model="dades.accepta" type="checkbox" />
          Accepto les condicions d'ús
        </label>
      </div>

      <!-- Botons de navegació -->
      <div class="botons-nav">
        <button v-if="pas > 1" class="btn-anterior" @click="anterior">← Anterior</button>
        <button
          v-if="pas < 3"
          :disabled="pas === 1 ? !pas1Valid : !pas2Valid"
          @click="seguent"
        >
          Següent →
        </button>
        <button
          v-else
          :disabled="!pas3Valid"
          class="btn-enviar"
          @click="enviar"
        >
          ✅ Enviar
        </button>
      </div>
    </div>

    <!-- Èxit -->
    <div v-else class="card exit" style="text-align:center;max-width:480px">
      <p style="font-size:3rem">🎉</p>
      <h3>Registre completat!</h3>
      <p>Benvingut/da, <strong>{{ dades.nom }} {{ dades.cognom }}</strong></p>
      <button @click="reiniciar">Fer un nou registre</button>
    </div>
  </div>
</template>

<style scoped>
.wizard label { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; font-weight: 600; font-size: 0.9rem; }
.wizard input[type="text"], .wizard input[type="email"], .wizard input[type="tel"] { padding: 9px; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem; }
.checkbox-label { flex-direction: row !important; align-items: center; gap: 8px !important; font-weight: 400 !important; }
.barra-progrés { margin-bottom: 20px; }
.barra-fons { height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden; }
.barra-farcit { height: 100%; background: #42b883; border-radius: 4px; transition: width 0.4s; }
.botons-nav { display: flex; justify-content: space-between; margin-top: 16px; }
.btn-anterior { background: #e0e0e0; color: #333; }
.btn-enviar { background: #27ae60; color: white; }
.resum { background: #f9f9f9; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.resum p { margin: 4px 0; }
</style>
