import 'primeicons/primeicons.css'
import '@styles/prime-theme/theme.scss'
import '@styles/main.scss'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import FocusTrap from 'primevue/focustrap'
import VueApexCharts from 'vue3-apexcharts'
import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App)

app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)
app.directive('focustrap', FocusTrap)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
	ripple: true,
	locale: {
		firstDayOfWeek: 1,
		monthNames: [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		],
		monthNamesShort: [
			'Янв',
			'Фев',
			'Мар',
			'Апр',
			'Май',
			'Июн',
			'Июл',
			'Авг',
			'Сен',
			'Окт',
			'Ноя',
			'Дек',
		],
		dayNames: [
			'Воскресенье',
			'Понедельник',
			'Вторник',
			'Среда',
			'Четверг',
			'Пятница',
			'Суббота',
		],
		dayNamesShort: ['Воск', 'Пон', 'Вт', 'Ср', 'Четв', 'Пят', 'Суб'],
		dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	},
})
app.use(ConfirmationService)
app.use(ToastService)
app.use(VueApexCharts)

app.mount('#app')

export default app
