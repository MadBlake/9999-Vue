<script lang="ts">
import { defineComponent } from 'vue'
import ContingutComp from './ContingutComp.vue'

export default defineComponent({
  name: 'PanellComp',
  components: { ContingutComp },
})
</script>

<template>
  <div class="panell">
    <p style="font-size:0.82rem;color:#888;margin:0 0 8px">
      ↳ <em>PanellComp</em> (intermediari — no accedeix al tema)
    </p>
    <ContingutComp />
  </div>
</template>

<style scoped>
.panell {
  border: 1px dashed #ccc; border-radius: 8px;
  padding: 12px; margin-top: 8px;
}
</style>
