﻿<template>
  <AdminFormLayout 
    title="Gestão de Atividades" 
    :alert="alert"
    @close-alert="closeAlert"
  >
    <div class="mb-6">
      <p class="text-sm text-gray-600 mb-4">
        Gerencie as atividades disponíveis no sistema. Clique em uma atividade para editá-la ou adicione uma nova atividade.
      </p>
      
      <div class="flex justify-end mb-4">
        <router-link 
          to="/admin/atividades/novo" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nova Atividade
        </router-link>
      </div>
      
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-500">Carregando atividades...</p>
      </div>
      
      <div v-else-if="activities.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhuma atividade cadastrada</h3>
        <p class="text-gray-500 mb-4">Comece adicionando sua primeira atividade ao sistema.</p>
        <router-link 
          to="/admin/atividades/novo" 
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Nova Atividade
        </router-link>
      </div>
      
      <div v-else class="bg-white shadow rounded-lg overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li v-for="activity in activities" :key="activity.id" class="hover:bg-gray-50">
            <router-link :to="`/admin/atividades/${activity.id}`" class="block p-4">
              <div class="flex items-center">
                <div class="flex-shrink-0 mr-4">
                  <img 
                    :src="activity.images && activity.images.length > 0 ? activity.images[0] : 'https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif'" 
                    :alt="activity.title"
                    class="h-16 w-16 object-cover rounded-md"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900">{{ activity.title }}</h3>
                  <p v-if="activity.description" class="text-sm text-gray-500 mt-1 line-clamp-2">
                    {{ activity.description }}
                  </p>
                  <div class="flex items-center mt-2">
                    <span v-if="getActivityUsage(activity.id) > 0" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">
                      Usado {{ getActivityUsage(activity.id) }} {{ getActivityUsage(activity.id) === 1 ? 'vez' : 'vezes' }}
                    </span>
                    <span v-else class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Não utilizado
                    </span>
                  </div>
                </div>
                <div class="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </AdminFormLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getActivities, getItinerary } from '../../../services'
import AdminFormLayout from '../common/AdminFormLayout.vue'

const activities = ref([])
const loading = ref(true)
const itineraryDays = ref([])
const activityUsageMap = ref({})

// Alert state
const alert = ref({
  show: false,
  message: '',
  type: 'success'
})

// Show alert message
const showAlert = (message, type = 'success') => {
  alert.value = {
    show: true,
    message,
    type
  }
}

// Close alert manually
const closeAlert = () => {
  alert.value.show = false
}

// Função para calcular o uso de cada atividade no itinerário
const calculateActivityUsage = () => {
  // Reiniciar o mapa de uso
  activityUsageMap.value = {}
  
  // Inicializar contador para cada atividade
  activities.value.forEach(activity => {
    activityUsageMap.value[activity.id] = 0
  })
  
  // Percorrer todos os dias do itinerário
  itineraryDays.value.forEach(day => {
    if (day.schedule) {
      // Verificar cada período do dia
      const periods = ['morning', 'lunch', 'midDay', 'afternoon', 'evening', 'night']
      
      periods.forEach(period => {
        if (day.schedule[period] && Array.isArray(day.schedule[period])) {
          // Para cada atividade no período
          day.schedule[period].forEach(activity => {
            // Formato antigo: array de strings com IDs
            if (typeof activity === 'string') {
              if (activityUsageMap.value[activity] !== undefined) {
                activityUsageMap.value[activity]++
              }
            } 
            // Formato novo: array de objetos {activityId, note}
            else if (activity && activity.activityId) {
              if (activityUsageMap.value[activity.activityId] !== undefined) {
                activityUsageMap.value[activity.activityId]++
              }
            }
          })
        }
      })
    }
  })
}

// Obter o número de vezes que uma atividade é usada
const getActivityUsage = (activityId) => {
  return activityUsageMap.value[activityId] || 0
}

// Carregar atividades ao montar o componente
onMounted(async () => {
  try {
    loading.value = true
    
    // Carregar atividades e itinerário em paralelo
    const [activitiesData, itineraryData] = await Promise.all([
      getActivities(),
      getItinerary()
    ])
    
    activities.value = activitiesData
    
    // Filtrar apenas os dias do itinerário (itens com id que começa com "day")
    itineraryDays.value = itineraryData.filter(item => item.id.startsWith('day'))
    
    // Ordenar atividades por título
    activities.value.sort((a, b) => {
      if (a.title && b.title) {
        return a.title.localeCompare(b.title);
      }
      return 0;
    })
    
    // Calcular o uso de cada atividade
    calculateActivityUsage()
  } catch (error) {
    console.error('Erro ao carregar atividades:', error)
    showAlert('Erro ao carregar lista de atividades!', 'error')
  } finally {
    loading.value = false
  }
})
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
