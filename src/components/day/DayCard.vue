<template>
  <section :id="day.id" class="mb-20">
    <!-- Cabeçalho do dia -->
    <div class="flex flex-wrap items-center mb-1">
      <h2 class="text-2xl sm:text-3xl font-bold text-blue-800 mr-4 mb-1 sm:mb-0">{{ day.title }}</h2>
    </div>
    <!-- Data formatada em linha separada -->
    <div class="mb-5">
      <h3 class="text-sm text-gray-700">
        {{ formatDate(day.date) }}
      </h3>
    </div>

    <!-- Layout unificado para imagens -->
    <div class="mb-8">
      <!-- Imagem única -->
      <div v-if="day.images && day.images.length === 1" class="photo-container h-60 sm:h-80 mb-8">
        <img :src="day.images[0]" :alt="day.title" class="w-full h-full object-cover rounded-lg shadow-md">
      </div>

      <!-- Múltiplas imagens -->
      <swiper
        v-if="day.images && day.images.length > 1"
        :modules="modules"
        :slides-per-view="3"
        :space-between="20"
        :loop="true"
        :pagination="{ clickable: true }"
        :navigation="false"
        v-model:activeIndex="activeSlide"
        @slideChange="onSlideChange"
        class="photo-swiper mb-8"
        :breakpoints="{
          320: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 }
        }"
      >
        <swiper-slide v-for="(image, index) in day.images" :key="index">
          <div class="photo-container h-60 sm:h-72">
            <img :src="image" :alt="`${day.title} ${index + 1}`" class="w-full h-full object-cover rounded-lg shadow-md">
          </div>
        </swiper-slide>
      </swiper>

      <!-- Conteúdo unificado para atividades -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-bold text-blue-700 mb-4">
          Atividades Planejadas
        </h3>
        
        <!-- Status de carregamento -->
        <div v-if="isLoading" class="mb-4">
          <p class="text-gray-600 italic">Carregando atividades...</p>
        </div>
        
        <!-- Resumo de atividades -->
        <div v-else-if="filteredActivities.morning.length + 
                  filteredActivities.lunch.length + 
                  filteredActivities.midDay.length + 
                  filteredActivities.afternoon.length + 
                  filteredActivities.evening.length + 
                  filteredActivities.night.length > 0" class="mb-4">
         </div>
        
        <!-- Conteúdo de schedule (períodos) -->
        <div v-if="!isLoading">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-if="filteredActivities.morning.length > 0">
              <h4 class="font-semibold text-blue-600 mb-2">Manhã</h4>
              <ActivityItem v-for="(activity, index) in filteredActivities.morning" :key="'manha-'+index" :atividade="activity" />
            </div>
            
            <div v-if="filteredActivities.lunch.length > 0 || filteredActivities.midDay.length > 0">
              <h4 class="font-semibold text-blue-600 mb-2">{{ filteredActivities.lunch.length > 0 ? 'Almoço' : 'Meio-dia' }}</h4>
              <ActivityItem v-for="(activity, index) in filteredActivities.lunch.length > 0 ? filteredActivities.lunch : filteredActivities.midDay" 
                :key="'almoco-'+index" 
                :atividade="activity" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div v-if="filteredActivities.afternoon.length > 0">
              <h4 class="font-semibold text-blue-600 mb-2">Tarde</h4>
              <ActivityItem v-for="(activity, index) in filteredActivities.afternoon" :key="'tarde-'+index" :atividade="activity" />
            </div>
            
            <div v-if="filteredActivities.evening.length > 0">
              <h4 class="font-semibold text-blue-600 mb-2">Fim de tarde</h4>
              <ActivityItem v-for="(activity, index) in filteredActivities.evening" :key="'fimtarde-'+index" :atividade="activity" />
            </div>
          </div>

          <div v-if="filteredActivities.night.length > 0" class="mt-6">
            <h4 class="font-semibold text-blue-600 mb-2">Noite</h4>
            <ActivityItem v-for="(activity, index) in filteredActivities.night" :key="'noite-'+index" :atividade="activity" />
          </div>
        </div>

        <!-- Dicas do dia -->
        <div v-if="day.tips && day.tips.length > 0" class="mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800 mb-2"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
            Dicas para o dia:</h4>
          <ul class="text-gray-700 space-y-2">
            <li v-for="(tip, index) in day.tips" :key="index">• {{ tip }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Detalhes adicionais -->
    <div v-if="day.additionalDetails && day.additionalDetails.length > 0" 
         :class="{'bg-white': !day.about, 'bg-blue-50': day.about}"
         class="rounded-lg shadow-md p-6 mb-8">
      <div v-for="(detail, index) in day.additionalDetails" :key="index">
        <h3 v-if="index === 0" class="text-xl font-bold text-blue-700 mb-4">{{ detail.title }}</h3>
        <h4 v-else class="font-bold text-blue-800 mb-2">{{ detail.title }}</h4>
        <p class="text-gray-700 mb-4">{{ detail.content }}</p>
      </div>
    </div>

    <!-- Sobre o local -->
    <div v-if="day.about && !day.additionalDetails" class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-bold text-blue-700 mb-4">Sobre {{ day.title.split(' - ')[1] || day.title }}</h3>
      <p class="text-gray-700">{{ day.about }}</p>
    </div>
  </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import ActivityItem from './ActivityItem.vue';
import { ref, computed, onMounted } from 'vue';
import { getActivities } from '../../services';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const props = defineProps({
  day: {
    type: Object,
    required: true
  }
});

const activeSlide = ref(0);
const modules = [Navigation, Pagination];
const allActivities = ref([]); // Para armazenar TODAS as atividades do JSON
const isLoading = ref(true);

// Função para formatar a data no formato desejado
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  // Obter data atual para comparar com a data do roteiro
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Converter a string de data para um objeto Date
  // Verificar se a data usa / ou - como separador
  let parts;
  if (dateStr.includes('/')) {
    parts = dateStr.split('/');
  } else if (dateStr.includes('-')) {
    parts = dateStr.split('-');
  } else {
    return dateStr; // Retorna o original se não tiver separador conhecido
  }
  
  if (parts.length < 3) return dateStr; // Retorna o original se não conseguir converter
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Mês em JS é 0-indexed
  const year = parts[2].length === 2 ? 2000 + parseInt(parts[2], 10) : parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  
  // Array com nomes dos meses em português
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  // Array com nomes dos dias da semana em português
  const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
                      'Quinta-feira', 'Sexta-feira', 'Sábado'];
  
  // Formatar a data
  let formattedDate = `${day} de ${meses[month]}`;
  
  // Adicionar indicador se é hoje ou amanhã
  if (date.getTime() === today.getTime()) {
    formattedDate += ' (hoje)';
  } else if (date.getTime() === tomorrow.getTime()) {
    formattedDate += ' (amanhã)';
  }
  
  // Adicionar dia da semana
  formattedDate += ` - ${diasSemana[date.getDay()]}`;
  
  // Adicionar número do dia no roteiro (extraído do ID do dia)
  if (props.day.id && props.day.id.includes('day-')) {
    const dayNum = props.day.id.replace('day-', '');
    if (!isNaN(parseInt(dayNum, 10))) {
      formattedDate += ` - ${dayNum}º dia`;
    }
  }
  
  return formattedDate;
};

const onSlideChange = (swiper) => {
  activeSlide.value = swiper.activeIndex;
};

// Método para carregar todas as atividades do arquivo activities.json
const loadAllActivities = async () => {
  try {
    isLoading.value = true;
    // Obtém todas as atividades disponíveis
    allActivities.value = await getActivities();
  } catch (error) {
    console.error('Erro ao carregar atividades:', error);
    allActivities.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Carrega todas as atividades uma vez quando o componente é montado
onMounted(async () => {
  await loadAllActivities();
});

// Computed property para filtrar e agrupar atividades por período
const filteredActivities = computed(() => {
  if (!props.day.schedule || allActivities.value.length === 0) {
    return {
      morning: [],
      lunch: [],
      midDay: [],
      afternoon: [],
      evening: [],
      night: []
    };
  }

  // Função auxiliar para processar os IDs ou strings de atividades
  const processScheduleItems = (items) => {
    if (!items || items.length === 0 || !items.map) return [];
    
    return items.map(item => {
      // Se o item for uma string mas não for um ID de atividade, cria um objeto simples
      if (typeof item === 'string') {
        const activityFromJson = allActivities.value.find(a => a.id === item);
        
        if (activityFromJson) {
          return {
            ...activityFromJson,
            titulo: activityFromJson.title,
            descricao: activityFromJson.description
          };
        } else {
          // É uma string simples, não um ID
          return {
            id: item,
            titulo: item,
            descricao: ''
          };
        }
      } 
      // Se for um objeto, retorna ele mesmo
      return item;
    });
  };

  // Processa cada período do dia
  const result = {
    morning: processScheduleItems(props.day.schedule.morning),
    lunch: processScheduleItems(props.day.schedule.lunch),
    midDay: processScheduleItems(props.day.schedule.midDay),
    afternoon: processScheduleItems(props.day.schedule.afternoon),
    evening: processScheduleItems(props.day.schedule.evening),
    night: processScheduleItems(props.day.schedule.night)
  };
  
  return result;
});
</script>
<style scoped>

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
  background: #3182ce; /* Cor azul do tema */
}
</style> 