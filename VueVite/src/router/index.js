import { createRouter, createWebHistory } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/role-selection',
    name: 'role-selection',
    component: () => import('@/views/RoleSelection.vue')
  },
  {
    path: '/context',
    name: 'context',
    component: () => import('@/views/Context.vue'),
    meta: { requiresRole: true, step: 1 }
  },
  {
    path: '/diagnosis',
    name: 'diagnosis',
    component: () => import('@/views/Diagnosis.vue'),
    meta: { requiresRole: true, step: 2 }
  },
  {
    path: '/reflection',
    name: 'reflection',
    component: () => import('@/views/Reflection.vue'),
    meta: { requiresRole: true, step: 3 }
  },
  {
    path: '/planning',
    name: 'planning',
    component: () => import('@/views/Planning.vue'),
    meta: { requiresRole: true, step: 4 }
  },
  {
    path: '/export',
    name: 'export',
    component: () => import('@/views/Export.vue'),
    meta: { requiresRole: true, step: 5 }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard: Prüft, ob Rolle gesetzt ist, wenn geschützte Route aufgerufen wird
router.beforeEach((to, from, next) => {
  const assessmentStore = useAssessmentStore()

  if (to.meta.requiresRole) {
    if (!assessmentStore.currentRole) {
      // Rolle nicht gesetzt – Umleitung zur Rollenauswahl
      next({ name: 'role-selection' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
