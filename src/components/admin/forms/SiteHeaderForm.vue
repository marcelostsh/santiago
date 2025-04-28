<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <!-- Header com botão voltar e título -->
    <div class="flex items-center mb-6">
      <button
        class="mr-3 flex items-center text-gray-700"
        @click="goBack"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <h2 class="text-xl font-semibold">Configuração de Cabeçalho</h2>
    </div>

    <form @submit.prevent="saveHeader">
      <!-- Título -->
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
      </div>
      <!-- Subtítulo -->
      <div class="mb-4">
        <label for="subtitle" class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
        <input
          type="text"
          id="subtitle"
          v-model="formData.subtitle"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
      </div>
      <!-- Imagem de Fundo -->
      <div class="mb-4">
        <label for="backgroundImage" class="block text-sm font-medium text-gray-700 mb-1">Imagem de Fundo (URL)</label>
        <input
          type="text"
          id="backgroundImage"
          v-model="formData.backgroundImage"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
      </div>
      <!-- Período -->
      <div class="mb-4">
        <label for="periodStart" class="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
        <input
          type="date"
          id="periodStart"
          v-model="formData.period.start"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
      </div>
      <div class="mb-6">
        <label for="periodEnd" class="block text-sm font-medium text-gray-700 mb-1">Data de Término</label>
        <input
          type="date"
          id="periodEnd"
          v-model="formData.period.end"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
      </div>
      
      <!-- Botões de ação -->
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          @click="goBack"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSiteHeader } from '../../../services'
import { updateSiteHeader } from '../../../services'

const router = useRouter()

const formData = ref({
  title: '',
  subtitle: '',
  backgroundImage: '',
  period: {
    start: '',
    end: ''
  }
})

// Função para converter formato de data DD/MM/YYYY para YYYY-MM-DD (formato input date)
function formatDateForInput(dateStr) {
  if (!dateStr) return ''
  const parts = dateStr.split('/')
  if (parts.length !== 3) return ''
  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

// Função para converter formato de data YYYY-MM-DD para DD/MM/YYYY
function formatDateForStorage(dateStr) {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length !== 3) return ''
  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

// Carregar dados do header ao montar
onMounted(async () => {
  const data = await getSiteHeader()
  if (data) {
    formData.value = {
      title: data.title || '',
      subtitle: data.subtitle || '',
      backgroundImage: data.backgroundImage || '',
      period: {
        start: formatDateForInput(data.period?.start) || '',
        end: formatDateForInput(data.period?.end) || ''
      }
    }
  }
})

// Salvar no Firestore usando o serviço do projeto
const saveHeader = async () => {
  // Converter as datas de volta para o formato DD/MM/YYYY antes de salvar
  const dataToSave = {
    ...formData.value,
    period: {
      start: formatDateForStorage(formData.value.period.start),
      end: formatDateForStorage(formData.value.period.end)
    }
  }
  
  const result = await updateSiteHeader(dataToSave)
  if (result.success) {
    alert('Cabeçalho salvo com sucesso!')
  } else {
    alert('Erro ao salvar cabeçalho!')
  }
}

// Botão voltar
const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* ... mantenha ou ajuste estilos conforme necessário ... */
</style> 