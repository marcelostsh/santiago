<template>
  <nav class="sticky-nav bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 mb-12 overflow-x-auto">
    <div class="container mx-auto">
      <ul class="flex flex-nowrap justify-start sm:justify-center -mx-2 min-w-max">
        <li><a href="#visao-geral"
            class="nav-item inline-block px-4 py-2 mx-2 rounded-full text-blue-700 hover:text-white font-medium whitespace-nowrap">Visão
            Geral</a></li>
        <!-- Itens dinâmicos baseados no tripData -->
        <li v-for="item in days" :key="item.id">
          <a :href="`#${item.id}`"
            class="nav-item inline-block px-4 py-2 mx-2 rounded-full text-blue-700 hover:text-white font-medium whitespace-nowrap">
            {{ getDayLabel(item) }}
          </a>
        </li>
        <!-- Item fixo de dicas -->
        <li><a href="#dicas"
            class="nav-item inline-block px-4 py-2 mx-2 rounded-full text-blue-700 hover:text-white font-medium whitespace-nowrap">Dicas</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import tripData from '../../data/tripData.json';

// Filtra apenas os dias da viagem (excluindo as dicas)
const days = computed(() => tripData.filter(item => item.id.startsWith('dia')));

// Função para obter o rótulo do dia (Dia 1, Dia 2, etc.)
const getDayLabel = (item) => {
  const dayNumber = item.id.replace('dia', '');
  return `Dia ${dayNumber}`;
};
</script>

<style scoped>
.nav-item {
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: #2b6cb0;
  color: white !important;
}

.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 50;
}
</style> 