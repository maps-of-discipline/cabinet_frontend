import './assets/main.css'
import 'primeicons/primeicons.css'
import '@styles/prime-theme/theme.scss'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'

const app = createApp(App)

app.directive('ripple', Ripple)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })

app.mount('#app')
