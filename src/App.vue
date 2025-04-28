<script setup>
// Roteiro de Viagem Chile 2025
import { ref, onMounted, computed } from 'vue'; // Importar ref para a instância do Swiper e onMounted para carregar dados
import Header from './components/header/header.vue'
// import NavigationMenu from './components/navigationmenu/navigationmenu.vue' // Removido
import TripOverview from './components/overview/TripOverview.vue'
import DayMenu from './components/navigation/DayMenu.vue'; // Uncommented
import FooterSection from './components/footer/FooterSection.vue'
import DayCard from './components/day/DayCard.vue'
import Recommendations from './components/recommendation/Recommendations.vue'
// Removida importação direta do JSON
import { getItinerary, getTips } from './services'; // Importar serviços para buscar dados
import { useRoute } from 'vue-router';

// Verificar se estamos em uma rota de admin
const route = useRoute();
const isAdminRoute = computed(() => {
  const isAdmin = route.path.startsWith('/admin');
  console.log('Current route:', route.path, 'isAdmin:', isAdmin);
  return isAdmin;
});

// Importar Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Controller } from 'swiper/modules'; // Adicionar Controller se necessário
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Referências para armazenar os dados carregados
const days = ref([]);
const recommendations = ref(null);

// Carregar dados quando componente for montado
onMounted(async () => {
  // Não carregar dados da viagem se estivermos na área administrativa
  if (isAdminRoute.value) return;
  
  try {
    // Carregar itinerário (dias)
    const itineraryData = await getItinerary();
    if (itineraryData) {
      days.value = itineraryData.filter(item => item.id.startsWith('day'));
    }
    
    // Carregar dicas (recommendations)
    const tipsData = await getTips();
    if (tipsData) {
      recommendations.value = tipsData;
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
});

const modules = [Navigation, Pagination, Controller];
const mainSwiper = ref(null); // Ref para a instância do Swiper
const dayMenuSwiper = ref(null); // Ref for the DayMenu Swiper
const activeDayIndex = ref(0); // Ref to track the active index

const onSwiper = (swiper) => {
  mainSwiper.value = swiper;
  activeDayIndex.value = swiper.activeIndex; // Set initial index
};

const onDayMenuSwiper = (swiper) => { // Handler for DayMenu Swiper
  dayMenuSwiper.value = swiper;
};

// Função para ser chamada pelo DayMenu
const goToDaySlide = (index) => {
  mainSwiper.value?.slideTo(index);
};

// Handler for main swiper slide change
const onMainSlideChange = (swiper) => {
  activeDayIndex.value = swiper.activeIndex; // Update active index
  // When the main swiper changes, update the day menu swiper
  if (dayMenuSwiper.value) {
    dayMenuSwiper.value.slideTo(swiper.activeIndex);
  }
};

</script>

<template>
  <!-- Conteúdo da área admin é renderizado pelo router-view -->
  <router-view v-if="isAdminRoute"></router-view>
  
  <!-- Conteúdo normal do site quando não estiver na área administrativa -->
  <div v-else>
    <!-- Header Component -->
    <Header />

    <!-- Overview Section - Movido para cima -->
    <TripOverview />

    <!-- Main Content -->
    <main class="container container-swiper mx-auto px-4 sm:px-6 lg:px-8" v-if="days.length > 0">

      <!-- Day Navigation Menu -->
      <DayMenu
        :days="days"
        @go-to-day="goToDaySlide"
        @swiper="onDayMenuSwiper"
        :controlled-swiper="mainSwiper"
        :active-index="activeDayIndex" 
      /> <!-- Pass active index as prop --> <!-- Pass main swiper for control -->

      <!-- Swiper para os Dias da Viagem -->
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        :navigation="false"
        :pagination="{ el: '.main-swiper-pagination', clickable: true }"
        :auto-height="true"
        @swiper="onSwiper"
        @slideChange="onMainSlideChange"
        class="main-day-swiper"
      >
        <swiper-slide v-for="(day, index) in days" :key="day.id">
          <DayCard :day="day" />
        </swiper-slide>
      </swiper>
      <!-- Container customizado para a paginação -->
      <div class="main-swiper-pagination"></div>
    </main>
    <div class="container" v-if="recommendations">
      <!-- Recomendações Adicionais -->
      <Recommendations :recommendations="recommendations" />
    </div>
    <!-- Footer Component -->
    <FooterSection />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css');

body {
  font-family: 'Montserrat', sans-serif;
  color: #333;
  background-color: #f8f9fa;
}

/* Container styles needed for the main content */
.container {
  width: 100%;
  max-width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.container-swiper {
  padding-left: 0;
  padding-right: 0;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

/* Impedir rolagem horizontal */
html, body {
  overflow-x: hidden;
  max-width: 100%;
}

img {
  max-width: 100%;
}

@media print {
  .sticky-nav {
    position: relative;
  }

  .no-print {
    display: none;
  }
}

/* Estilos para o Swiper principal */
.main-day-swiper {
  width: 100%;
  padding-bottom: 50px; 
  background: #eaeaea;
  border: solid 1px #c1c1c1;
  padding: 20px;
  margin-bottom: 40px;
}

/* Estilo para o container customizado da paginação */
.main-swiper-pagination {
    position: relative;
    text-align: center;
    top: -95px !important;
    margin-bottom: 0px;
    z-index: 99;
}

/* Ajustar a posição padrão dos bullets */
.main-swiper-pagination .swiper-pagination-bullet {
  margin: 0 5px; /* Espaçamento entre bullets */
}

/* Remover setas */
:deep(.main-day-swiper .swiper-button-next),
:deep(.main-day-swiper .swiper-button-prev) {
  display: none; /* Esconder as setas */
}

/* Garantir que DayCard não tenha margens que interfiram no layout do slide */
:deep(.main-day-swiper .swiper-slide > section) { /* Seleciona a <section> dentro do DayCard */
  margin-bottom: 0 !important; /* Remove margem inferior do DayCard dentro do slide */
}
</style>
