<script setup>
defineProps({
  atividade: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="activity-item">
    <p class="font-medium">{{ atividade.titulo }}</p>
    <p class="text-gray-600">{{ atividade.descricao }}</p>
    
    <!-- Anotação da atividade (se existir) -->
    <div v-if="atividade.note" class="note-container">
      <div v-html="atividade.note" class="tiptap-content"></div>
    </div>
    
    <div class="mt-1 flex gap-2 flex-wrap">
      <a v-if="atividade.location" 
         :href="atividade.location" 
         target="_blank" 
         class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
        <i class="fas fa-map-marker-alt mr-1"></i> Local
      </a>
      <a v-if="atividade.links && atividade.links.site" 
         :href="atividade.links.site" 
         target="_blank" 
         class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
        <i class="fas fa-globe mr-1"></i> Site
      </a>
      <a v-if="atividade.links && atividade.links.instagram" 
         :href="atividade.links.instagram" 
         target="_blank" 
         class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
        <i class="fab fa-instagram mr-1"></i> Instagram
      </a>
    </div>
  </div>
</template>

<style scoped>
.activity-item {
  border-left: 4px solid #3182ce;
  padding-left: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.activity-item::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #3182ce;
  border-radius: 50%;
  left: -8px;
  top: 0.6em;
  transform: translateY(-50%);
}
.note-container {
    margin-top: 15px;
    border-top: solid 1px #8f8f8f !important;
    padding-top: 20px;
    border-style: dashed !important;
    border-bottom: solid 1px #8f8f8f;
    padding-bottom: 15px;
    margin-bottom: 20px;
}

/* Reset de formatação para o conteúdo do TipTap */
.tiptap-content {
  all: initial;
  font-family: inherit;
  color: #374151;
}

/* Estilizações específicas para elementos dentro do conteúdo do TipTap */
.tiptap-content :deep(*) {
  font-family: inherit;
}

/* Estilos para textos formatados pelo TipTap */
.tiptap-content :deep([style*="color:"]) {
  color: attr(style color);
}

/* Suporte para tamanhos de fonte do TipTap */
.tiptap-content :deep([style*="font-size:"]) {
  font-size: attr(style font-size);
}

/* Suporte específico para a extensão fontSize */
.tiptap-content :deep([data-font-size]) {
  font-size: attr(data-font-size);
}

.tiptap-content :deep(mark) {
  background-color: transparent;
}

.tiptap-content :deep([data-text-align="center"]) {
  text-align: center;
}

.tiptap-content :deep([data-text-align="right"]) {
  text-align: right;
}

.tiptap-content :deep([data-text-align="justify"]) {
  text-align: justify;
}

.tiptap-content :deep(p) {
  margin-bottom: 0.5rem;
  font-weight: normal;
}

.tiptap-content :deep(strong),
.tiptap-content :deep(b) {
  font-weight: bold;
}

.tiptap-content :deep(em),
.tiptap-content :deep(i) {
  font-style: italic;
}

.tiptap-content :deep(u) {
  text-decoration: underline;
}

.tiptap-content :deep(s),
.tiptap-content :deep(strike) {
  text-decoration: line-through;
}

.tiptap-content :deep(ul),
.tiptap-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.tiptap-content :deep(ul) {
  list-style-type: disc;
}

.tiptap-content :deep(ol) {
  list-style-type: decimal;
}

.tiptap-content :deep(blockquote) {
  border-left: 3px solid #ccc;
  margin: 0.5rem 0;
  padding-left: 1rem;
  color: #666;
}

.tiptap-content :deep(pre) {
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 3px;
  font-family: monospace;
  overflow-x: auto;
}

.tiptap-content :deep(a) {
  color: #3182ce;
  text-decoration: underline;
}

.tiptap-content :deep(h1) {
  font-size: 1.8em;
  margin-bottom: 0.5rem;
}

.tiptap-content :deep(h2) {
  font-size: 1.5em;
  margin-bottom: 0.5rem;
}

.tiptap-content :deep(h3) {
  font-size: 1.3em;
  margin-bottom: 0.5rem;
}

/* Classes específicas do TipTap para indentação */
.tiptap-content :deep(.is-editor-empty) {
  opacity: 0.5;
}

/* Remover classes específicas do Quill que não são usadas pelo TipTap */
/* .tiptap-content :deep(.ql-indent-1) {
  padding-left: 2rem;
}

.tiptap-content :deep(.ql-indent-2) {
  padding-left: 4rem;
}

.tiptap-content :deep(.ql-size-small) {
  font-size: 0.8em;
}

.tiptap-content :deep(.ql-size-large) {
  font-size: 1.2em;
}

.tiptap-content :deep(.ql-size-huge) {
  font-size: 1.5em;
} */
</style> 