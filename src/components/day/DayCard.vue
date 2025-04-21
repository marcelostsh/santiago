<script setup>
defineProps({
  day: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section :id="day.id" class="mb-20">
    <!-- Cabeçalho do dia -->
    <div class="flex flex-wrap items-center mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-blue-800 mr-4 mb-2 sm:mb-0">{{ day.titulo }}</h2>
      <div class="text-base sm:text-lg px-4 py-1 bg-blue-100 text-blue-800 rounded-full mb-2 sm:mb-0">{{ day.data }}</div>
      <div class="w-full sm:w-auto sm:ml-auto px-4 py-1 text-white rounded-full text-sm mt-2 sm:mt-0"
           :class="{
             'probability-high': day.probabilidadeNeve === 'alta',
             'probability-medium': day.probabilidadeNeve === 'media',
             'probability-low': day.probabilidadeNeve === 'baixa'
           }">
        Probabilidade de Neve: {{ day.probabilidadeNeve === 'alta' ? 'Alta' : day.probabilidadeNeve === 'media' ? 'Média' : 'Baixa' }}
      </div>
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
          <div v-for="(atividade, index) in day.atividades" :key="index" class="activity-item">
            <p class="font-medium">{{ atividade.titulo }}</p>
            <p class="text-gray-600">{{ atividade.descricao }}</p>
          </div>
        </div>
        
        <!-- Para dias com estrutura de períodos -->
        <div v-if="day.periodo">
          <div v-if="day.periodo.manha">
            <h4 class="font-semibold text-blue-600 mb-2">Manhã</h4>
            <div v-for="(atividade, index) in day.periodo.manha" :key="'manha-'+index" class="activity-item">
              <p class="font-medium">{{ atividade.titulo }}</p>
              <p class="text-gray-600">{{ atividade.descricao }}</p>
            </div>
          </div>
          
          <div v-if="day.periodo.almoco || day.periodo.meioDia" class="mt-4">
            <h4 class="font-semibold text-blue-600 mb-2">{{ day.periodo.almoco ? 'Almoço' : 'Meio-dia' }}</h4>
            <div v-for="(atividade, index) in day.periodo.almoco || day.periodo.meioDia" :key="'almoco-'+index" class="activity-item">
              <p class="font-medium">{{ atividade.titulo }}</p>
              <p class="text-gray-600">{{ atividade.descricao }}</p>
            </div>
          </div>
          
          <div v-if="day.periodo.tarde" class="mt-4">
            <h4 class="font-semibold text-blue-600 mb-2">Tarde</h4>
            <div v-for="(atividade, index) in day.periodo.tarde" :key="'tarde-'+index" class="activity-item">
              <p class="font-medium">{{ atividade.titulo }}</p>
              <p class="text-gray-600">{{ atividade.descricao }}</p>
            </div>
          </div>
          
          <div v-if="day.periodo.fimDeTarde" class="mt-4">
            <h4 class="font-semibold text-blue-600 mb-2">Fim de tarde</h4>
            <div v-for="(atividade, index) in day.periodo.fimDeTarde" :key="'fimtarde-'+index" class="activity-item">
              <p class="font-medium">{{ atividade.titulo }}</p>
              <p class="text-gray-600">{{ atividade.descricao }}</p>
            </div>
          </div>
          
          <div v-if="day.periodo.noite" class="mt-4">
            <h4 class="font-semibold text-blue-600 mb-2">Noite</h4>
            <div v-for="(atividade, index) in day.periodo.noite" :key="'noite-'+index" class="activity-item">
              <p class="font-medium">{{ atividade.titulo }}</p>
              <p class="text-gray-600">{{ atividade.descricao }}</p>
            </div>
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div v-for="(imagem, index) in day.imagens" :key="index" class="photo-container h-60">
          <img :src="imagem" :alt="`${day.titulo} ${index + 1}`" class="w-full h-full object-cover rounded-lg shadow-md">
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 class="text-xl font-bold text-blue-700 mb-4">Atividades Planejadas</h3>
        <!-- Para dias com estrutura de períodos -->
        <div v-if="day.periodo" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="day.periodo.manha">
            <h4 class="font-semibold text-blue-600 mb-2">Manhã</h4>
            <div v-for="(atividade, index) in day.periodo.manha" :key="'manha-'+index" class="activity-item">
              <p class="font-medium">{{ atividade.titulo }}</p>
              <p class="text-gray-600">{{ atividade.descricao }}</p>
            </div>
          </div>
          
          <div v-if="day.periodo.almoco || day.periodo.meioDia">
            <h4 class="font-semibold text-blue-600 mb-2">{{ day.periodo.almoco ? 'Almoço' : 'Meio-dia' }}</h4>
            <div v-for="(atividade, index) in day.periodo.almoco || day.periodo.meioDia" :key="'almoco-'+index" class="activity-item">
              <p class="font-medium">{{ atividade.titulo }}</p>
              <p class="text-gray-600">{{ atividade.descricao }}</p>
            </div>
          </div>
        </div>

        <div v-if="day.periodo" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div v-if="day.periodo.tarde">
            <h4 class="font-semibold text-blue-600 mb-2">Tarde</h4>
            <div v-for="(atividade, index) in day.periodo.tarde" :key="'tarde-'+index" class="activity-item">
              <p class="font-medium">{{ atividade.titulo }}</p>
              <p class="text-gray-600">{{ atividade.descricao }}</p>
            </div>
          </div>
          
          <div v-if="day.periodo.fimDeTarde">
            <h4 class="font-semibold text-blue-600 mb-2">Fim de tarde</h4>
            <div v-for="(atividade, index) in day.periodo.fimDeTarde" :key="'fimtarde-'+index" class="activity-item">
              <p class="font-medium">{{ atividade.titulo }}</p>
              <p class="text-gray-600">{{ atividade.descricao }}</p>
            </div>
          </div>
        </div>

        <div v-if="day.periodo && day.periodo.noite" class="mt-6">
          <h4 class="font-semibold text-blue-600 mb-2">Noite</h4>
          <div v-for="(atividade, index) in day.periodo.noite" :key="'noite-'+index" class="activity-item">
            <p class="font-medium">{{ atividade.titulo }}</p>
            <p class="text-gray-600">{{ atividade.descricao }}</p>
          </div>
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