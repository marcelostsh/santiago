<script setup>
defineProps({
  days: {
    type: Array,
    required: true
  }
});

// Definir emits para comunicação com o componente pai
const emit = defineEmits(['goToDay']);

// Função para emitir o evento com o índice do dia
function navigateToDay(index) {
  emit('goToDay', index);
}
</script>

<template>
  <nav class="bg-white shadow-md rounded-lg p-4 mb-8 sticky top-0 z-40">
    <h3 class="text-lg font-semibold text-blue-800 mb-3 text-center">Navegue pelos Dias</h3>
    <ul class="flex flex-wrap justify-center gap-2">
      <li v-for="(day, index) in days" :key="day.id">
        <button 
           @click="navigateToDay(index)"
           class="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200 ease-in-out cursor-pointer">
          {{ day.titulo.split(' - ')[0] }} <!-- Exibe apenas 'Dia X' -->
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Adiciona um pouco de espaçamento acima quando a navegação fica fixa */
.sticky {
  padding-top: 1rem; /* Ajuste conforme necessário */
}
/* Estilos adicionais se necessários */
</style> 