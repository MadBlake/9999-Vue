<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PestanyaInfo',
})
</script>

<template>
  <div class="pestanya-cos">
    <h3>ℹ️ Informació</h3>
    <p>Els <strong>components dinàmics</strong> permeten canviar el component renderitzat en temps d'execució amb <code>&lt;component :is="..."&gt;</code>.</p>
    <ul>
      <li>El valor de <code>:is</code> pot ser un nom (string) o la definició del component (objecte)</li>
      <li>Útil per a pestanyes, wizards i panells intercanviables</li>
      <li>Combinat amb <code>KeepAlive</code>, l'estat intern es preserva entre canvis</li>
    </ul>
  </div>
</template>
