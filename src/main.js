import { createApp } from 'vue';
import { Quasar, Dialog } from 'quasar';
import quasarLang from 'quasar/lang/ru';

import '@quasar/extras/material-icons/material-icons.css';

import 'quasar/src/css/index.sass';

import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';

import TodoPage from './components/TodoPage.vue';
import SearchTodoPage from './components/SearchTodoPage.vue';

const routes = [
  {
    path: '/:pageId',
    component: TodoPage
  },
  {
    path: '/search',
    component: SearchTodoPage
  }
];

const router = createRouter({
  history: createWebHistory('/todo_vue3_vite/'),
  routes
});
const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: { Dialog }, // import Quasar plugins and add here
  lang: quasarLang
});

myApp.use(router).mount('#app');
