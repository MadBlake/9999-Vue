<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import ComptadorDin  from '@/components/ex26/ComptadorDin.vue'
import FormulariDin  from '@/components/ex26/FormulariDin.vue'
import LlistaFavorits from '@/components/ex26/LlistaFavorits.vue'

interface Pestanya { id: string; label: string; comp: object }

const pestanyes: Pestanya[] = [
  { id: 'comptador',  label: '🔢 Comptador',  comp: ComptadorDin  },
  { id: 'formulari',  label: '📝 Formulari',  comp: FormulariDin  },
  { id: 'favorits',   label: '⭐ Favorits',   comp: LlistaFavorits },
]

const activa      = shallowRef(pestanyes[0].comp)
const activaId    = ref(pestanyes[0].id)
const keepAliveOn = ref(true)

function canviar(p: Pestanya) { activa.value = p.comp; activaId.value = p.id }
</script>

<template>
  <div class="page">
    <h1>Exercici 26 — Components dinàmics</h1>
    <p class="subtitol">&lt;component :is&gt; + &lt;KeepAlive&gt; — shallowRef() per a components</p>

    <div class="card">
      <div class="opcio-keep">
        <input id="ka" type="checkbox" v-model="keepAliveOn" />
        <label for="ka">Activar <code>KeepAlive</code></label>
        <span v-if="keepAliveOn" class="badge green">Actiu</span>
        <span v-else class="badge red">Inactiu — l'estat es perd</span>
      </div>

      <div class="pestanyes">
        <button
          v-for="p in pestanyes"
          :key="p.id"
          :class="{ actiu: activaId === p.id }"
          @click="canviar(p)"
        >
          {{ p.label }}
        </button>
      </div>

      <div class="panell">
        <KeepAlive v-if="keepAliveOn">
          <component :is="activa" :key="activaId" />
        </KeepAlive>
        <component v-else :is="activa" :key="activaId" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.opcio-keep { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.opcio-keep label { font-weight: 600; cursor: pointer; }
.badge { font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 10px; }
.green { background: #e8f5e9; color: #27ae60; }
.red   { background: #fdecea; color: #e74c3c; }
.pestanyes { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
.pestanyes button { background: #f0f0f0; border: none; border-radius: 6px; padding: 8px 16px; font-size: 0.88rem; font-weight: 700; cursor: pointer; }
.pestanyes button.actiu { background: #42b883; color: white; }
.panell { border: 1px solid #e0e0e0; border-radius: 8px; padding: 18px; min-height: 140px; }
</style>
