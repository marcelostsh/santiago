<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Controller } from 'swiper/modules'; // Import Controller
import 'swiper/css';
import 'swiper/css/navigation'; // If using navigation buttons

// Define props, including the controlled swiper instance from the parent
const props = defineProps({
  days: {
    type: Array,
    required: true
  },
  controlledSwiper: { // Prop to receive the main swiper instance
    type: Object,
    default: null
  },
  activeIndex: { // Prop to receive the active index
    type: Number,
    default: 0
  }
});

// Define emits for communication with the component pai
const emit = defineEmits(['goToDay', 'swiper']); // Add 'swiper' emit

// Function to format the day display text
function formatDayText(day) {
  const dayNumber = day.id.replace('dia', '');

  // Helper function to parse dd/mm/yyyy from the string
  const parseDate = (dateString) => {
    const match = dateString.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (match) {
      // Note: Month is 0-indexed in JavaScript Date object
      return new Date(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]));
    }
    return null;
  };

  // Portuguese full month names
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const eventDate = parseDate(day.data);
  if (!eventDate) {
    return `Dia ${dayNumber}`; // Fallback if date parsing fails
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  let dateLabel = '';

  if (eventDate.getTime() === today.getTime()) {
    dateLabel = 'Hoje';
  } else if (eventDate.getTime() === tomorrow.getTime()) {
    dateLabel = 'Amanhã';
  } else {
    const dayOfMonth = eventDate.getDate();
    const monthName = monthNames[eventDate.getMonth()]; // Use full month name
    dateLabel = `${dayOfMonth} de ${monthName}`; // Format as "d de Mmmm"
  }

  return `Dia ${dayNumber} - ${dateLabel}`;
}

// Função para emitir o evento com o índice do dia
function navigateToDay(index) {
  emit('goToDay', index);
}

// Function to handle the swiper instance creation
function onSwiper(swiperInstance) {
  emit('swiper', swiperInstance); // Emit the instance to the parent
}

const modules = [Controller]; // Add Controller to modules

</script>

<template>
  <nav class="day-menu-swiper-container bg-[#eaeaea] p-4 sticky top-0 z-40 border-b border-gray-300">
    <!-- Removed h3 title -->
    <swiper
      :modules="modules"
      :slides-per-view="'auto'"
      :space-between="10"
      :centered-slides="true"
      :grab-cursor="true"
      @swiper="onSwiper"
      class="day-menu-swiper"
    >
      <swiper-slide v-for="(day, index) in props.days" :key="day.id" class="day-menu-slide">
        <button
           @click="navigateToDay(index)"
           :class="[
             'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer whitespace-nowrap',
             index === props.activeIndex 
               ? 'bg-blue-600 text-white font-semibold' 
               : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
           ]"
           >
          {{ formatDayText(day) }}
        </button>
      </swiper-slide>
    </swiper>
  </nav>
</template>

<style scoped>
.day-menu-swiper-container {
  /* Adjust container padding if needed */
  padding-left: 1rem;
  padding-right: 1rem;
}

.day-menu-swiper {
  width: 100%;
}

.day-menu-slide {
  width: auto !important; /* Important for slidesPerView: 'auto' */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Adiciona um pouco de espaçamento acima quando a navegação fica fixa */
.sticky {
  padding-top: 1rem; /* Ajuste conforme necessário */
}
</style> 