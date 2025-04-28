<template>
  <AdminFormLayout 
    :title="getTitle()" 
    :alert="alert"
    @close-alert="closeAlert"
  >
    <form @submit.prevent="saveTips">
      <div class="mb-6">
        <p class="text-sm text-gray-600 mb-4">
          {{ getDescription() }}
        </p>
        
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-500">Carregando dados...</p>
        </div>
        
        <!-- Observações Gerais (texto único) -->
        <div v-else-if="isObservations()" class="mt-4">
          <textarea
            v-model="observations"
            rows="8"
            class="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite aqui as observações gerais sobre a viagem"
          ></textarea>
        </div>
        
        <!-- Itens da Categoria (lista de objetos) -->
        <div v-else>
          <div v-for="(item, index) in categoryItems" :key="`item-${index}`" 
              class="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            
            <!-- Título do item -->
            <div class="mb-3">
              <label :for="`item-title-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                :id="`item-title-${index}`"
                v-model="categoryItems[index].title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Título da dica"
              />
            </div>
            
            <!-- Descrição do item -->
            <div class="mb-3">
              <label :for="`item-description-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                :id="`item-description-${index}`"
                v-model="categoryItems[index].description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Descrição detalhada da dica"
              ></textarea>
            </div>
            
            <!-- Ícone do item -->
            <div class="mb-3">
              <label :for="`item-icon-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Ícone (FontAwesome)</label>
              <input
                :id="`item-icon-${index}`"
                v-model="categoryItems[index].icon"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: fas fa-thermometer-half"
              />
            </div>
            
            <!-- Botão para remover o item -->
            <div class="flex justify-end">
              <button 
                type="button"
                @click="removeItem(index)"
                class="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remover Item
              </button>
            </div>
          </div>
          
          <!-- Botão para adicionar novo item -->
          <button 
            type="button"
            @click="addItem"
            class="w-full mt-3 px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Adicionar Novo Item
          </button>
        </div>
      </div>
      
      <!-- Botões de ação -->
      <div class="flex justify-end gap-3 mt-8">
        <button 
          type="button" 
          @click="goBack" 
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </form>
  </AdminFormLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getTips, updateTips } from '../../../services'
import AdminFormLayout from '../common/AdminFormLayout.vue'

const router = useRouter()
const route = useRoute()

// Obtém o tipo de dica da URL
const categoryId = computed(() => route.params.category)

// Estado para armazenar as dicas
const categoryItems = ref([])
const observations = ref('')
const allTipsData = ref({
  observations: '',
  categories: []
})
const currentCategory = ref(null)
const loading = ref(true)

// Alert state
const alert = ref({
  show: false,
  message: '',
  type: 'success'
})

// Descrições das categorias
const descriptions = {
  observations: 'Observações gerais e importantes sobre a viagem.'
}

// Verifica se é observações
const isObservations = () => categoryId.value === 'observations'

// Obtém o título com base no tipo
const getTitle = () => {
  if (isObservations()) {
    return 'Editar Observações Gerais'
  }
  return `Editar ${currentCategory.value?.title || 'Categoria'}`
}

// Obtém a descrição com base no tipo
const getDescription = () => {
  if (isObservations()) {
    return descriptions.observations
  }
  return `Edite os itens desta categoria. Cada item deve ter um título, descrição e ícone.`
}

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

// Adicionar um novo item
const addItem = () => {
  categoryItems.value.push({
    title: '',
    description: '',
    icon: 'fas fa-info-circle'
  })
}

// Remover um item
const removeItem = (index) => {
  categoryItems.value.splice(index, 1)
}

// Carregar dados existentes
onMounted(async () => {
  try {
    loading.value = true
    const data = await getTips('santiago')
    
    if (data) {
      allTipsData.value = data
      
      if (isObservations()) {
        observations.value = data.observations || ''
      } else {
        // Encontrar a categoria pelo ID
        const category = data.categories?.find(cat => cat.id === categoryId.value)
        
        if (category) {
          currentCategory.value = {
            id: category.id,
            title: category.title
          }
          categoryItems.value = Array.isArray(category.items) 
            ? JSON.parse(JSON.stringify(category.items)) // Deep copy
            : []
        } else {
          showAlert('Categoria não encontrada!', 'error')
        }
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    showAlert('Erro ao carregar dados!', 'error')
  } finally {
    loading.value = false
  }
})

// Salvar dados no Firebase
const saveTips = async () => {
  try {
    // Cria uma cópia dos dados atuais para modificar
    const dataToSave = JSON.parse(JSON.stringify(allTipsData.value))
    
    if (isObservations()) {
      // Salvar observações
      dataToSave.observations = observations.value
    } else {
      // Encontrar e atualizar a categoria específica
      const categoryIndex = dataToSave.categories.findIndex(cat => cat.id === categoryId.value)
      
      if (categoryIndex !== -1) {
        // Filtrar itens vazios
        const filteredItems = categoryItems.value.filter(item => 
          item.title.trim() !== '' || item.description.trim() !== ''
        )
        
        // Atualizar os itens da categoria
        dataToSave.categories[categoryIndex].items = filteredItems
      } else {
        showAlert('Categoria não encontrada para atualização!', 'error')
        return
      }
    }
    
    // Salva os dados
    const result = await updateTips('santiago', dataToSave)
    
    if (result.success) {
      showAlert('Dados salvos com sucesso!', 'success')
      setTimeout(() => {
        goBack()
      }, 1500)
    } else {
      showAlert('Erro ao salvar dados!', 'error')
    }
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    showAlert('Erro ao salvar dados!', 'error')
  }
}

// Voltar para a lista
const goBack = () => {
  router.push('/admin/dicas')
}
</script> 