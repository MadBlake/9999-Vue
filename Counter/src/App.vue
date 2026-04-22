<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<template>
  <nav>
    <RouterLink to="/">Contador Bàsic</RouterLink>
    <RouterLink to="/contador-reset">Contador amb Reset</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Arial, sans-serif; background: #f5f5f5; }

nav {
  background: #1a1a2e;
  padding: 12px 20px;
  display: flex;
  gap: 12px;
}

nav a {
  color: #aaa;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 6px 14px;
  border-radius: 6px;
}

nav a.router-link-active {
  color: white;
  background: #42b883;
}

main {
  padding: 40px 20px;
  max-width: 500px;
  margin: 0 auto;
}
</style>
