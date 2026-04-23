<script lang="ts">
import { defineComponent } from 'vue'

interface Exercici { num: string; nom: string }
interface Grup { titol: string; color: string; exercicis: Exercici[] }

export default defineComponent({
  name: 'App',
  data() {
    return {
      grups: [
        { titol: 'Bloc 1 — Sintaxi bàsica', color: '#27ae60', exercicis: [
          { num: '01', nom: 'Targeta de presentació' },
          { num: '02', nom: 'Commutador de llum' },
          { num: '03', nom: 'Conversió temperatura' },
          { num: '04', nom: 'Llista de la compra' },
          { num: '05', nom: 'Validació formulari' },
        ]},
        { titol: 'Bloc 2 — Directives', color: '#2980b9', exercicis: [
          { num: '06', nom: 'Semàfor' },
          { num: '07', nom: 'Taula de multiplicar' },
          { num: '08', nom: 'Filtre de llista' },
          { num: '09', nom: 'Acordió FAQ' },
          { num: '10', nom: 'Taulell de notes' },
        ]},
        { titol: 'Bloc 3 — Components', color: '#8e44ad', exercicis: [
          { num: '11', nom: 'Component Avatar' },
          { num: '12', nom: 'Botó personalitzat' },
          { num: '13', nom: 'Comptador pare-fill' },
          { num: '14', nom: 'v-model personalitzat' },
          { num: '15', nom: 'Targeta amb slots' },
          { num: '26', nom: 'Components dinàmics' },
        ]},
        { titol: 'Bloc 4 — Reactivitat', color: '#e67e22', exercicis: [
          { num: '16', nom: 'Historial de cerca' },
          { num: '17', nom: 'Desament automàtic' },
          { num: '18', nom: 'Cistella de compra' },
          { num: '19', nom: 'Rellotge en temps real' },
          { num: '20', nom: 'Provide / Inject tema' },
        ]},
        { titol: 'Bloc 5 — Router', color: '#c0392b', exercicis: [
          { num: '21', nom: 'Navegació amb paràmetres' },
          { num: '22', nom: 'Formulari wizard' },
        ]},
        { titol: 'Bloc 6 — Integrats', color: '#1a1a2e', exercicis: [
          { num: '23', nom: 'Gestor de tasques' },
          { num: '24', nom: 'Joc de memòria' },
          { num: '25', nom: 'Dashboard estadístiques' },
        ]},
      ] as Grup[],
    }
  },
})
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-brand">Solucions Vue.js</div>
      <nav>
        <RouterLink to="/" class="home-link">🏠 Índex</RouterLink>
        <div v-for="grup in grups" :key="grup.titol" class="grup">
          <div class="grup-titol" :style="{ borderLeftColor: grup.color }">{{ grup.titol }}</div>
          <RouterLink
            v-for="ex in grup.exercicis"
            :key="ex.num"
            :to="'/ex' + ex.num"
            class="ex-link"
          >
            <span class="ex-num" :style="{ background: grup.color }">{{ ex.num }}</span>
            {{ ex.nom }}
          </RouterLink>
        </div>
      </nav>
    </aside>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Arial, sans-serif; background: #f0f2f5; }

.layout { display: flex; min-height: 100vh; }

.sidebar {
  width: 260px;
  flex-shrink: 0;
  background: #1a1a2e;
  color: white;
  overflow-y: auto;
  height: 100vh;
  position: sticky;
  top: 0;
}
.sidebar-brand {
  padding: 16px;
  font-weight: 700;
  font-size: 1rem;
  color: #42b883;
  border-bottom: 1px solid #333;
}
.home-link {
  display: block;
  padding: 8px 16px;
  color: #aaa;
  text-decoration: none;
  font-size: 0.88rem;
  margin-bottom: 4px;
}
.home-link:hover { color: white; }
.home-link.router-link-active { color: #42b883; }

.grup { margin-bottom: 4px; }
.grup-titol {
  padding: 8px 16px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #888;
  letter-spacing: 0.5px;
  border-left: 3px solid #42b883;
  margin-top: 8px;
}
.ex-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 16px;
  color: #aaa;
  text-decoration: none;
  font-size: 0.82rem;
}
.ex-link:hover { color: white; background: #ffffff10; }
.ex-link.router-link-active { color: white; background: #42b88320; }
.ex-num {
  font-size: 0.68rem;
  font-weight: 700;
  color: white;
  border-radius: 4px;
  padding: 1px 5px;
  flex-shrink: 0;
}

.content { flex: 1; padding: 28px; max-width: 800px; }

/* Shared styles used across exercise views */
.page h1 { font-size: 1.4rem; color: #1a1a2e; margin-bottom: 4px; }
.page .subtitol { font-size: 0.85rem; color: #888; margin-bottom: 20px; }
.page .card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 14px;
}
.page button {
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}
.page button:hover { opacity: 0.85; }
.page button:disabled { background: #ccc; cursor: not-allowed; opacity: 1; }
.page input, .page select, .page textarea {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 0.9rem;
}
.page input:focus, .page select:focus, .page textarea:focus {
  outline: 2px solid #42b883;
  border-color: #42b883;
}
</style>
