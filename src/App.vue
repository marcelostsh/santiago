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
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

.hero-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.chile.travel/wp-content/uploads/2016/04/Santiago-eduardo-macarios-1024x683.jpg');
  background-size: cover;
  background-position: center;
}

.day-card {
  transition: transform 0.3s ease-in-out;
}

.day-card:hover {
  transform: translateY(-5px);
}

.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.photo-container {
  overflow: hidden;
  border-radius: 0.5rem;
}

.photo-container img {
  transition: transform 0.5s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-container:hover img {
  transform: scale(1.05);
}

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

.day-divider {
  height: 4px;
  background: linear-gradient(90deg, #3182ce, #63b3ed, #3182ce);
  border-radius: 2px;
}

.probability-high {
  background-color: #f56565;
}

.probability-medium {
  background-color: #ed8936;
}

.probability-low {
  background-color: #48bb78;
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
