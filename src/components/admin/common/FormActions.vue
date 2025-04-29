<template>
  <div class="flex justify-end space-x-3">
    <button
      type="button"
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
      @click="$emit('cancel')"
    >
      {{ cancelLabel }}
    </button>
    <button
      type="submit"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      {{ submitLabel }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  submitLabel: {
    type: String,
    default: 'Salvar'
  },
  cancelLabel: {
    type: String,
    default: 'Cancelar'
  }
})

defineEmits(['cancel'])
</script> 