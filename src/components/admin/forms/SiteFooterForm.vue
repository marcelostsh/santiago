<template>
  <AdminFormLayout 
    title="Configuração de Rodapé" 
    :alert="alert"
    @close-alert="closeAlert"
  >
    <form @submit.prevent="saveFooter">
      <!-- Título -->
      <FormField
        id="titulo"
        label="Título"
        v-model="formData.titulo"
      />
      
      <!-- Descrição -->
      <FormField
        id="descricao"
        label="Descrição"
        v-model="formData.descricao"
      />
      
      <!-- Data -->
      <FormField
        id="data"
        label="Data"
        v-model="formData.data"
      />
      
      <!-- Contatos Importantes -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <label class="block text-sm font-medium text-gray-700">Contatos Importantes</label>
        </div>
        
        <div v-for="(contato, index) in formData.contatos_importantes" :key="index" 
            class="border border-gray-200 rounded-md p-4 mb-3">
          <div class="flex justify-between mb-2">
            <div class="flex items-center">
              <button 
                type="button"
                class="text-red-600 hover:text-red-800 mr-3"
                @click="removeContato(index)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <h3 class="font-medium">Contato #{{ index + 1 }}</h3>
            </div>
            <div class="flex">
              <button 
                type="button"
                class="text-gray-600 hover:text-gray-800 mr-1"
                @click="moveContato(index, 'up')"
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
                @click="moveContato(index, 'down')"
                :disabled="index === formData.contatos_importantes.length - 1"
                :class="{'opacity-50 cursor-not-allowed': index === formData.contatos_importantes.length - 1}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <!-- ID -->
            <div>
              <label :for="`contato-id-${index}`" class="block text-sm font-medium text-gray-700 mb-1">ID</label>
              <input
                type="text"
                :id="`contato-id-${index}`"
                v-model="contato.id"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
            </div>
            <!-- Nome -->
            <div>
              <label :for="`contato-nome-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                :id="`contato-nome-${index}`"
                v-model="contato.nome"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
            </div>
            <!-- Contato -->
            <div>
              <label :for="`contato-contato-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Contato</label>
              <input
                type="text"
                :id="`contato-contato-${index}`"
                v-model="contato.contato"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
            </div>
            <!-- Instagram -->
            <div>
              <label :for="`contato-instagram-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input
                type="text"
                :id="`contato-instagram-${index}`"
                v-model="contato.instagram"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
            </div>
            <!-- Rota -->
            <div>
              <label :for="`contato-rota-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Rota</label>
              <input
                type="text"
                :id="`contato-rota-${index}`"
                v-model="contato.rota"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
            </div>
          </div>
          
          <!-- Link (se existir) -->
          <div v-if="contato.link || showLinkField[index]" class="mt-3 border-t border-gray-100 pt-3">
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm font-medium">Link</h4>
              <button 
                v-if="!contato.link && showLinkField[index]"
                type="button" 
                class="text-red-600 hover:text-red-800 text-sm"
                @click="removeLinkField(index)"
              >
                Remover Link
              </button>
              <button 
                v-if="!contato.link && !showLinkField[index]"
                type="button" 
                class="text-blue-600 hover:text-blue-800 text-sm"
                @click="addLinkField(index)"
              >
                Adicionar Link
              </button>
            </div>
            
            <div v-if="contato.link || showLinkField[index]" class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label :for="`contato-link-titulo-${index}`" class="block text-sm font-medium text-gray-700 mb-1">Título do Link</label>
                <input
                  type="text"
                  :id="`contato-link-titulo-${index}`"
                  :value="contato.link ? contato.link.titulo : ''"
                  @input="updateLinkTitulo(contato, $event)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
              </div>
              <div>
                <label :for="`contato-link-url-${index}`" class="block text-sm font-medium text-gray-700 mb-1">URL do Link</label>
                <input
                  type="text"
                  :id="`contato-link-url-${index}`"
                  :value="contato.link ? contato.link.url : ''"
                  @input="updateLinkUrl(contato, $event)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
              </div>
            </div>
          </div>
        </div>
        
        <button 
          type="button"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center justify-center"
          @click="addContato"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Contato
        </button>
      </div>
      
      <!-- Copyright -->
      <FormField
        id="copyright"
        label="Copyright"
        v-model="formData.copyright"
        class="mb-6"
      />
      
      <!-- Botões de ação -->
      <FormActions @cancel="goBack" />
    </form>
  </AdminFormLayout>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getSiteFooter, updateSiteFooter } from '../../../services'
import AdminFormLayout from '../common/AdminFormLayout.vue'
import FormField from '../common/FormField.vue'
import FormActions from '../common/FormActions.vue'

const router = useRouter()

const formData = ref({
  titulo: '',
  descricao: '',
  data: '',
  contatos_importantes: [],
  copyright: ''
})

// Para controlar quais contatos têm o campo de link visível
const showLinkField = reactive({})

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

// Adicionar um novo contato importante
const addContato = () => {
  const newContato = {
    id: `contato-${formData.value.contatos_importantes.length + 1}`,
    nome: '',
    contato: '',
    instagram: '',
    rota: ''
  }
  formData.value.contatos_importantes.push(newContato)
}

// Remover um contato importante
const removeContato = (index) => {
  formData.value.contatos_importantes.splice(index, 1)
}

// Mover contato para cima ou para baixo
const moveContato = (index, direction) => {
  const contatos = formData.value.contatos_importantes
  
  if (direction === 'up' && index > 0) {
    // Trocar com o item acima
    [contatos[index], contatos[index - 1]] = [contatos[index - 1], contatos[index]]
  } else if (direction === 'down' && index < contatos.length - 1) {
    // Trocar com o item abaixo
    [contatos[index], contatos[index + 1]] = [contatos[index + 1], contatos[index]]
  }
}

// Helper methods para atualizar as propriedades do link de forma segura
const updateLinkTitulo = (contato, event) => {
  if (!contato.link) {
    contato.link = { titulo: '', url: '' }
  }
  contato.link.titulo = event.target.value
}

const updateLinkUrl = (contato, event) => {
  if (!contato.link) {
    contato.link = { titulo: '', url: '' }
  }
  contato.link.url = event.target.value
}

// Adicionar campo de link para um contato
const addLinkField = (index) => {
  const contato = formData.value.contatos_importantes[index]
  if (!contato.link) {
    contato.link = {
      titulo: '',
      url: ''
    }
  }
  showLinkField[index] = true
}

// Remover campo de link de um contato
const removeLinkField = (index) => {
  const contato = formData.value.contatos_importantes[index]
  delete contato.link
  showLinkField[index] = false
}

// Carregar dados do footer ao montar
onMounted(async () => {
  try {
    const data = await getSiteFooter()
    if (data) {
      formData.value = {
        titulo: data.titulo || '',
        descricao: data.descricao || '',
        data: data.data || '',
        contatos_importantes: Array.isArray(data.contatos_importantes) ? data.contatos_importantes : [],
        copyright: data.copyright || ''
      }
      
      // Garantir que todos os contatos tenham IDs únicos
      formData.value.contatos_importantes.forEach((contato, index) => {
        if (!contato.id) {
          contato.id = `contato-${index + 1}`
        }
        
        // Inicializar o estado dos campos de link
        showLinkField[index] = !!contato.link
        
        // Garantir que, se houver link, ele tenha as propriedades corretas
        if (contato.link && (typeof contato.link !== 'object')) {
          contato.link = {
            titulo: '',
            url: ''
          }
        }
      })
    }
  } catch (error) {
    console.error('Erro ao carregar dados do rodapé:', error)
    showAlert('Erro ao carregar dados do rodapé!', 'error')
  }
})

// Salvar no Firestore usando o serviço do projeto
const saveFooter = async () => {
  try {
    const result = await updateSiteFooter(formData.value)
    if (result.success) {
      showAlert('Rodapé salvo com sucesso!', 'success')
    } else {
      showAlert('Erro ao salvar rodapé!', 'error')
    }
  } catch (error) {
    console.error('Erro ao salvar rodapé:', error)
    showAlert('Erro ao salvar rodapé!', 'error')
  }
}

// Botão voltar
const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* Estilos específicos do formulário, se necessário */
</style> 