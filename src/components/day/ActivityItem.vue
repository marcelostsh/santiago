<script setup>
defineProps({
  atividade: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="activity-item">
    <p class="font-medium">{{ atividade.titulo }}</p>
    <p class="text-gray-600">{{ atividade.descricao }}</p>
    
    <!-- Anotação da atividade (se existir) -->
    <p v-if="atividade.note" class="mt-2 text-sm italic text-gray-700 bg-gray-50 p-2 rounded whitespace-pre-wrap">
      {{ atividade.note }}
    </p>
    
    <div class="mt-1 flex gap-2 flex-wrap">
      <a v-if="atividade.location" 
         :href="atividade.location" 
         target="_blank" 
         class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
        <i class="fas fa-map-marker-alt mr-1"></i> 
      </a>
      <a v-if="atividade.links && atividade.links.site" 
         :href="atividade.links.site" 
         target="_blank" 
         class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
        <i class="fas fa-globe mr-1"></i>
      </a>
      <a v-if="atividade.links && atividade.links.instagram" 
         :href="atividade.links.instagram" 
         target="_blank" 
         class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
        <i class="fab fa-instagram mr-1"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
.activity-item {
  border-left: 4px solid #3182ce;
  padding-left: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.activity-item::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #3182ce;
  border-radius: 50%;
  left: -8px;
  top: 0.6em;
  transform: translateY(-50%);
}
</style> 