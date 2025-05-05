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
  if (!day || !day.id) return 'Dia';
  
  const dayNumber = day.id.replace('day-', '');

  // Portuguese full month names
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
  // Portuguese weekday names
  const weekdayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  let eventDate = null;
  let year, month, date;
  
  // Tratamento para formato ISO (YYYY-MM-DD)
  if (day.date) {
    // Forçando interpretação correta sem problemas de UTC
    [year, month, date] = day.date.split('-').map(Number);
    // Criando data com os componentes específicos (ano, mês (0-11), dia)
    eventDate = new Date(year, month - 1, date, 12, 0, 0);
  }
  
  // Tratamento para formato dd/mm/yyyy
  else if (day.data) {
    const match = day.data.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (match) {
      date = parseInt(match[1]);
      month = parseInt(match[2]);
      year = parseInt(match[3]);
      // Adicionando meio-dia para evitar problemas de fuso
      eventDate = new Date(year, month - 1, date, 12, 0, 0);
    }
  }
  
  if (!eventDate || isNaN(eventDate.getTime())) {
    return `Dia ${dayNumber}`; // Fallback se parsing falhar
  }

  // Configurando today e tomorrow com hora fixa também
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  let dateLabel = '';

  // Comparações usando dia, mês e ano em vez de timestamp
  if (eventDate.getDate() === today.getDate() && 
      eventDate.getMonth() === today.getMonth() && 
      eventDate.getFullYear() === today.getFullYear()) {
    const dayOfMonth = eventDate.getDate();
    const monthName = monthNames[eventDate.getMonth()];
    const weekdayName = weekdayNames[eventDate.getDay()];
    dateLabel = `Hoje, ${weekdayName}, ${dayOfMonth} de ${monthName}`;
  } else if (eventDate.getDate() === tomorrow.getDate() && 
            eventDate.getMonth() === tomorrow.getMonth() && 
            eventDate.getFullYear() === tomorrow.getFullYear()) {
    const dayOfMonth = eventDate.getDate();
    const monthName = monthNames[eventDate.getMonth()];
    const weekdayName = weekdayNames[eventDate.getDay()];
    dateLabel = `Amanhã, ${weekdayName}, ${dayOfMonth} de ${monthName}`;
  } else {
    const dayOfMonth = eventDate.getDate();
    const monthName = monthNames[eventDate.getMonth()];
    const weekdayName = weekdayNames[eventDate.getDay()];
    dateLabel = `${weekdayName}, ${dayOfMonth} de ${monthName}`;
  }

  return `${dateLabel}`;
}

// Function to determine if a day is in the past, today, tomorrow, or future
function getDayStatus(day) {
  if (!day || !day.id) return 'future';
  
  let eventDate = null;
  let year, month, date;
  
  // Tratamento para formato ISO (YYYY-MM-DD)
  if (day.date) {
    [year, month, date] = day.date.split('-').map(Number);
    eventDate = new Date(year, month - 1, date, 12, 0, 0);
  }
  // Tratamento para formato dd/mm/yyyy
  else if (day.data) {
    const match = day.data.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (match) {
      date = parseInt(match[1]);
      month = parseInt(match[2]);
      year = parseInt(match[3]);
      eventDate = new Date(year, month - 1, date, 12, 0, 0);
    }
  }
  
  if (!eventDate || isNaN(eventDate.getTime())) {
    return 'future'; // Fallback
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  // Reset para comparação apenas por data
  eventDate.setHours(0, 0, 0, 0);
  
  if (eventDate < today) {
    return 'past';
  } else if (eventDate.getTime() === today.getTime()) {
    return 'today';
  } else if (eventDate.getTime() === tomorrow.getTime()) {
    return 'tomorrow';
  } else {
    return 'future';
  }
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
               : getDayStatus(day) === 'today'
                 ? 'bg-green-500 text-white font-semibold' 
                 : getDayStatus(day) === 'tomorrow'
                   ? 'bg-yellow-400 text-yellow-800 hover:bg-yellow-500'
                   : getDayStatus(day) === 'past'
                     ? 'bg-gray-200 text-gray-500 hover:bg-gray-300'
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