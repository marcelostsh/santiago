<template>
  <div v-if="show" 
       :class="[
         'fixed top-4 left-0 right-0 mx-auto max-w-md z-50 p-4 rounded-md flex items-center justify-between transition-all duration-300 shadow-lg',
         type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
         type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
         type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 
         'bg-blue-100 text-blue-800 border border-blue-200'
       ]">
    <div class="flex items-center">
      <!-- Success Icon -->
      <svg v-if="type === 'success'" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <!-- Error Icon -->
      <svg v-else-if="type === 'error'" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <!-- Warning Icon -->
      <svg v-else-if="type === 'warning'" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <!-- Info Icon -->
      <svg v-else class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      
      <span>{{ message }}</span>
    </div>
    <button @click="close" class="text-gray-500 hover:text-gray-700">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  autoClose: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 5000
  }
});

const emit = defineEmits(['update:show', 'close']);

let timeout = null;

// Watch for changes in the show property
watch(() => props.show, (newValue) => {
  if (newValue && props.autoClose) {
    startAutoCloseTimer();
  } else if (!newValue && timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
});

// Start timer for auto close
const startAutoCloseTimer = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  
  timeout = setTimeout(() => {
    close();
  }, props.duration);
};

// Close the alert
const close = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  emit('update:show', false);
  emit('close');
};

// Setup auto close when mounted if needed
onMounted(() => {
  if (props.show && props.autoClose) {
    startAutoCloseTimer();
  }
});

// Clean up timeout if component is unmounted
onBeforeUnmount(() => {
  if (timeout) {
    clearTimeout(timeout);
  }
});
</script>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-300 {
  transition-duration: 300ms;
}
</style> 