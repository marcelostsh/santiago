<template>
  <AdminFormLayout 
    :title="isNewLocation ? 'Novo Local' : `Editar Local: ${formData.name}`" 
    :alert="alert"
    @close-alert="closeAlert"
  >
    <form @submit.prevent="saveLocation">
      <!-- Nome do Local -->
      <FormField
        id="name"
        label="Nome do Local"
        v-model="formData.name"
        required
      />
      
      <!-- Descrição -->
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Descreva este local"
        ></textarea>
      </div>
      
      <!-- Imagens -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <label class="block text-sm font-medium text-gray-700">Imagens</label>
        </div>
        
        <div v-for="(imagem, index) in formData.images" :key="index" 
            class="border border-gray-200 rounded-md p-4 mb-3">
          <div class="flex justify-between mb-2">
            <div class="flex items-center">
              <button 
                type="button"
                class="text-red-600 hover:text-red-800 mr-3"
                @click="removeImage(index)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <h3 class="font-medium">Imagem #{{ index + 1 }}</h3>
            </div>
            <div class="flex">
              <button 
                type="button"
                class="text-gray-600 hover:text-gray-800 mr-1"
                @click="moveImage(index, 'up')"
                :disabled="index === 0"
                :class="{'opacity-50 cursor-not-allowed': index === 0}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button 
                type="button"
                class="text-gray-600 hover:text-gray-800"
                @click="moveImage(index, 'down')"
                :disabled="index === formData.images.length - 1"
                :class="{'opacity-50 cursor-not-allowed': index === formData.images.length - 1}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <!-- URL da Imagem -->
            <div class="col-span-2">
              <label :for="`imagem-url-${index}`" class="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                type="text"
                :id="`imagem-url-${index}`"
                v-model="imagem.url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://exemplo.com/imagem.jpg"
              >
            </div>
          </div>
          
          <!-- Preview da imagem -->
          <div v-if="imagem.url" class="mt-3">
            <img :src="imagem.url" :alt="imagem.name || 'Imagem do local'" class="h-32 object-cover rounded-md">
          </div>
        </div>
        
        <button 
          type="button"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center justify-center"
          @click="addImage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Imagem
        </button>
      </div>
      
      <!-- Links Relacionados -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label class="block text-sm font-medium text-gray-700">Links Relacionados</label>
        </div>
        
        <div v-for="(link, index) in formData.links" :key="index" 
            class="border border-gray-200 rounded-md p-4 mb-3">
          <div class="flex justify-between mb-2">
            <div class="flex items-center">
              <button 
                type="button"
                class="text-red-600 hover:text-red-800 mr-3"
                @click="removeLink(index)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <h3 class="font-medium">Link #{{ index + 1 }}</h3>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <!-- Título do Link -->
            <div>
              <label :for="`link-titulo-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                :id="`link-titulo-${index}`"
                v-model="link.title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: Site Oficial"
              >
            </div>
            <!-- URL do Link -->
            <div>
              <label :for="`link-url-${index}`" class="block text-sm font-medium text-gray-700 mb-1">URL</label>
              <input
                type="text"
                :id="`link-url-${index}`"
                v-model="link.url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://exemplo.com"
              >
            </div>
          </div>
        </div>
        
        <button 
          type="button"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center justify-center"
          @click="addLink"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Link
        </button>
      </div>
      
      <!-- Botões de ação -->
      <div class="flex gap-3 mt-8">
        <button 
          type="button" 
          @click="confirmDelete" 
          v-if="!isNewLocation"
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
          Tem certeza de que deseja excluir o local "{{ formData.name }}"? Esta ação não pode ser desfeita.
        </p>
        <div class="flex justify-end gap-3">
          <button 
            @click="showDeleteModal = false" 
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button 
            @click="deleteLocation" 
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
import { getLocationById, addOrUpdateLocation, deleteDocument } from '../../../services'
import AdminFormLayout from '../common/AdminFormLayout.vue'
import FormField from '../common/FormField.vue'
import FormActions from '../common/FormActions.vue'

const router = useRouter()
const route = useRoute()

// Estado para controlar a exclusão
const showDeleteModal = ref(false)

// Verifica se é um novo local ou edição
const isNewLocation = computed(() => route.params.id === 'novo')

// Inicializa o formulário com valores padrão
const formData = ref({
  name: '',
  description: '',
  images: [],
  links: []
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

// Carregar dados do local se estiver em modo de edição
onMounted(async () => {
  if (!isNewLocation.value) {
    try {
      const locationId = route.params.id
      const data = await getLocationById(locationId)
      
      if (data) {
        console.log('Dados do local carregados:', data) // Log para debug
        // Preenche o formulário com os dados existentes
        formData.value = {
          name: data.name || '',
          description: data.description || '',
          images: [],
          links: []
        }
        
        // Processamento de imagens
        if (data.images) {
          // Se images for um array, usamos diretamente
          if (Array.isArray(data.images)) {
            formData.value.images = data.images.map(img => {
              // Garantir que cada imagem tenha a estrutura correta
              return {
                url: typeof img === 'object' ? (img.url || '') : img,
                alt: typeof img === 'object' ? (img.alt || '') : ''
              }
            })
          } 
          // Se tiver apenas uma imagem como string
          else if (typeof data.images === 'string') {
            formData.value.images = [{
              url: data.images,
              alt: ''
            }]
          }
        }
        
        // Processamento de links
        if (data.links) {
          // Se links for um array, usamos diretamente
          if (Array.isArray(data.links)) {
            formData.value.links = data.links.map(link => {
              // Garantir que cada link tenha a estrutura correta
              if (typeof link === 'object') {
                return {
                  title: link.title || link.name || '',
                  url: link.url || ''
                }
              } else {
                return { title: '', url: link }
              }
            })
          } 
          // Se for um objeto de links nomeados
          else if (typeof data.links === 'object' && !Array.isArray(data.links)) {
            formData.value.links = Object.entries(data.links).map(([key, value]) => {
              return {
                title: key,
                url: typeof value === 'string' ? value : (value.url || '')
              }
            })
          }
        }
        
        console.log('Formulário preenchido:', formData.value) // Log para debug
      } else {
        showAlert('Local não encontrado!', 'error')
        router.push('/admin/locais')
      }
    } catch (error) {
      console.error('Erro ao carregar dados do local:', error)
      showAlert('Erro ao carregar dados do local!', 'error')
    }
  }
})

// Adicionar uma nova imagem
const addImage = () => {
  formData.value.images.push({
    url: ''
  })
}

// Remover uma imagem
const removeImage = (index) => {
  formData.value.images.splice(index, 1)
}

// Mover imagem para cima ou para baixo
const moveImage = (index, direction) => {
  const images = formData.value.images
  
  if (direction === 'up' && index > 0) {
    // Trocar com o item acima
    [images[index], images[index - 1]] = [images[index - 1], images[index]]
  } else if (direction === 'down' && index < images.length - 1) {
    // Trocar com o item abaixo
    [images[index], images[index + 1]] = [images[index + 1], images[index]]
  }
}

// Adicionar um novo link
const addLink = () => {
  formData.value.links.push({
    title: '',
    url: ''
  })
}

// Remover um link
const removeLink = (index) => {
  formData.value.links.splice(index, 1)
}

// Salvar local no Firebase
const saveLocation = async () => {
  try {
    // Verifica se o nome do local foi informado
    if (!formData.value.name.trim()) {
      showAlert('O nome do local é obrigatório!', 'error')
      return
    }
    
    // Gera um ID baseado no nome se for um novo local
    const locationId = isNewLocation.value 
      ? formData.value.name.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      : route.params.id
    
    // Prepara os dados antes de salvar
    const dataToSave = { ...formData.value }
    
    // Remove imagens vazias
    dataToSave.images = dataToSave.images
      .filter(img => img.url.trim() !== '')
      .map(img => img.url) // Simplifica para apenas a URL
    
    // Remove links vazios
    dataToSave.links = dataToSave.links
      .filter(link => link.url.trim() !== '')
      .reduce((acc, link) => {
        // Converte para formato de objeto com chaves baseadas no título
        const title = link.title.trim() || 'link'
        acc[title] = link.url
        return acc
      }, {})
    
    console.log('Dados a serem salvos:', dataToSave) // Log para debug
    
    // Salva os dados
    const result = await addOrUpdateLocation('santiago', locationId, dataToSave)
    
    if (result.success) {
      showAlert('Local salvo com sucesso!', 'success')
      
      // Se for um novo local, redireciona para a página de edição
      if (isNewLocation.value) {
        router.push(`/admin/locais/${locationId}`)
      }
    } else {
      showAlert('Erro ao salvar local!', 'error')
    }
  } catch (error) {
    console.error('Erro ao salvar local:', error)
    showAlert('Erro ao salvar local!', 'error')
  }
}

// Confirmar exclusão
const confirmDelete = () => {
  showDeleteModal.value = true
}

// Excluir local
const deleteLocation = async () => {
  try {
    const locationId = route.params.id
    const result = await deleteDocument(`trips/santiago/locations`, locationId)
    
    if (result.success) {
      showAlert('Local excluído com sucesso!', 'success')
      router.push('/admin/locais')
    } else {
      showAlert('Erro ao excluir local!', 'error')
    }
    
    showDeleteModal.value = false
  } catch (error) {
    console.error('Erro ao excluir local:', error)
    showAlert('Erro ao excluir local!', 'error')
    showDeleteModal.value = false
  }
}

// Voltar para a listagem
const goBack = () => {
  router.push('/admin/locais')
}
</script> 