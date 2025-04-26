<template>
  <!-- Header & Hero Section -->
  <header 
    class="hero-bg text-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center"
    v-if="headerData"
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
import { ref, onMounted } from 'vue';
import { getSiteHeader } from '../../services';

// Data for the header section
const headerData = ref(null);

// Format the date range for display
const formatDateRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const month = startDate.toLocaleString('pt-BR', { month: 'long' });
  const year = startDate.getFullYear();
  
  return `${startDay} a ${endDay} de ${month} de ${year}`;
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
.hero-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), v-bind('headerData ? `url(${headerData.backgroundImage})` : ""');
  background-size: cover;
  background-position: center;
}
</style> 