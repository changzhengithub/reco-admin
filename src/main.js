import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/reset.css'

import '@/permission'

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon'; // 引入图标库
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount('#app');

// createApp(App).use(store).use(router).mount('#app')
