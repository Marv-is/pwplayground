import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import Dashboard from '@/pages/Dashboard.vue';
import ListPage from '@/pages/ButtonPages/ListPage.vue';
import FormPage from "@/pages/ButtonPages/FormPage.vue";
import TaskListPage from "@/pages/ButtonPages/TaskListPage.vue";
import AnalyticsPage from "@/pages/ButtonPages/AnalyticsPage.vue";

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/dashboard', component: Dashboard },
  { path: '/dashboard/list', component: ListPage },
  { path: '/dashboard/form', component: FormPage},
  { path: '/dashboard/taskList', component: TaskListPage},
  { path: '/dashboard/analytics', component: AnalyticsPage},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

