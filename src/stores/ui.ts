import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useUi = defineStore('ui', () => {
	const leftMenuMiniMode = ref(
		JSON.parse(localStorage.getItem('leftMenuMiniMode') || '')
	)

	const setLeftMenuMiniMode = value => {
		leftMenuMiniMode.value = value
		localStorage.setItem('leftMenuMiniMode', value)
	}

	const leftMenuNavItems = ref([
		{
			hideInMini: false,
			items: [
				{
					label: 'Успеваемость',
					route: '/grades',
					icon: 'mdi-book-open-page-variant',
				},
				{
					label: 'Задания',
					route: '/lessons',
					icon: 'mdi-table',
				},
				{
					label: 'Отчеты',
					route: '/report',
					icon: 'mdi-chart-bar',
				},
				{
					label: 'Управление',
					route: '/admin',
					icon: 'mdi-cog',
				},
			],
		},

		{
			hideInMini: true,
			items: [
				{
					label: 'Карты дисциплин',
					url: 'https://kd.mospolytech.ru',
				},

				{
					label: 'Личный кабинет',
					url: 'https://e.mospolytech.ru',
				},
				{
					label: 'СДО',
					url: 'https://online.mospolytech.ru/',
				},
			],
		},
	])

	return {
		leftMenuMiniMode,
		setLeftMenuMiniMode,

		leftMenuNavItems,
	}
})
