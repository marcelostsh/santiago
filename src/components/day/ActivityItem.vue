<script setup>
defineProps({
  atividade: {
    type: Object,
    required: true
  }
});

// Função para gerar o link do Google Maps
function getGoogleMapsLink(position) {
  if (!position || !position.latitude || !position.longitude) {
    return null;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${position.latitude},${position.longitude}`;
}
</script>

<template>
  <div class="activity-item">
    <p class="font-medium">{{ atividade.titulo }}</p>
    <p class="text-gray-600">{{ atividade.descricao }}</p>
    <a v-if="atividade.position && atividade.position.latitude && atividade.position.longitude" 
       :href="getGoogleMapsLink(atividade.position)" 
       target="_blank" 
       class="inline-flex items-center text-blue-600 hover:text-blue-800 mt-1 text-sm">
      <i class="fas fa-map-marker-alt mr-1"></i> Como chegar
    </a>
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