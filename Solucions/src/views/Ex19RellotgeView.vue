<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Ex19RellotgeView',
  data() {
    return {
      hores: 0,
      minuts: 0,
      segons: 0,
      pausat: false,
      intervalId: null as ReturnType<typeof setInterval> | null,
    }
  },
  computed: {
    horaFormat(): string {
      return [
        String(this.hores).padStart(2, '0'),
        String(this.minuts).padStart(2, '0'),
        String(this.segons).padStart(2, '0'),
      ].join(':')
    },
  },
  mounted(): void {
    this.sincronitzarHora()
    this.intervalId = setInterval(() => {
      if (!this.pausat) this.sincronitzarHora()
    }, 1000)
  },
  unmounted(): void {
    if (this.intervalId) clearInterval(this.intervalId)
  },
  methods: {
    sincronitzarHora(): void {
      const ara = new Date()
      this.hores = ara.getHours()
      this.minuts = ara.getMinutes()
      this.segons = ara.getSeconds()
    },
    alternar(): void {
      this.pausat = !this.pausat
      if (!this.pausat) this.sincronitzarHora()
    },
  },
})
</script>

<template>
  <div class="page">
    <h1>Exercici 19 — Rellotge en temps real</h1>
    <p class="subtitol">setInterval en mounted(), clearInterval en unmounted(), pausa/reprèn</p>

    <div class="card" style="text-align:center;max-width:380px;margin:0 auto">
      <div class="rellotge">{{ horaFormat }}</div>
      <p style="color:#888;font-size:0.9rem;margin:6px 0 16px">
        {{ pausat ? '⏸ Pausat' : '▶ En curs' }}
      </p>
      <button @click="alternar" :class="pausat ? 'reprendre' : 'pausar'">
        {{ pausat ? '▶ Reprendre' : '⏸ Pausar' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.rellotge {
  font-size: 4rem; font-weight: 700; letter-spacing: 4px;
  color: #1a1a2e; margin: 16px 0 4px;
  font-variant-numeric: tabular-nums;
}
.pausar   { background: #e67e22; color: white; }
.reprendre { background: #27ae60; color: white; }
</style>
