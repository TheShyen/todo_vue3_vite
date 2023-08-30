import TodoPage from './src/components/TodoPage.vue';
import SearchTodoPage from './src/components/SearchTodoPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/:pageId',
    component: TodoPage
  },
  {
    path: '/search/:input',
    component: SearchTodoPage
  }
];

export const router = createRouter({
  history: createWebHistory('/todo_vue3_vite/'),
  routes
});
