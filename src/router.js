import { createRouter, createWebHistory } from 'vue-router';
import SiteHeaderForm from './components/admin/forms/SiteHeaderForm.vue';
import SiteFooterForm from './components/admin/forms/SiteFooterForm.vue';
import ActivitiesList from './components/admin/forms/ActivitiesList.vue';
import ActivityForm from './components/admin/forms/ActivityForm.vue';
import ItineraryList from './components/admin/forms/ItineraryList.vue';
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
      },
      {
        path: 'footer',
        name: 'admin-footer',
        component: SiteFooterForm,
        meta: { requiresAuth: true }
      },
      {
        path: 'atividades',
        name: 'admin-atividades',
        component: ActivitiesList,
        meta: { requiresAuth: true }
      },
      {
        path: 'atividades/:id',
        name: 'admin-atividades-detalhes',
        component: ActivityForm,
        meta: { requiresAuth: true }
      },
      {
        path: 'itinerario',
        name: 'admin-itinerario',
        component: ItineraryList,
        meta: { requiresAuth: true }
      },
      {
        path: 'itinerario/:id',
        name: 'admin-itinerario-detalhes',
        component: ActivityForm, // Precisará ser substituído por um componente ItineraryForm
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