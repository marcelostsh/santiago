<template>
  <AdminFormLayout 
    title="Gestão de Itinerário" 
    :alert="alert"
    @close-alert="closeAlert"
  >
    <div class="mb-6">
      <p class="text-sm text-gray-600 mb-4">
        Gerencie os dias do roteiro de viagem. Clique em um dia para editá-lo ou adicione um novo dia.
      </p>
      
      <!-- Botões Salvar e Cancelar (sempre visíveis quando há alterações, para evitar layout shift) -->
      <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-4" :class="{'opacity-0': !hasChanges, 'opacity-100': hasChanges}">
        <div class="flex justify-between items-center">
          <p class="text-sm text-yellow-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Você tem alterações não salvas na ordem dos dias
          </p>
          <div class="flex space-x-2">
            <button 
              @click="cancelChanges" 
              class="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
            >
              Cancelar
            </button>
            <button 
              @click="saveChanges" 
              class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de troca de posição -->
      <div v-if="showReorderModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-medium mb-4">Mover "{{ selectedDay ? selectedDay.title : '' }}"</h3>
          
          <p class="text-gray-600 mb-3">Selecione para qual posição deseja mover este dia:</p>
          
          <div class="max-h-60 overflow-y-auto mb-4 border rounded-md">
            <ul class="divide-y divide-gray-200">
              <li 
                v-for="(day, index) in sortedDays" 
                :key="day.id"
                @click="moveToPosition(index)"
                class="p-3 hover:bg-blue-50 cursor-pointer flex items-center"
                :class="{'bg-blue-100': day.id === selectedDay?.id}"
              >
                <div class="flex-1">
                  <div class="font-medium">{{ day.title }}</div>
                  <div class="text-sm text-gray-500">
                    {{ formatDate(day.previewDate || day.date, !!day.previewDate) }} 
                    (Dia {{ index + 1 }})
                  </div>
                </div>
                <div v-if="day.id === selectedDay?.id" class="text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
          
          <div class="flex justify-end space-x-2">
            <button 
              @click="showReorderModal = false" 
              class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end mb-4">
        <router-link 
          to="/admin/itinerario/novo" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Novo Dia
        </router-link>
      </div>
      
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
        <ul class="divide-y divide-gray-200" ref="dayList">
          <li 
            v-for="(day, index) in sortedDays" 
            :key="day.id" 
            class="hover:bg-gray-50"
          >
            <div class="flex items-center p-4">
              
              <!-- Botão de mover -->
              <button 
                @click="openReorderModal(day, index)"
                class="mr-3 flex-shrink-0 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full self-center"
                title="Mover dia"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
              <!-- Conteúdo do dia -->
              <router-link :to="`/admin/itinerario/${day.id}`" class="flex-1 block">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">{{ day.title }}</h3>
                    <p class="text-sm text-gray-500 mt-1 flex items-center">
                      <span class="mr-3" :class="{'text-blue-600 font-medium': hasChanges}">
                        {{ formatDate(day.previewDate || day.date, !!day.previewDate) }}
                      </span>
                      <span class="mr-3 text-xs text-gray-500">Ordem: {{ day.order || index + 1 }}</span>
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
            </div>
          </li>
        </ul>
      </div>
    </div>
  </AdminFormLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { getItinerary, addOrUpdateDay } from '../../../services'
import AdminFormLayout from '../common/AdminFormLayout.vue'

const days = ref([])
const originalDays = ref([]) // Para controlar mudanças e poder reverter
const loading = ref(true)
const hasChanges = ref(false)
const startDate = ref(null) // Data inicial da viagem

// Controle do modal de reordenação
const showReorderModal = ref(false)
const selectedDay = ref(null)
const selectedIndex = ref(null)

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

// Computed property for sorted days with preview dates
const sortedDays = computed(() => {
  // Mostrar datas de prévia baseadas na ordem atual
  if (startDate.value && days.value.length > 0) {
    return days.value.map((day, index) => {
      // Cria uma cópia do dia para não modificar o original até salvar
      const dayCopy = { ...day }
      
      // Usar método mais simples e direto para adicionar dias
      // Parse da data inicial
      const [startYear, startMonth, startDay] = startDate.value.split('-').map(Number)
      
      // Criar data em UTC para evitar problemas de fuso horário
      // O mês em JavaScript é 0-indexed (janeiro = 0)
      const date = new Date(Date.UTC(startYear, startMonth - 1, startDay + index))
      
      // Extrair componentes da data em UTC
      const year = date.getUTCFullYear()
      const month = String(date.getUTCMonth() + 1).padStart(2, '0')
      const dayOfMonth = String(date.getUTCDate()).padStart(2, '0')
      
      dayCopy.previewDate = `${year}-${month}-${dayOfMonth}`
      
      return dayCopy
    })
  }
  
  // Se não tiver data inicial, apenas retorna os dias na ordem atual
  return days.value
})

// Formatar data para exibição
const formatDate = (dateString, isPreview = false) => {
  if (!dateString) return ''
  
  // Para evitar problema de fuso horário, precisamos manipular a string da data diretamente
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}${isPreview ? ' (prévia)' : ''}`
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

// Abrir modal para reordenar
const openReorderModal = (day, index) => {
  selectedDay.value = day
  selectedIndex.value = index
  showReorderModal.value = true
}

// Mover dia para uma posição específica
const moveToPosition = (newIndex) => {
  // Não fazer nada se for a mesma posição
  if (newIndex === selectedIndex.value) {
    showReorderModal.value = false
    return
  }
  
  // Fazer o movimento
  const itemToMove = days.value.splice(selectedIndex.value, 1)[0]
  days.value.splice(newIndex, 0, itemToMove)
  
  // Fechar o modal
  showReorderModal.value = false
  
  // Verificar se houve alterações
  hasChanges.value = !areArraysEqual(days.value, originalDays.value)
}

// Comparar arrays para detectar mudanças
const areArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].id !== arr2[i].id) {
      return false
    }
  }
  
  return true
}

// Salvar alterações
const saveChanges = async () => {
  try {
    loading.value = true
    
    // Atualizar a ordem e as datas de cada dia
    const savePromises = sortedDays.value.map((day, index) => {
      // Usar a data prévia calculada
      const updatedDay = { 
        ...day, 
        order: index + 1,
        date: day.previewDate // Atualiza a data real com a data prévia
      }
      return addOrUpdateDay('santiago', day.id, updatedDay)
    })
    
    await Promise.all(savePromises)
    
    // Atualizar a lista original após salvar
    originalDays.value = JSON.parse(JSON.stringify(sortedDays.value))
    hasChanges.value = false
    
    showAlert('Ordem e datas dos dias atualizadas com sucesso!', 'success')
  } catch (error) {
    console.error('Erro ao salvar a ordem dos dias:', error)
    showAlert('Erro ao salvar alterações!', 'error')
  } finally {
    loading.value = false
  }
}

// Cancelar alterações
const cancelChanges = () => {
  days.value = JSON.parse(JSON.stringify(originalDays.value))
  hasChanges.value = false
}

// Carregar itinerário ao montar o componente
onMounted(async () => {
  try {
    loading.value = true
    const itineraryData = await getItinerary()
    
    // Filtrar apenas os dias (itens com id que começa com "day")
    const filteredDays = itineraryData.filter(item => item.id.startsWith('day'))
    
    // Ordenar por ordem personalizada, se existir, ou por data como fallback
    filteredDays.sort((a, b) => {
      // Se ambos tiverem a propriedade order, usar essa propriedade
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      
      // Caso contrário, ordenar por data
      if (a.date && b.date) {
        return new Date(a.date) - new Date(b.date)
      }
      
      // Fallback para ordenação por ID
      return a.id.localeCompare(b.id)
    })
    
    days.value = filteredDays
    // Cria uma cópia profunda para rastrear mudanças
    originalDays.value = JSON.parse(JSON.stringify(filteredDays))
    
    // Definir a data inicial baseada no primeiro dia após ordenação
    if (filteredDays.length > 0 && filteredDays[0].date) {
      startDate.value = filteredDays[0].date
    }
  } catch (error) {
    console.error('Erro ao carregar itinerário:', error)
    showAlert('Erro ao carregar lista de dias do itinerário!', 'error')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Transição para o banner de alterações */
.opacity-0 {
  opacity: 0;
  pointer-events: none;
}
.opacity-100 {
  opacity: 1;
  pointer-events: auto;
}
</style> 