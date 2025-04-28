<template>
  <AdminFormLayout 
    title="Configuração de Cabeçalho" 
    :alert="alert"
    @close-alert="closeAlert"
  >
    <form @submit.prevent="saveHeader">
      <!-- Título -->
      <FormField
        id="title"
        label="Título"
        v-model="formData.title"
      />
      
      <!-- Subtítulo -->
      <FormField
        id="subtitle"
        label="Subtítulo"
        v-model="formData.subtitle"
      />
      
      <!-- Imagem de Fundo -->
      <FormField
        id="backgroundImage"
        label="Imagem de Fundo (URL)"
        v-model="formData.backgroundImage"
      />
      
      <!-- Período -->
      <FormField
        id="periodStart"
        label="Data de Início"
        type="date"
        v-model="formData.period.start"
      />
      
      <div class="mb-2">
        <FormField
          id="periodEnd"
          label="Data de Término"
          type="date"
          v-model="formData.period.end"
        />
      </div>
      
      <!-- Botões de ação -->
      <FormActions @cancel="goBack" />
    </form>
  </AdminFormLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSiteHeader, updateSiteHeader } from '../../../services'
import AdminFormLayout from '../common/AdminFormLayout.vue'
import FormField from '../common/FormField.vue'
import FormActions from '../common/FormActions.vue'

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
    showAlert('Cabeçalho salvo com sucesso!', 'success')
  } else {
    showAlert('Erro ao salvar cabeçalho!', 'error')
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