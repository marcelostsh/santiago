<template>
  <div class="tiptap-editor-container">
    <div class="tiptap-menu" v-if="editor">
      <div class="menu-row">
        <!-- Formatação de texto -->
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" title="Negrito">
          <i class="fas fa-bold"></i>
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" title="Itálico">
          <i class="fas fa-italic"></i>
        </button>
        <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }" title="Sublinhado">
          <i class="fas fa-underline"></i>
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" title="Tachado">
          <i class="fas fa-strikethrough"></i>
        </button>
        
        <span class="divider"></span>
        
        <!-- Tamanho da fonte -->
        <div class="dropdown">
          <button class="dropdown-toggle" title="Tamanho da fonte">
            <i class="fas fa-text-height"></i>
            <i class="fas fa-caret-down"></i>
          </button>
          <div class="dropdown-menu font-size-menu">
            <button @click="setFontSize('10px')" :class="{ 'is-active': isFontSize('10px') }">
              <span style="font-size: 10px">Extra pequeno</span>
            </button>
            <button @click="setFontSize('12px')" :class="{ 'is-active': isFontSize('12px') }">
              <span style="font-size: 12px">Muito pequeno</span>
            </button>
            <button @click="setFontSize('14px')" :class="{ 'is-active': isFontSize('14px') }">
              <span style="font-size: 14px">Pequeno</span>
            </button>
            <button @click="setFontSize('16px')" :class="{ 'is-active': isFontSize('16px') }">
              <span style="font-size: 16px">Normal</span>
            </button>
            <button @click="setFontSize('18px')" :class="{ 'is-active': isFontSize('18px') }">
              <span style="font-size: 18px">Médio</span>
            </button>
            <button @click="setFontSize('20px')" :class="{ 'is-active': isFontSize('20px') }">
              <span style="font-size: 20px">Grande</span>
            </button>
            <button @click="setFontSize('24px')" :class="{ 'is-active': isFontSize('24px') }">
              <span style="font-size: 24px">Muito grande</span>
            </button>
            <button @click="setFontSize('28px')" :class="{ 'is-active': isFontSize('28px') }">
              <span style="font-size: 28px">Enorme</span>
            </button>
          </div>
        </div>
        
        <!-- Cabeçalhos -->
        <div class="dropdown">
          <button class="dropdown-toggle">
            <i class="fas fa-heading"></i>
            <i class="fas fa-caret-down"></i>
          </button>
          <div class="dropdown-menu">
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
              <span class="heading-1">H1</span>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
              <span class="heading-2">H2</span>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
              <span class="heading-3">H3</span>
            </button>
          </div>
        </div>

        <span class="divider"></span>
        
        <!-- Alinhamento -->
        <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" title="Alinhar à esquerda">
          <i class="fas fa-align-left"></i>
        </button>
        <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" title="Centralizar">
          <i class="fas fa-align-center"></i>
        </button>
        <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" title="Alinhar à direita">
          <i class="fas fa-align-right"></i>
        </button>
        <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }" title="Justificar">
          <i class="fas fa-align-justify"></i>
        </button>
      </div>
      
      <div class="menu-row">
        <!-- Listas -->
        <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" title="Lista não ordenada">
          <i class="fas fa-list-ul"></i>
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" title="Lista ordenada">
          <i class="fas fa-list-ol"></i>
        </button>
        
        <span class="divider"></span>
        
        <!-- Link -->
        <button @click="setLink" title="Inserir link">
          <i class="fas fa-link"></i>
        </button>
        
        <span class="divider"></span>
        
        <!-- Cores -->
        <div class="dropdown">
          <button class="dropdown-toggle" title="Cor do texto">
            <i class="fas fa-palette"></i>
            <i class="fas fa-caret-down"></i>
          </button>
          <div class="dropdown-menu colors-menu">
            <button @click="editor.chain().focus().setColor('#000000').run()" style="background-color: #000000;"></button>
            <button @click="editor.chain().focus().setColor('#424242').run()" style="background-color: #424242;"></button>
            <button @click="editor.chain().focus().setColor('#636363').run()" style="background-color: #636363;"></button>
            <button @click="editor.chain().focus().setColor('#9C9C9C').run()" style="background-color: #9C9C9C;"></button>
            <button @click="editor.chain().focus().setColor('#D50000').run()" style="background-color: #D50000;"></button>
            <button @click="editor.chain().focus().setColor('#E91E63').run()" style="background-color: #E91E63;"></button>
            <button @click="editor.chain().focus().setColor('#9C27B0').run()" style="background-color: #9C27B0;"></button>
            <button @click="editor.chain().focus().setColor('#3F51B5').run()" style="background-color: #3F51B5;"></button>
            <button @click="editor.chain().focus().setColor('#2196F3').run()" style="background-color: #2196F3;"></button>
            <button @click="editor.chain().focus().setColor('#00BCD4').run()" style="background-color: #00BCD4;"></button>
            <button @click="editor.chain().focus().setColor('#009688').run()" style="background-color: #009688;"></button>
            <button @click="editor.chain().focus().setColor('#4CAF50').run()" style="background-color: #4CAF50;"></button>
            <button @click="editor.chain().focus().setColor('#8BC34A').run()" style="background-color: #8BC34A;"></button>
            <button @click="editor.chain().focus().setColor('#CDDC39').run()" style="background-color: #CDDC39;"></button>
            <button @click="editor.chain().focus().setColor('#FFEB3B').run()" style="background-color: #FFEB3B;"></button>
            <button @click="editor.chain().focus().setColor('#FF9800').run()" style="background-color: #FF9800;"></button>
            <button @click="editor.chain().focus().setColor('#FF5722').run()" style="background-color: #FF5722;"></button>
            <button @click="editor.chain().focus().setColor('#795548').run()" style="background-color: #795548;"></button>
          </div>
        </div>
        
        <!-- Destaques -->
        <div class="dropdown">
          <button class="dropdown-toggle" title="Destaque">
            <i class="fas fa-highlighter"></i>
            <i class="fas fa-caret-down"></i>
          </button>
          <div class="dropdown-menu colors-menu">
            <button @click="editor.chain().focus().toggleHighlight({ color: '#FFFF00' }).run()" style="background-color: #FFFF00;"></button>
            <button @click="editor.chain().focus().toggleHighlight({ color: '#FFC107' }).run()" style="background-color: #FFC107;"></button>
            <button @click="editor.chain().focus().toggleHighlight({ color: '#FF8A65' }).run()" style="background-color: #FF8A65;"></button>
            <button @click="editor.chain().focus().toggleHighlight({ color: '#81C784' }).run()" style="background-color: #81C784;"></button>
            <button @click="editor.chain().focus().toggleHighlight({ color: '#80DEEA' }).run()" style="background-color: #80DEEA;"></button>
            <button @click="editor.chain().focus().toggleHighlight({ color: '#90CAF9' }).run()" style="background-color: #90CAF9;"></button>
            <button @click="editor.chain().focus().toggleHighlight({ color: '#B39DDB' }).run()" style="background-color: #B39DDB;"></button>
            <button @click="editor.chain().focus().toggleHighlight({ color: '#F48FB1' }).run()" style="background-color: #F48FB1;"></button>
          </div>
        </div>
        
        <span class="divider"></span>
        
        <!-- Limpar formatação -->
        <button @click="editor.chain().focus().unsetAllMarks().run()" title="Limpar formatação">
          <i class="fas fa-remove-format"></i>
        </button>
      </div>
    </div>
    
    <div class="editor-content">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import FontSize from '@tiptap/extension-font-size';
import Highlight from '@tiptap/extension-highlight';

// Criar extensões uma única vez, fora do escopo do componente
// Isso evita o problema de múltiplas instâncias do mesmo plugin
const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'editor-link',
    },
  }),
  TextStyle,
  Color,
  FontSize.configure({
    types: ['textStyle'],
  }),
  Highlight.configure({
    multicolor: true,
  }),
];

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Escreva algo...'
  }
});

const emit = defineEmits(['update:modelValue']);

const editor = ref(null);

// Método para aplicar tamanho de fonte
const setFontSize = (size) => {
  if (editor.value) {
    editor.value.chain().focus().setMark('textStyle', { fontSize: size }).run();
  }
};

// Método para verificar o tamanho de fonte atual
const isFontSize = (size) => {
  if (!editor.value) return false;
  return editor.value.isActive('textStyle', { fontSize: size });
};

// Método para inserir link
const setLink = () => {
  const url = prompt('URL:');
  
  // Cancela se o usuário não digitou uma URL
  if (!url) return;
  
  // Adiciona https:// se não começar com http ou https
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;
  
  // Se tem texto selecionado, transforma em link
  if (editor.value.isActive('link')) {
    editor.value.chain().focus().extendMarkRange('link').setLink({ href: fullUrl }).run();
  } else {
    editor.value.chain().focus().setLink({ href: fullUrl }).run();
  }
};

onMounted(() => {
  // Importante: não recriar as extensões aqui
  editor.value = new Editor({
    content: props.modelValue,
    extensions,
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose focus:outline-none max-w-none',
        placeholder: props.placeholder,
      },
    },
  });
});

// Atualiza o editor quando o valor muda externamente
watch(() => props.modelValue, (newVal) => {
  if (editor.value && editor.value.getHTML() !== newVal) {
    editor.value.commands.setContent(newVal, false);
  }
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style scoped>
.tiptap-editor-container {
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tiptap-menu {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 0.5rem;
}

.menu-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.menu-row:not(:last-child) {
  margin-bottom: 5px;
}

.tiptap-menu button {
  padding: 5px 7px;
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  cursor: pointer;
  color: #495057;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tiptap-menu button:hover {
  background-color: #e9ecef;
}

.tiptap-menu button.is-active {
  background-color: #e9ecef;
  color: #1a73e8;
}

.editor-content {
  padding: 1rem;
  min-height: 180px;
  background-color: white;
}

/* Divider entre os grupos de botões */
.divider {
  height: 22px;
  width: 1px;
  background-color: #dee2e6;
  margin: 0 6px;
}

/* Estilo para os cabeçalhos no menu */
.heading-1 {
  font-size: 18px;
  font-weight: bold;
}

.heading-2 {
  font-size: 16px;
  font-weight: bold;
}

.heading-3 {
  font-size: 14px;
  font-weight: bold;
}

/* Dropdown menu */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 3px;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 120px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 5px;
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.1s;
}

.dropdown:hover .dropdown-menu {
  display: block;
  visibility: visible;
  opacity: 1;
}

.dropdown-menu button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 5px 10px;
  margin: 2px 0;
}

/* Menu de cores */
.colors-menu {
  display: none; /* Garante que está escondido por padrão */
  flex-wrap: wrap;
  width: 152px;
  padding: 5px;
}

.dropdown:hover .colors-menu {
  display: flex; /* Ativa o flexbox apenas no hover */
}

/* Menu de tamanhos de fonte */
.font-size-menu {
  width: 180px;
}

.font-size-menu button {
  display: block;
  width: 100%;
  text-align: left;
}

.colors-menu button {
  width: 24px;
  height: 24px;
  margin: 2px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Editor links */
:deep(.editor-link) {
  color: #1a73e8;
  text-decoration: underline;
}

/* Tiptap CSS */
:deep(.ProseMirror) {
  outline: none;
  min-height: 150px;
}

:deep(.ProseMirror > * + *) {
  margin-top: 0.75em;
}

:deep(.ProseMirror ul),
:deep(.ProseMirror ol) {
  padding: 0 1rem;
}

:deep(.ProseMirror p) {
  margin: 0;
}

:deep(.ProseMirror h1) {
  font-size: 1.8em;
  font-weight: bold;
}

:deep(.ProseMirror h2) {
  font-size: 1.5em;
  font-weight: bold;
}

:deep(.ProseMirror h3) {
  font-size: 1.3em;
  font-weight: bold;
}
</style> 