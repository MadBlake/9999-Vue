<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PestanyaEstadistiques',
  data() {
    return { clicks: 0 }
  },
})
</script>

<template>
  <div class="pestanya-cos">
    <h3>📊 Estadístiques</h3>
    <p>Clics en aquesta pestanya: <strong style="font-size:1.4rem">{{ clicks }}</strong></p>
    <button @click="clicks++" style="margin-top:10px">+1 clic</button>
    <p class="hint">Activa KeepAlive i canvia de pestanya: el comptador es conserva.</p>
  </div>
</template>
