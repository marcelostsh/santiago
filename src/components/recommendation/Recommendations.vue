<script setup>
defineProps({
  recommendations: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section id="dicas" class="mb-20">
    <h2 class="text-3xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-300">{{ recommendations.titulo }}</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div v-for="(recomendacao, index) in recommendations.recomendacoes" :key="index" class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-bold text-blue-700 mb-4">{{ recomendacao.categoria }}</h3>
        <div v-for="(item, itemIndex) in recomendacao.itens" :key="itemIndex" class="flex items-start mb-4">
          <div class="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
            <i :class="item.icone"></i>
          </div>
          <div>
            <p class="font-medium">{{ item.titulo }}</p>
            <p class="text-gray-600">{{ item.descricao }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-blue-50 rounded-lg shadow-md p-6">
      <h3 class="text-xl font-bold text-blue-700 mb-4">Observações Finais</h3>
      <p class="text-gray-700 mb-4">{{ recommendations.observacoesFinais }}</p>
    </div>
  </section>
</template> 