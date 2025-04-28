import { createRouter, createWebHistory } from 'vue-router';
import SiteHeaderForm from './components/admin/forms/SiteHeaderForm.vue';
import AdminLayout from './components/admin/AdminLayout.vue';

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'header',
        name: 'admin-header',
        component: SiteHeaderForm,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/santiago/'),
  routes
});

// Adicionar logs de navegação
router.beforeEach((to, from, next) => {
  console.log(`Navegando para: ${to.fullPath}`);
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Por enquanto, sem autenticação real - implementaremos depois
    const isAuthenticated = true; // Mockado como sempre autenticado
    
    if (!isAuthenticated) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  console.log(`Navegação concluída: ${to.fullPath}`);
});

export default router; 