<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PestanyaConfiguracio',
  data() {
    return { nom: '', color: '#42b883', activat: true }
  },
})
</script>

<template>
  <div class="pestanya-cos">
    <h3>⚙️ Configuració</h3>
    <label class="camp">
      Nom d'usuari
      <input v-model="nom" placeholder="Escriu el teu nom..." />
    </label>
    <label class="camp" style="margin-top:10px">
      Color preferit
      <div style="display:flex;align-items:center;gap:10px">
        <input type="color" v-model="color" style="width:48px;height:32px;padding:2px;border-radius:6px;border:1px solid #ccc;cursor:pointer" />
        <code>{{ color }}</code>
      </div>
    </label>
    <label class="camp-inline" style="margin-top:12px">
      <input type="checkbox" v-model="activat" />
      Notificacions activades
    </label>
    <p class="hint">Activa KeepAlive i canvia de pestanya: les dades es mantenen.</p>
  </div>
</template>

<style scoped>
.camp { display: flex; flex-direction: column; gap: 4px; font-weight: 600; font-size: 0.9rem; }
.camp-inline { display: flex; flex-direction: row; align-items: center; gap: 8px; font-size: 0.9rem; }
.hint { font-size: 0.8rem; color: #888; margin-top: 12px; }
</style>
