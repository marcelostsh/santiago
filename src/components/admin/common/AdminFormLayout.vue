<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <!-- Alert notification -->
    <AlertNotification
      v-model:show="alert.show"
      :message="alert.message"
      :type="alert.type"
      @close="closeAlert"
    />

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
      <h2 class="text-xl font-semibold">{{ title }}</h2>
    </div>

    <!-- Slot for form content -->
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import AlertNotification from '../../common/AlertNotification.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  alert: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:alert', 'close-alert'])

const router = useRouter()

// Close alert manually
const closeAlert = () => {
  emit('close-alert')
}

// Botão voltar
const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* Estilos específicos do formulário, se necessário */
</style> 