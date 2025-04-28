import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Adicionar logs para depuração
console.log('Starting Vue application')
console.log('Routes registered:', router.getRoutes())

// Criar a aplicação Vue com o router
const app = createApp(App)

// Configuração de depuração
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err);
  console.error('Component:', vm);
  console.error('Info:', info);
};

// Instalar o router
app.use(router)

// Montar a aplicação
app.mount('#app')

// Confirmar montagem
console.log('Vue app mounted')
