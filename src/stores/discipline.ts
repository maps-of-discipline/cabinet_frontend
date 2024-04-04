import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'

import debounce from '@services/helpers/debounce'
import Api from '@services/Api'

export const useDisciplineStore = defineStore('discipline', () => {
	const search: Ref<string> = ref('')

	const aups: Ref<Array<any>> = ref([])
	const isLoadingAups: Ref<boolean> = ref(false)

	const setSearch = async (value: string) => {
		search.value = value

		if (value.length < 3) {
			isLoadingAups.value = false
			aups.value = []
			return
		}

		fetchAupsBySearch(value)
	}

	const fetchAupsBySearch = debounce(async value => {
		isLoadingAups.value = true
		const data = await Api.fetchAupsBySearch(value)
		aups.value = data
		isLoadingAups.value = false
	}, 500)

	const dialogModel = ref(null)
	const setDialogModel = value => (dialogModel.value = value)

	const selectedAup = ref(false)
	const setSelectedAup = value => (selectedAup.value = value)

	const disciplineDialogModel = ref(false)
	const setDisciplineDialogModel = value =>
		(disciplineDialogModel.value = value)

	const disciplinesDialogItems: Ref<Array<any>> = ref([])

	const fetchDisciplinesDialogItems = async (aup: string) => {
		const data = await Api.fetchDisciplinesByAup(aup)
		disciplinesDialogItems.value = data
	}

	return {
		search,
		setSearch,

		aups,
		selectedAup,
		setSelectedAup,
		isLoadingAups,

		dialogModel,
		setDialogModel,

		disciplineDialogModel,
		setDisciplineDialogModel,

		disciplinesDialogItems,
		fetchDisciplinesDialogItems,
	}
})
