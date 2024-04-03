import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import Api from '@services/Api'

export const useDisciplineStore = defineStore('discipline', () => {
	const search: Ref<string> = ref('')

	const aups: Ref<Array<any>> = ref([])

	const setSearch = async (value: string) => {
		search.value = value

		const data = await Api.fetchAupsBySearch(value)

		aups.value = data
	}

	const aupsDialogModel = ref(null)
	const setAupsDialogModel = value => (aupsDialogModel.value = value)

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

		selectedAup,
		setSelectedAup,

		aupsDialogModel,
		setAupsDialogModel,

		disciplineDialogModel,
		setDisciplineDialogModel,

		disciplinesDialogItems,
		fetchDisciplinesDialogItems,

		aups,
	}
})
