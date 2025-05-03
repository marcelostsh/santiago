<template>
  <AdminFormLayout 
    :title="isNewDay ? 'Novo Dia' : `Editar Dia: ${formData.title}`" 
    :alert="alert"
    @close-alert="closeAlert"
  >
    <form @submit.prevent="saveDay">
      <!-- Título -->
      <FormField
        id="title"
        label="Título"
        v-model="formData.title"
        required
      />
      
      <!-- Data -->
      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Data</label>
        <input
          type="date"
          id="date"
          v-model="formData.date"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      <!-- Descrição -->
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="2"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Descreva o dia brevemente"
        ></textarea>
      </div>
      
      <!-- Transporte -->
      <FormField
        id="transport"
        label="Transporte"
        v-model="formData.transport"
        placeholder="Ex: Carro alugado, Transporte público, etc."
      />
      
      <!-- Schedule (Programação do Dia) -->
      <div class="mt-8 mb-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Programação do Dia</h3>
        
        <!-- Períodos do dia (usando v-for para reduzir repetição) -->
        <div v-for="period in dayPeriods" :key="period.id" class="mb-6">
          <h4 class="font-medium text-gray-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5', 'w-5', 'mr-1', period.color]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="period.icon" />
            </svg>
            {{ period.label }}
          </h4>
          
          <div class="bg-gray-50 p-3 rounded-md">
            <div v-for="(activity, index) in formData.schedule[period.id]" :key="`${period.id}-${index}`" 
                class="flex flex-col mb-2 p-2 bg-white rounded border border-gray-200">
              <div class="flex items-center">
                <div class="flex-grow">
                  <Multiselect
                    v-model="formData.schedule[period.id][index].activityId"
                    :options="getActivityOptions"
                    placeholder="Selecione uma atividade"
                    :searchable="true"
                    :object="false"
                    valueProp="value"
                    label="label"
                  >
                    <template #singleLabel="{ value, label, image, type }">
                      <div class="flex items-center">
                        <span v-if="image" class="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mr-2">
                          <img :src="image" class="w-full h-full object-cover" alt="" />
                        </span>
                        <span v-else class="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full mr-2 text-lg">
                          {{ getDefaultIcon(type) }}
                        </span>
                        <span>{{ label }}</span>
                      </div>
                    </template>
                    <template #option="{ option }">
                      <div class="flex items-center">
                        <span v-if="option.image" class="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mr-2">
                          <img :src="option.image" class="w-full h-full object-cover" alt="" />
                        </span>
                        <span v-else class="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full mr-2 text-lg">
                          {{ getDefaultIcon(option.type) }}
                        </span>
                        <span>{{ option.label }}</span>
                      </div>
                    </template>
                  </Multiselect>
                </div>
                <button 
                  type="button"
                  @click="removeActivity(period.id, index)"
                  class="ml-2 text-red-600 hover:text-red-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div class="mt-2">
                <textarea
                  v-model="formData.schedule[period.id][index].note"
                  rows="2"
                  class="w-full p-2 border border-gray-200 rounded-md text-sm"
                  placeholder="Anotações sobre esta atividade"
                ></textarea>
              </div>
            </div>
            
            <button 
              type="button"
              @click="addActivity(period.id)"
              class="w-full mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Adicionar Atividade
            </button>
          </div>
        </div>
      </div>
      
      <!-- Dicas (Tips) -->
      <div class="mb-6 mt-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Dicas do Dia</h3>
        
        <div v-for="(tip, index) in formData.tips" :key="`tip-${index}`" 
            class="flex items-start mb-2">
          <textarea
            v-model="formData.tips[index]"
            rows="6"
            class="flex-grow p-2 border border-gray-300 rounded-md"
            placeholder="Dica ou recomendação para este dia"
          ></textarea>
          <button 
            type="button"
            @click="removeTip(index)"
            class="ml-2 mt-1 text-red-600 hover:text-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        <button 
          type="button"
          @click="addTip"
          class="w-full mt-3 px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Dica
        </button>
      </div>
      
      <!-- Botões de ação -->
      <div class="flex gap-3 mt-8">
        <button 
          type="button" 
          @click="confirmDelete" 
          v-if="!isNewDay"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Excluir
        </button>
        
        <div class="flex-grow"></div>
        
        <FormActions @cancel="goBack" />
      </div>
    </form>
    
    <!-- Modal de confirmação de exclusão -->
    <div 
      v-if="showDeleteModal" 
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="bg-white rounded-lg p-6 max-w-md w-full z-10">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Confirmar Exclusão</h3>
        <p class="mb-4 text-gray-600">
          Tem certeza de que deseja excluir o dia "{{ formData.title }}"? Esta ação não pode ser desfeita.
        </p>
        <div class="flex justify-end gap-3">
          <button 
            @click="showDeleteModal = false" 
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button 
            @click="deleteDay" 
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </AdminFormLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getDayById, getActivities, getItinerary } from '../../../services'
import { addOrUpdateDay, deleteDocument } from '../../../services/firebaseWriteService'
import AdminFormLayout from '../common/AdminFormLayout.vue'
import FormField from '../common/FormField.vue'
import FormActions from '../common/FormActions.vue'
import Multiselect from '@vueform/multiselect'

const router = useRouter()
const route = useRoute()

// Estado para controlar a exclusão
const showDeleteModal = ref(false)

// Lista de atividades disponíveis
const activities = ref([])

// Função auxiliar para formatar as opções do Multiselect
const getActivityOptions = computed(() => {
  return activities.value.map(activity => ({
    value: activity.id,
    label: activity.title,
    image: activity.images && activity.images.length > 0 ? activity.images[0] : null, // Usa a primeira imagem do array se existir
    // Adiciona um tipo para definir ícone padrão
    type: activity.type || 'default'
  }))
})

// Função para obter ícone padrão baseado no tipo
const getDefaultIcon = (type) => {
  const icons = {
    'restaurant': '🍽️',
    'hotel': '🏨',
    'attraction': '🏛️',
    'transport': '🚌',
    'tour': '🧭',
    'museum': '🖼️',
    'beach': '🏖️',
    'hiking': '🥾',
    'shopping': '🛍️',
    'default': '📍'
  }
  return icons[type] || icons['default']
}

// Array com os períodos do dia para reduzir repetição no template
const dayPeriods = [
  { 
    id: 'morning', 
    label: 'Manhã', 
    color: 'text-yellow-500',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
  },
  { 
    id: 'lunch', 
    label: 'Almoço', 
    color: 'text-orange-500',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  { 
    id: 'afternoon', 
    label: 'Tarde', 
    color: 'text-red-500',
    icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'
  },
  { 
    id: 'night', 
    label: 'Noite', 
    color: 'text-indigo-500',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
  }
]

// Verifica se é um novo dia ou edição
const isNewDay = computed(() => route.params.id === 'novo')

// Inicializa o formulário com valores padrão
const formData = ref({
  title: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
  transport: '',
  schedule: {
    morning: [],
    lunch: [],
    afternoon: [],
    night: []
  },
  tips: []
})

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

// Carregar dados do dia se estiver em modo de edição
onMounted(async () => {
  try {
    // Carregar todas as atividades disponíveis para os selects
    activities.value = await getActivities()
    
    // Se não for um novo dia, carregue os dados existentes
    if (!isNewDay.value) {
      const dayId = route.params.id
      const data = await getDayById(dayId)
      
      if (data) {
        // Função para converter o formato antigo (array de IDs) para o novo formato (array de objetos com ID e anotação)
        const convertActivityFormat = (activities) => {
          if (!Array.isArray(activities)) return []
          
          return activities.map(activity => {
            // Se já estiver no novo formato, retorna como está
            if (typeof activity === 'object' && activity !== null) {
              return { 
                activityId: activity.activityId || '', 
                note: activity.note || '' 
              }
            }
            // Se for string (formato antigo), converte para o novo formato
            return { activityId: activity || '', note: '' }
          })
        }
        
        // Preenche o formulário com os dados existentes
        formData.value = {
          title: data.title || '',
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          description: data.description || '',
          transport: data.transport || '',
          schedule: {
            morning: convertActivityFormat(data.schedule?.morning),
            lunch: convertActivityFormat(data.schedule?.lunch || data.schedule?.midDay),
            afternoon: convertActivityFormat(data.schedule?.afternoon),
            night: convertActivityFormat(data.schedule?.night || data.schedule?.evening)
          },
          tips: Array.isArray(data.tips) ? [...data.tips] : []
        }
      } else {
        showAlert('Dia não encontrado!', 'error')
        router.push('/admin/itinerario')
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    showAlert('Erro ao carregar dados!', 'error')
  }
})

// Adicionar uma atividade a um período do dia
const addActivity = (period) => {
  formData.value.schedule[period].push({ activityId: '', note: '' })
}

// Remover uma atividade de um período do dia
const removeActivity = (period, index) => {
  formData.value.schedule[period].splice(index, 1)
}

// Adicionar uma dica
const addTip = () => {
  formData.value.tips.push('')
}

// Remover uma dica
const removeTip = (index) => {
  formData.value.tips.splice(index, 1)
}

// Salvar dia no Firebase
const saveDay = async () => {
  try {
    // Verifica se o título foi informado
    if (!formData.value.title.trim()) {
      showAlert('O título do dia é obrigatório!', 'error')
      return
    }
    
    // Verifica se a data foi informada
    if (!formData.value.date) {
      showAlert('A data é obrigatória!', 'error')
      return
    }
    
    // Gera um ID baseado no número do dia se for um novo dia
    let dayId = isNewDay.value ? null : route.params.id
    
    if (isNewDay.value) {
      // Buscar todos os dias para determinar o próximo número
      const allDays = await getItinerary()
      const dayNumbers = allDays
        .filter(day => day.id.startsWith('day-'))
        .map(day => {
          const match = day.id.match(/day-(\d+)/)
          return match ? parseInt(match[1]) : 0
        })
      
      const nextNumber = dayNumbers.length > 0 ? Math.max(...dayNumbers) + 1 : 1
      dayId = `day-${nextNumber}`
    }
    
    // Prepara os dados antes de salvar
    const dataToSave = { 
      title: formData.value.title.trim(),
      date: formData.value.date,
      description: formData.value.description.trim(),
      transport: formData.value.transport.trim(),
      // Filtrar arrays vazios e remover atividades sem seleção
      schedule: {
        morning: formData.value.schedule.morning
          .filter(activity => activity.activityId.trim() !== '')
          .map(activity => ({
            activityId: activity.activityId,
            note: activity.note.trim()
          })),
        lunch: formData.value.schedule.lunch
          .filter(activity => activity.activityId.trim() !== '')
          .map(activity => ({
            activityId: activity.activityId,
            note: activity.note.trim()
          })),
        afternoon: formData.value.schedule.afternoon
          .filter(activity => activity.activityId.trim() !== '')
          .map(activity => ({
            activityId: activity.activityId,
            note: activity.note.trim()
          })),
        night: formData.value.schedule.night
          .filter(activity => activity.activityId.trim() !== '')
          .map(activity => ({
            activityId: activity.activityId,
            note: activity.note.trim()
          }))
      },
      // Filtrar dicas vazias
      tips: formData.value.tips.filter(tip => tip.trim() !== '')
    }
    
    // Adicionar número do dia para ordenação
    if (dayId) {
      const match = dayId.match(/day-(\d+)/)
      if (match) {
        dataToSave.dayNumber = parseInt(match[1])
      }
    }
    
    // Salva os dados
    const result = await addOrUpdateDay('santiago', dayId, dataToSave)
    
    if (result.success) {
      showAlert('Dia salvo com sucesso!', 'success')
      
      // Se for um novo dia, redireciona para a página de edição
      if (isNewDay.value) {
        router.push(`/admin/itinerario/${dayId}`)
      }
    } else {
      showAlert('Erro ao salvar dia!', 'error')
    }
  } catch (error) {
    console.error('Erro ao salvar dia:', error)
    showAlert('Erro ao salvar dia!', 'error')
  }
}

// Confirmar exclusão
const confirmDelete = () => {
  showDeleteModal.value = true
}

// Excluir dia
const deleteDay = async () => {
  try {
    const dayId = route.params.id
    const result = await deleteDocument(`trips/santiago/itinerary`, dayId)
    
    if (result.success) {
      showAlert('Dia excluído com sucesso!', 'success')
      router.push('/admin/itinerario')
    } else {
      showAlert('Erro ao excluir dia!', 'error')
    }
    
    showDeleteModal.value = false
  } catch (error) {
    console.error('Erro ao excluir dia:', error)
    showAlert('Erro ao excluir dia!', 'error')
    showDeleteModal.value = false
  }
}

// Voltar para a listagem
const goBack = () => {
  router.push('/admin/itinerario')
}
</script>

<style>
@import '@vueform/multiselect/themes/default.css';

/* Customizações do Multiselect */
.multiselect-wrapper {
  width: 100%;
}

.multiselect {
  min-height: 38px;
  border-radius: 0.375rem;
  border-color: rgb(229, 231, 235);
}

.multiselect.is-active {
  box-shadow: 0 0 0 1px rgb(59, 130, 246);
  border-color: rgb(59, 130, 246);
}

.multiselect-search {
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
}

.multiselect-options {
  padding: 0.25rem 0;
  border-radius: 0.375rem;
  border-color: rgb(229, 231, 235);
  margin-top: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.multiselect-option {
  padding: 0.5rem 0.75rem;
}

.multiselect-option.is-pointed {
  background-color: rgb(243, 244, 246);
}

.multiselect-option.is-selected {
  background-color: rgb(239, 246, 255);
  color: rgb(37, 99, 235);
}
</style> 