<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import ActivityItem from './ActivityItem.vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

defineProps({
  day: {
    type: Object,
    required: true
  }
});

const modules = [Navigation, Pagination];

// Função para gerar o link do Google Maps
function getGoogleMapsLink(position) {
  if (!position || !position.latitude || !position.longitude) {
    return null;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${position.latitude},${position.longitude}`;
}
</script>

<template>
  <section :id="day.id" class="mb-20">
    <!-- Cabeçalho do dia -->
    <div class="flex flex-wrap items-center mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-blue-800 mr-4 mb-2 sm:mb-0">{{ day.titulo }}</h2>
      <div class="text-base sm:text-lg px-4 py-1 bg-blue-100 text-blue-800 rounded-full mb-2 sm:mb-0">{{ day.data }}</div>
    </div>

    <div class="day-divider mb-8"></div>

    <!-- Layout para dias com imagem única -->
    <div v-if="day.imagens && day.imagens.length === 1" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div class="photo-container h-60 sm:h-80">
        <img :src="day.imagens[0]" :alt="day.titulo" class="w-full h-full object-cover rounded-lg shadow-md">
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-bold text-blue-700 mb-4">Atividades Planejadas</h3>
        <!-- Para dias com estrutura de atividades simples -->
        <div v-if="day.atividades">
          <ActivityItem v-for="(atividade, index) in day.atividades" :key="index" :atividade="atividade" />
        </div>
        
        <!-- Para dias com estrutura de períodos -->
        <div v-if="day.periodo">
          <div v-if="day.periodo.manha">
            <h4 class="font-semibold text-blue-600 mb-2">Manhã</h4>
            <ActivityItem v-for="(atividade, index) in day.periodo.manha" :key="'manha-'+index" :atividade="atividade" />
          </div>
          
          <div v-if="day.periodo.almoco || day.periodo.meioDia" class="mt-4">
            <h4 class="font-semibold text-blue-600 mb-2">{{ day.periodo.almoco ? 'Almoço' : 'Meio-dia' }}</h4>
            <ActivityItem v-for="(atividade, index) in day.periodo.almoco || day.periodo.meioDia" :key="'almoco-'+index" :atividade="atividade" />
          </div>
          
          <div v-if="day.periodo.tarde" class="mt-4">
            <h4 class="font-semibold text-blue-600 mb-2">Tarde</h4>
            <ActivityItem v-for="(atividade, index) in day.periodo.tarde" :key="'tarde-'+index" :atividade="atividade" />
          </div>
          
          <div v-if="day.periodo.fimDeTarde" class="mt-4">
            <h4 class="font-semibold text-blue-600 mb-2">Fim de tarde</h4>
            <ActivityItem v-for="(atividade, index) in day.periodo.fimDeTarde" :key="'fimtarde-'+index" :atividade="atividade" />
          </div>
          
          <div v-if="day.periodo.noite" class="mt-4">
            <h4 class="font-semibold text-blue-600 mb-2">Noite</h4>
            <ActivityItem v-for="(atividade, index) in day.periodo.noite" :key="'noite-'+index" :atividade="atividade" />
          </div>
        </div>

        <!-- Dicas do dia -->
        <div v-if="day.dicas && day.dicas.length > 0" class="mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800 mb-2"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
            Dicas para o {{ day.id }}:</h4>
          <ul class="text-gray-700 space-y-2">
            <li v-for="(dica, index) in day.dicas" :key="index">• {{ dica }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Layout para dias com múltiplas imagens -->
    <div v-if="day.imagens && day.imagens.length > 1" class="mb-8">
      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="20"
        :loop="true"
        :pagination="{ clickable: true }"
        :navigation="false"
        class="photo-swiper mb-8"
        :breakpoints="{
          // Quando a largura da janela for >= 320px
          320: { slidesPerView: 1, spaceBetween: 10 },
          // Quando a largura da janela for >= 768px
          768: { slidesPerView: 2, spaceBetween: 15 },
          // Quando a largura da janela for >= 1024px
          1024: { slidesPerView: 3, spaceBetween: 20 }
        }"
      >
        <swiper-slide v-for="(imagem, index) in day.imagens" :key="index">
          <div class="photo-container h-60 sm:h-72">
            <img :src="imagem" :alt="`${day.titulo} ${index + 1}`" class="w-full h-full object-cover rounded-lg shadow-md">
          </div>
        </swiper-slide>
      </swiper>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 class="text-xl font-bold text-blue-700 mb-4">Atividades Planejadas</h3>
        <!-- Para dias com estrutura de períodos -->
        <div v-if="day.periodo" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="day.periodo.manha">
            <h4 class="font-semibold text-blue-600 mb-2">Manhã</h4>
            <ActivityItem v-for="(atividade, index) in day.periodo.manha" :key="'manha-'+index" :atividade="atividade" />
          </div>
          
          <div v-if="day.periodo.almoco || day.periodo.meioDia">
            <h4 class="font-semibold text-blue-600 mb-2">{{ day.periodo.almoco ? 'Almoço' : 'Meio-dia' }}</h4>
            <ActivityItem v-for="(atividade, index) in day.periodo.almoco || day.periodo.meioDia" :key="'almoco-'+index" :atividade="atividade" />
          </div>
        </div>

        <div v-if="day.periodo" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div v-if="day.periodo.tarde">
            <h4 class="font-semibold text-blue-600 mb-2">Tarde</h4>
            <ActivityItem v-for="(atividade, index) in day.periodo.tarde" :key="'tarde-'+index" :atividade="atividade" />
          </div>
          
          <div v-if="day.periodo.fimDeTarde">
            <h4 class="font-semibold text-blue-600 mb-2">Fim de tarde</h4>
            <ActivityItem v-for="(atividade, index) in day.periodo.fimDeTarde" :key="'fimtarde-'+index" :atividade="atividade" />
          </div>
        </div>

        <div v-if="day.periodo && day.periodo.noite" class="mt-6">
          <h4 class="font-semibold text-blue-600 mb-2">Noite</h4>
          <ActivityItem v-for="(atividade, index) in day.periodo.noite" :key="'noite-'+index" :atividade="atividade" />
        </div>
      </div>
    </div>

    <!-- Detalhes adicionais -->
    <div v-if="day.detalhesAdicionais && day.detalhesAdicionais.length > 0" 
         :class="{'bg-white': !day.sobreLocal, 'bg-blue-50': day.sobreLocal}"
         class="rounded-lg shadow-md p-6 mb-8">
      <div v-for="(detalhe, index) in day.detalhesAdicionais" :key="index">
        <h3 v-if="index === 0" class="text-xl font-bold text-blue-700 mb-4">{{ detalhe.titulo }}</h3>
        <h4 v-else class="font-bold text-blue-800 mb-2">{{ detalhe.titulo }}</h4>
        <p class="text-gray-700 mb-4">{{ detalhe.conteudo }}</p>
      </div>
    </div>

    <!-- Sobre o local -->
    <div v-if="day.sobreLocal && !day.detalhesAdicionais" class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-bold text-blue-700 mb-4">Sobre {{ day.titulo.split(' - ')[1] || day.titulo }}</h3>
      <p class="text-gray-700">{{ day.sobreLocal }}</p>
    </div>

    <!-- Seção de dicas caso não tenha sido mostrada antes -->
    <div v-if="day.dicas && day.dicas.length > 0 && day.imagens && day.imagens.length > 1" class="bg-blue-50 rounded-lg shadow-md p-6 mt-6">
      <h4 class="font-bold text-blue-800 mb-2"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i> Dicas para o {{ day.id }}:</h4>
      <ul class="text-gray-700 space-y-2 mb-4">
        <li v-for="(dica, index) in day.dicas" :key="index">• {{ dica }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.day-divider {
  height: 4px;
  background: linear-gradient(90deg, #3182ce, #63b3ed, #3182ce);
  border-radius: 2px;
}

/* Estilos existentes do Swiper e Photo Container */

/* Ajustes para garantir que o Swiper funcione bem com Tailwind/outros estilos */
.photo-swiper {
  width: 100%;
  height: auto; /* Ajusta a altura automaticamente */
  padding-bottom: 40px; /* Espaço para paginação */
}

.photo-container {
  overflow: hidden; /* Mantém o overflow hidden */
  border-radius: 0.5rem; /* Mantém o border-radius */
}

/* Talvez seja necessário ajustar estilos dos botões de navegação e paginação do Swiper */
/* Exemplo: */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #3182ce; /* Cor azul do tema */
}

:deep(.swiper-pagination-bullet) {
  width: 20px; /* Largura da linha */
  height: 4px; /* Altura da linha */
  border-radius: 2px; /* Bordas levemente arredondadas */
  background: #a0aec0; /* Cinza para bullets inativos */
  opacity: 1; /* Garante que a opacidade padrão não interfira */
  transition: background-color 0.3s ease, width 0.3s ease; /* Transição suave */
}

:deep(.swiper-pagination-bullet-active) {
  background: #3182ce; /* Cor azul do tema para o bullet ativo */
  width: 30px; /* Pode-se aumentar a largura do ativo se desejar */
}
</style> 