<template>
  <div 
    class="admin-sidebar fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-4 border-b border-gray-700">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">Administração</h2>
        <button 
          @click="$emit('close')" 
          class="text-white p-2 rounded-md hover:bg-gray-700"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    
    <nav class="mt-4">
      <div class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Configurações do Site
      </div>
      <ul>
        <li>
          <router-link 
            to="/admin/header" 
            class="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
            @click="$emit('close')"
          >
            <i class="fas fa-heading mr-2"></i> Header
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/footer" 
            class="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
            @click="$emit('close')"
          >
            <i class="fas fa-shoe-prints mr-2"></i> Footer
          </router-link>
        </li>
      </ul>
      
      <div class="mt-6 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Conteúdo da Viagem
      </div>
      <ul>
        <li v-show="false">
          <a href="#" class="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200">
            <i class="fas fa-info-circle mr-2"></i> Informações da Viagem
          </a>
        </li>
        <li>
          <router-link 
            to="/admin/itinerario" 
            class="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
            @click="$emit('close')"
          >
            <i class="fas fa-calendar-alt mr-2"></i> Itinerário
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/atividades" 
            class="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
            @click="$emit('close')"
          >
            <i class="fas fa-hiking mr-2"></i> Atividades
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/dicas"
            class="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
            @click="$emit('close')"
          >
            <i class="fas fa-lightbulb mr-2"></i> Dicas
          </router-link>
        </li>
      </ul>
    </nav>
    
    <div class="absolute bottom-0 w-full p-4 border-t border-gray-700">
      <p class="text-sm text-gray-400">
        Logado como <span class="font-semibold">Administrador</span>
      </p>
    </div>
  </div>
  
  <!-- Overlay para fechar o menu ao clicar fora -->
  <div 
    v-if="isOpen" 
    @click="$emit('close')" 
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
  ></div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

// Emits
defineEmits(['close']);
</script>

<style scoped>
.admin-sidebar {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
</style> 