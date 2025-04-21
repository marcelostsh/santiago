<script setup>
// Roteiro de Viagem Chile 2025
import Header from './components/header/header.vue'
import NavigationMenu from './components/navigationmenu/navigationmenu.vue'
import TripOverview from './components/overview/TripOverview.vue'
import FooterSection from './components/footer/FooterSection.vue'
import DayCard from './components/day/DayCard.vue'
import Recommendations from './components/recommendation/Recommendations.vue'
import tripData from './data/tripData.json'

// Separar os dias regulares das recomendações adicionais
const days = tripData.filter(item => item.id.startsWith('dia'))
const recommendations = tripData.find(item => item.id === 'dicas')
</script>

<template>
  <!-- Header Component -->
  <Header />

  <!-- Navigation Menu -->
  <NavigationMenu />

  <!-- Main Content -->
  <main class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Overview Section -->
    <TripOverview />

    <!-- Dias da Viagem - Componentes Dinâmicos -->
    <DayCard v-for="day in days" :key="day.id" :day="day" />

    <!-- Recomendações Adicionais -->
    <Recommendations :recommendations="recommendations" />
  </main>

  <!-- Footer Component -->
  <FooterSection />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css');

body {
  font-family: 'Montserrat', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  /* overflow-x: hidden; width: 100%; max-width: 100vw; são cobertos pela regra html, body abaixo */
}

/* REMOVIDO: .day-card e :hover - Movido para DayCard.vue */
/* REMOVIDO: .photo-gallery - Inutilizado após Swiper */
/* REMOVIDO: .photo-container e :hover img - Redundante/Inutilizado */
/* REMOVIDO: .activity-item e ::before - Movido para DayCard.vue */
/* REMOVIDO: .day-divider - Movido para DayCard.vue */
/* REMOVIDO: .probability-* - Movido para DayCard.vue */

/* Container styles needed for the main content */
.container {
  width: 100%;
  max-width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
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
</style>
