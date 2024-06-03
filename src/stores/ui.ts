import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { RolesEnum } from '@models/auth/RolesEnum'
import { useUser } from '@stores/user'

export const useUi = defineStore('ui', () => {
	const userStore = useUser()

	const leftMenuMiniMode = ref(
		localStorage.getItem('leftMenuMiniMode') === 'true'
	)

	const setLeftMenuMiniMode = value => {
		leftMenuMiniMode.value = value
		localStorage.setItem('leftMenuMiniMode', value)
		new Event('resize') // for resize apexcharts
	}

	const leftMenuNavItems = ref([
		{
			hideInMini: false,
			items: [
				{
					label: 'Посещения',
					route: '/grades',
					icon: 'mdi-book-open-page-variant',
					access: [RolesEnum.Student],
				},
				{
					label: 'Задания',
					route: '/lessons',
					icon: 'mdi-table',
					access: [RolesEnum.Student],
				},
				{
					label: 'Отчеты',
					route: '/report',
					icon: 'mdi-chart-bar',
					access: [RolesEnum.Tutor],
				},
				{
					label: 'Управление',
					route: '/admin',
					icon: 'mdi-cog',
					access: [RolesEnum.Admin],
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

	const checkAccessNav = nav => {
		if (!nav?.access) return true
		return nav.access.some(
			access =>
				userStore.roles.has(access) || userStore.roles.has(RolesEnum.Admin)
		)
	}

	const filteredLeftMenuNavItems = computed(() => {
		return leftMenuNavItems.value.map(block => {
			return {
				...block,
				items: block.items.filter(checkAccessNav),
			}
		})
	})

	const isHideLeftMenuDevBlock = ref(
		sessionStorage.getItem('isHideLeftMenuDevBlock') === 'true'
	)
	const setIsHideLeftMenuDevBlock = value => {
		isHideLeftMenuDevBlock.value = value
		sessionStorage.setItem('isHideLeftMenuDevBlock', value)
	}

	return {
		leftMenuMiniMode,
		setLeftMenuMiniMode,

		filteredLeftMenuNavItems,

		/* dev */
		isHideLeftMenuDevBlock,
		setIsHideLeftMenuDevBlock,
	}
})
