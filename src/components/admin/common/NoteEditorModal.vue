<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Overlay de fundo escurecido -->
      <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>
      
      <!-- Modal -->
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl z-10 max-h-[90vh] flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Editar Anotação</h3>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="flex-grow overflow-auto">
          <Editor v-model="noteContent" placeholder="Escreva suas anotações aqui..." />
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="close" 
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button 
            @click="save" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import Editor from './Editor.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'update:content', 'save']);

// Conteúdo do editor
const noteContent = ref('');

// Inicializa o conteúdo quando o modal é aberto
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    noteContent.value = props.content;
  }
});

// Inicializa o conteúdo quando props.content muda
watch(() => props.content, (newContent) => {
  noteContent.value = newContent;
});

// Fechar o modal
const close = () => {
  emit('update:modelValue', false);
};

// Salvar o conteúdo
const save = () => {
  emit('update:content', noteContent.value);
  emit('save', noteContent.value);
  close();
};
</script> 