import { createApp } from 'vue';
import { Quasar, Dialog } from 'quasar';
import quasarLang from 'quasar/lang/ru';

import '@quasar/extras/material-icons/material-icons.css';

import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from '../router';

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: { Dialog }, // import Quasar plugins and add here
  lang: quasarLang
});

myApp.use(router).mount('#app');
