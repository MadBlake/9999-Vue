<script setup lang="ts">
// No lògica — component purament de presentació amb 3 slots nomenats
</script>

<template>
  <div class="targeta">
    <header class="cap">
      <slot name="cap">Capçalera per defecte</slot>
    </header>
    <section class="cos">
      <slot>Cos per defecte</slot>
    </section>
    <footer class="peu">
      <slot name="peu">Peu per defecte</slot>
    </footer>
  </div>
</template>

<style scoped>
.targeta { border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; }
.cap { background: #1a1a2e; color: white; padding: 12px 16px; font-weight: 700; }
.cos { padding: 16px; }
.peu { background: #f8f8f8; padding: 10px 16px; font-size: 0.85rem; color: #888; border-top: 1px solid #e0e0e0; }
</style>
