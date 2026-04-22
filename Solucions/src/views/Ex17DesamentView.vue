<script lang="ts">
import { defineComponent } from 'vue'

type Estat = 'inactiu' | 'desant' | 'desat'

export default defineComponent({
  name: 'Ex17DesamentView',
  data() {
    return {
      text: '',
      estat: 'inactiu' as Estat,
      darrerDesament: null as string | null,
      timerId: null as ReturnType<typeof setTimeout> | null,
    }
  },
  watch: {
    text(): void {
      this.estat = 'desant'
      if (this.timerId) clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        this.estat = 'desat'
        this.darrerDesament = new Date().toLocaleTimeString('ca-ES')
        this.timerId = null
      }, 1000)
    },
  },
  computed: {
    badgeText(): string {
      if (this.estat === 'desant') return '💾 Desant...'
      if (this.estat === 'desat') return '✅ Desat'
      return '—'
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 17 — Desament automàtic</h1>
    <p class="subtitol">watch amb setTimeout ("debounce"), estat de desament</p>

    <div class="card" style="max-width:540px">
      <div class="barra-estat">
        <span :class="['badge', estat]">{{ badgeText }}</span>
        <span v-if="darrerDesament" style="font-size:0.82rem;color:#888">
          Últim desat: {{ darrerDesament }}
        </span>
      </div>
      <textarea
        v-model="text"
        rows="8"
        placeholder="Escriu alguna cosa... Es desarà automàticament 1 segon després d'aturar-te."
        style="width:100%;box-sizing:border-box;resize:vertical"
      ></textarea>
      <p style="color:#888;font-size:0.82rem;margin:6px 0 0">
        {{ text.length }} caràcters
      </p>
    </div>
  </div>
</template>

<style scoped>
.barra-estat {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px;
}
.badge { padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
.badge.inactiu { background: #f0f0f0; color: #888; }
.badge.desant  { background: #fff3cd; color: #856404; }
.badge.desat   { background: #d4edda; color: #155724; }
</style>
