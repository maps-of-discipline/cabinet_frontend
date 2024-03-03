import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-dark-amber/theme.css'
/* import "primevue/resources/themes/saga-blue/theme.css"; */

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
