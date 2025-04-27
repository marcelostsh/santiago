<script setup>
defineProps({
  recommendations: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section id="tips" class="mb-20">
    <h2 class="text-3xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-blue-300">Dicas e Recomendações</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div v-for="(category, index) in recommendations.categories" :key="index" class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-bold text-blue-700 mb-4">{{ category.title }}</h3>
        <div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="flex items-start mb-4">
          <div class="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
            <i :class="item.icon"></i>
          </div>
          <div>
            <p class="font-medium">{{ item.title }}</p>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-blue-50 rounded-lg shadow-md p-6" v-if="recommendations.observations">
      <h3 class="text-xl font-bold text-blue-700 mb-4">Observações Finais</h3>
      <p class="text-gray-700 mb-4">{{ recommendations.observations }}</p>
    </div>
  </section>
</template> 