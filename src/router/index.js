import { createRouter, createWebHistory } from 'vue-router'
import MainContent from '@/components/Startpage/MainContent.vue'
import RegisterView from "@/components/register/RegisterView.vue";
import RegisterSuccessView from '@/components/register/RegisterSuccessView.vue'
import RegisterErrorView from '@/components/register/RegisterErrorView.vue'
import LoginView  from "@/components/login/LoginView.vue";
import JobsView from "@/components/jobs/JobsView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainContent,
  },
      {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },

      {
        path: '/register-success',
        name: 'RegisterSuccess',
        component: RegisterSuccessView
      },
  {
    path: '/register-error',
    name: 'RegisterError',
    component: RegisterErrorView
  },

      {
    path: '/login',
    name: 'Login',
    component: LoginView
  },

    {
  path: '/jobs/:id',
  name: 'JobDetails',
  component: () => import('@/components/Jobs/JobDetails.vue'),
  props: true
},
    {
  path: '/jobs',
  name: 'Jobs',
  component: JobsView
},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router