<template>
  <div class="admin-layout p-6 max-w-7xl mx-auto">
    <!-- Router view com debug info -->
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <component :is="Component" />
        </template>
        <p v-else class="text-red-500">
          Nenhum componente carregado para esta rota. Verifique o console para erros.
        </p>
      </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('AdminLayout component mounted');
});
</script> 