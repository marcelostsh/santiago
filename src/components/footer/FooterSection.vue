<template>
  <footer class="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">{{ footerData.titulo }}</h3>
          <p class="mb-4">{{ footerData.descricao }}</p>
          <p>{{ footerData.data }}</p>
        </div>
        <div class="md:text-right">
          <h3 class="text-xl font-bold mb-4">Contatos Importantes</h3>
          <div v-for="contato in footerData.contatos_importantes" :key="contato.id" class="mb-2">
            <p>{{ contato.nome }}: {{ contato.contato }}</p>
            <p v-if="contato.instagram" class="text-sm">Instagram: {{ contato.instagram }}</p>
            <p v-if="contato.rota" class="text-sm">Rota: {{ contato.rota }}</p>
            <a v-if="contato.link" :href="contato.link.url" target="_blank" class="text-blue-300 hover:text-blue-100">{{ contato.link.titulo }}</a>
          </div>
        </div>
      </div>
      <div class="border-t border-blue-700 mt-8 pt-8 text-center">
        <p>{{ footerData.copyright }}</p>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getSiteFooter } from '../../services/dataService';

// Footer Component
const footerData = ref({
  titulo: 'Santiago Trip',
  descricao: 'Seu guia de viagem para Santiago',
  data: '2023-2024',
  contatos_importantes: [
    { id: 1, nome: 'Emergência', telefone: '133' },
    { id: 2, nome: 'Polícia', telefone: '134' },
    { id: 3, nome: 'Ambulância', telefone: '131' }
  ],
  copyright: '© 2023 Santiago Trip. Todos os direitos reservados.'
});

// Carregar dados do footer
onMounted(async () => {
  try {
    const data = await getSiteFooter();
    if (data) {
      footerData.value = data;
    }
  } catch (error) {
    console.error('Erro ao carregar os dados do footer:', error);
  }
});
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
</style> 