<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TarjetaComp',
})
</script>

<template>
  <div class="targeta">
    <!-- Slot nomenat: capçalera -->
    <div class="capcalera">
      <slot name="capcalera">
        <strong>Títol per defecte</strong>
      </slot>
    </div>

    <!-- Slot per defecte: contingut -->
    <div class="cos">
      <slot>
        <p>Contingut per defecte</p>
      </slot>
    </div>

    <!-- Slot nomenat: peu -->
    <div class="peu">
      <slot name="peu">
        <!-- buit per defecte -->
      </slot>
    </div>
  </div>
</template>

<style scoped>
.targeta {
  border: 2px solid #e0e0e0; border-radius: 10px;
  overflow: hidden; max-width: 360px;
}
.capcalera {
  background: #42b883; color: white;
  padding: 12px 16px; font-size: 1rem;
}
.cos { padding: 14px 16px; }
.peu {
  border-top: 1px solid #e0e0e0;
  padding: 10px 16px; background: #f9f9f9;
  font-size: 0.85rem; color: #777;
}
</style>
