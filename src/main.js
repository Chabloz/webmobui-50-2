import { createApp } from 'vue';
import App from './AppTrois.vue';
import { TroisJSVuePlugin } from 'troisjs';

const app = createApp(App);
app.use(TroisJSVuePlugin);
app.mount('#app');