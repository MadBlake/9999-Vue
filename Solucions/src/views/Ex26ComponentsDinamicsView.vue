<script lang="ts">
import { defineComponent } from 'vue'
import PestanyaInfo from '@/components/ex26/PestanyaInfo.vue'
import PestanyaEstadistiques from '@/components/ex26/PestanyaEstadistiques.vue'
import PestanyaConfiguracio from '@/components/ex26/PestanyaConfiguracio.vue'

const CODI = [
  '<!-- Sense KeepAlive: estat es perd en canviar -->',
  '<component :is="componentActiu" />',
  '',
  '<!-- Amb KeepAlive: estat es preserva -->',
  '<KeepAlive>',
  '  <component :is="componentActiu" />',
  '</KeepAlive>',
  '',
  '// computed retorna la definicio del component actiu',
  'computed: {',
  '  componentActiu() {',
  "    return { PestanyaInfo, PestanyaEstadistiques, PestanyaConfiguracio }[this.activa]",
  '  }',
  '}',
].join('\n')

export default defineComponent({
  name: 'Ex26ComponentsDinamicsView',
  components: { PestanyaInfo, PestanyaEstadistiques, PestanyaConfiguracio },
  data() {
    return {
      pestanyaActiva: 'PestanyaInfo' as string,
      keepAlive: false,
      codiExemple: CODI,
      pestanyes: [
        { id: 'PestanyaInfo',          label: 'Informació',    icon: 'ℹ️' },
        { id: 'PestanyaEstadistiques', label: 'Estadístiques', icon: '📊' },
        { id: 'PestanyaConfiguracio',  label: 'Configuració',  icon: '⚙️' },
      ],
    }
  },
  computed: {
    componentActiu(): object {
      const mapa: Record<string, object> = {
        PestanyaInfo,
        PestanyaEstadistiques,
        PestanyaConfiguracio,
      }
      return mapa[this.pestanyaActiva]
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 26 — Components dinàmics</h1>
    <p class="subtitol">
      <code>&lt;component :is&gt;</code> + <code>KeepAlive</code> — canvi de component en temps d'execució
    </p>

    <div class="card" style="padding:12px 16px;margin-bottom:14px">
      <label class="keep-label">
        <input type="checkbox" v-model="keepAlive" />
        Activar <code>KeepAlive</code>
        <span class="badge-ka" :class="keepAlive ? 'actiu' : 'inactiu'">
          {{ keepAlive ? 'ON ✅' : 'OFF' }}
        </span>
      </label>
      <p style="font-size:0.82rem;color:#888;margin:6px 0 0">
        Sense KeepAlive, l'estat intern (comptador, formulari) es perd en canviar de pestanya.
      </p>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div class="pestanyes-cap">
        <button
          v-for="p in pestanyes"
          :key="p.id"
          class="pestanya-btn"
          :class="{ activa: pestanyaActiva === p.id }"
          @click="pestanyaActiva = p.id"
        >
          {{ p.icon }} {{ p.label }}
        </button>
      </div>

      <KeepAlive v-if="keepAlive">
        <component :is="pestanyaActiva" />
      </KeepAlive>
      <component v-else :is="pestanyaActiva" :key="pestanyaActiva" />
    </div>

    <div class="card explicacio">
      <h3>Sintaxi clau</h3>
      <pre><code>{{ codiExemple }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.pestanyes-cap { display: flex; border-bottom: 2px solid #e0e0e0; background: #f9f9f9; }
.pestanya-btn {
  flex: 1; padding: 12px 8px; border: none; background: none;
  cursor: pointer; font-size: 0.9rem; font-weight: 600; color: #888;
  border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.2s;
}
.pestanya-btn:hover { color: #42b883; background: #f0faf5; }
.pestanya-btn.activa { color: #42b883; border-bottom-color: #42b883; background: white; }
.keep-label { display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer; }
.badge-ka { padding: 2px 8px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; }
.badge-ka.actiu   { background: #d4edda; color: #155724; }
.badge-ka.inactiu { background: #f0f0f0; color: #888; }
.explicacio { background: #1a1a2e; color: #eee; }
.explicacio h3 { color: #42b883; margin-bottom: 10px; }
.explicacio pre { margin: 0; white-space: pre-wrap; font-size: 0.82rem; line-height: 1.7; font-family: monospace; }
</style>

<style>
.pestanya-cos { padding: 20px; }
.pestanya-cos ul { padding-left: 18px; margin: 8px 0 0; line-height: 1.9; }
.pestanya-cos code { background: #f0f0f0; padding: 1px 5px; border-radius: 4px; font-size: 0.88em; }
.pestanya-cos .camp { display: flex; flex-direction: column; gap: 4px; font-weight: 600; font-size: 0.9rem; }
.pestanya-cos .camp-inline { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; cursor: pointer; }
.pestanya-cos .hint { font-size: 0.85rem; color: #888; margin-top: 12px; }
</style>
