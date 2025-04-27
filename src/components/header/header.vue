<template>
  <!-- Header & Hero Section -->
  <header 
    class="hero-bg text-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center"
    v-if="headerData"
    :style="headerBackgroundStyle"
  >
    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{{ headerData.title }}</h1>
    <p class="text-lg sm:text-xl lg:text-2xl mb-8">{{ headerData.subtitle }}</p>
    <div class="inline-flex bg-white text-blue-900 font-bold rounded-full px-6 py-2">
      <span class="mr-2"><i class="fas fa-calendar-alt"></i></span>
      {{ formatDateRange(headerData.period.start, headerData.period.end) }}
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getSiteHeader } from '../../services';

// Data for the header section
const headerData = ref(null);

// Computed background style based on headerData
const headerBackgroundStyle = computed(() => {
  if (!headerData.value || !headerData.value.backgroundImage) return {};
  
  return {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${headerData.value.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
});

// Format the date range for display
const formatDateRange = (start, end) => {
  // Parse date strings in DD/MM/YYYY format
  const [startDay, startMonth, startYear] = start.split('/');
  const [endDay, endMonth, endYear] = end.split('/');
  
  // Create date objects with correct format
  const startDate = new Date(`${startYear}-${startMonth}-${startDay}`);
  const endDate = new Date(`${endYear}-${endMonth}-${endDay}`);
  
  // Format the display
  const month = startDate.toLocaleString('pt-BR', { month: 'long' });
  const year = startDate.getFullYear();
  
  return `${parseInt(startDay)} a ${parseInt(endDay)} de ${month} de ${year}`;
};

// Fetch header data when component is mounted
onMounted(async () => {
  try {
    headerData.value = await getSiteHeader();
  } catch (error) {
    console.error('Erro ao carregar dados do header:', error);
  }
});
</script>

<style scoped>
</style> 