<template>
  <AdminFormLayout 
    title="Gestão de Itinerário" 
    :alert="alert"
    @close-alert="closeAlert"
  >
    <div class="mb-6">
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-500">Carregando itinerário...</p>
      </div>
      
      <div v-else-if="days.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum dia no itinerário</h3>
        <p class="text-gray-500 mb-4">Comece adicionando o primeiro dia ao roteiro da viagem.</p>
        <router-link 
          to="/admin/itinerario/novo" 
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Primeiro Dia
        </router-link>
      </div>
      
      <div v-else class="bg-white shadow rounded-lg overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li v-for="day in days" :key="day.id" class="hover:bg-gray-50">
            <router-link :to="`/admin/itinerario/${day.id}`" class="block p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ day.title }}</h3>
                  <p class="text-sm text-gray-500 mt-1 flex items-center">
                    <span class="mr-3">{{ formatDate(day.date) }}</span>
                    <span v-if="day.schedule" class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {{ countActivities(day.schedule) }} atividades
                    </span>
                  </p>
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
import { getItinerary } from '../../../services'
import AdminFormLayout from '../common/AdminFormLayout.vue'

const days = ref([])
const loading = ref(true)

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

// Formatar data para exibição
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

// Contar atividades no schedule de um dia
const countActivities = (schedule) => {
  if (!schedule) return 0
  
  let count = 0
  // Soma todas as atividades de todos os períodos do dia
  const periods = ['morning', 'lunch', 'midDay', 'afternoon', 'evening', 'night']
  
  periods.forEach(period => {
    if (schedule[period] && Array.isArray(schedule[period])) {
      count += schedule[period].length
    }
  })
  
  return count
}

// Carregar itinerário ao montar o componente
onMounted(async () => {
  try {
    loading.value = true
    const itineraryData = await getItinerary()
    
    // Filtrar apenas os dias (itens com id que começa com "day")
    days.value = itineraryData.filter(item => item.id.startsWith('day'))
    
    // Ordenar por data
    days.value.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(a.date) - new Date(b.date)
      }
      // Fallback para ordenação por ID se não houver data
      return a.id.localeCompare(b.id)
    })
  } catch (error) {
    console.error('Erro ao carregar itinerário:', error)
    showAlert('Erro ao carregar lista de dias do itinerário!', 'error')
  } finally {
    loading.value = false
  }
})
</script> 