<script setup>
// Trip Overview Component
</script>

<template>
  <section id="visao-geral" class="p-6">
    <h2 class="text-3xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-300">Visão Geral da Viagem</h2>
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <p class="text-lg mb-4">Este roteiro inclui 8 dias no Chile, com base em Santiago, combinando
        experiências incríveis:</p>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <li class="flex items-start">
          <div class="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
            <i class="fas fa-snowflake"></i>
          </div>
          <p>Aventuras na neve (Valle Nevado e Portillo)</p>
        </li>
        <li class="flex items-start">
          <div class="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
            <i class="fas fa-city"></i>
          </div>
          <p>Turismo urbano em Santiago</p>
        </li>
        <li class="flex items-start">
          <div class="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
            <i class="fas fa-mountain"></i>
          </div>
          <p>Passeios a Valparaíso e Viña del Mar</p>
        </li>
        <li class="flex items-start">
          <div class="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
            <i class="fas fa-wine-glass-alt"></i>
          </div>
          <p>Degustação em vinícolas</p>
        </li>
        <li class="flex items-start">
          <div class="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
            <i class="fas fa-utensils"></i>
          </div>
          <p>Experiências gastronômicas</p>
        </li>
        <li class="flex items-start">
          <div class="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
            <i class="fas fa-church"></i>
          </div>
          <p>Visitas culturais e religiosas</p>
        </li>
      </ul>
      <div class="text-gray-700 italic">
        <p>A probabilidade de neve em Valle Nevado durante nossa visita é classificada como média a alta, o
          que promete uma experiência incrível com a neve andina.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* These styles are specific to the overview component */
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
  top: 50%;
  transform: translateY(-50%);
}
</style> 