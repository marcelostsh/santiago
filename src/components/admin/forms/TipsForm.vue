<template>
  <AdminFormLayout 
    title="Gestão de Dicas e Observações" 
    :alert="alert"
    @close-alert="closeAlert"
  >
    <div class="mb-6">
      <p class="text-sm text-gray-600 mb-4">
        Gerencie as dicas e observações disponíveis no sistema. Selecione uma categoria para editar suas dicas.
      </p>
      
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-500">Carregando dicas...</p>
      </div>
      
      <div v-else class="bg-white shadow rounded-lg overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <!-- Categorias de Dicas -->
          <li v-for="category in tipsData.categories" :key="category.id" class="hover:bg-gray-50">
            <router-link :to="`/admin/dicas/${category.id}`" class="block p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ category.title }}</h3>
                  <p class="text-sm text-gray-500 mt-1 flex items-center">
                    <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {{ category.items ? category.items.length : 0 }} dicas
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
          
          <!-- Observações (item especial) -->
          <li class="hover:bg-gray-50 bg-gray-50">
            <router-link to="/admin/dicas/observations" class="block p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Observações Gerais</h3>
                  <p class="text-sm text-gray-500 mt-1 flex items-center">
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {{ tipsData.observations ? 'Disponível' : 'Não definido' }}
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
import { getTips } from '../../../services'
import AdminFormLayout from '../common/AdminFormLayout.vue'

const tipsData = ref({
  observations: '',
  categories: []
})

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

// Carregar dados existentes
onMounted(async () => {
  try {
    loading.value = true
    const data = await getTips('santiago')
    
    if (data) {
      console.clear()
      console.log('data')
      console.log(JSON.stringify(data))
      
      tipsData.value = {
        observations: data.observations || '',
        categories: Array.isArray(data.categories) ? data.categories : []
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    showAlert('Erro ao carregar dados!', 'error')
  } finally {
    loading.value = false
  }
})
</script> 