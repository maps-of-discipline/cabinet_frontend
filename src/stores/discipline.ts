import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'

import debounce from '@services/helpers/debounce'
import Api from '@services/Api'
import type { IStudyGroup } from '@models/lessons/IStudyGroup'

export const useDisciplineStore = defineStore('discipline', () => {
	const search: Ref<string> = ref('')

	const groups: Ref<IStudyGroup[]> = ref([])

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

	const editMode = ref(false)
	function switchMode() {
		editMode.value = !editMode.value
	}

	const selectedSemester: Ref<number | null> = ref(null)
	function setSemester(semestr: string) {
		selectedSemester.value = +semestr
	}

	const selectedGroup: Ref<IStudyGroup | null> = ref(null)
	function setGroup(group: IStudyGroup) {
		selectedGroup.value = group
	}

	const setStudyGroups = (data: IStudyGroup[]) => (groups.value = data)

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

		editMode,
		switchMode,
		selectedSemester,
		setSemester,
		selectedGroup,
		setGroup,

		groups,
		setStudyGroups,
	}
})
