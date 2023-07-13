import { createApp } from 'vue';
import { Quasar, Dialog } from 'quasar';
import quasarLang from 'quasar/lang/ru';

import '@quasar/extras/material-icons/material-icons.css';

import 'quasar/src/css/index.sass';

import App from './App.vue';

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: { Dialog }, // import Quasar plugins and add here
  lang: quasarLang
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app');
