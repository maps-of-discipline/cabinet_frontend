import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import debounce from '@services/helpers/debounce'
import Api from '@services/Api'
import type { IStudyGroup } from '@models/lessons/IStudyGroup'

export const useDisciplineStore = defineStore('discipline', () => {
	const aups: Ref<Array<any>> = ref([])
	const isLoadingAups: Ref<boolean> = ref(false)

	/* Выбранный АУП */
	const selectedAup: Ref<string | null> = ref(
		sessionStorage.getItem('selectedAup')
	)
	const setSelectedAup = (value: string) => {
		selectedAup.value = value
		sessionStorage.setItem('selectedAup', value)
	}

	/* Выбранная дисциплина */
	const selectedDisciplineId: Ref<string | null> = ref(
		sessionStorage.getItem('selectedDisciplineId')
	)
	const setSelectedDisciplineId = (value: string) => {
		selectedDisciplineId.value = value
		sessionStorage.setItem('selectedDisciplineId', value)
	}

	const hasSelectedDiscipline = computed(() => !!selectedDisciplineId.value)

	/*  */

	/* Выбор группы */
	const selectedGroup: Ref<IStudyGroup | null> = ref(null)
	const setSelectedGroup = (group: IStudyGroup) => {
		selectedGroup.value = group
	}

	const groups: Ref<IStudyGroup[]> = ref([])
	const setStudyGroups = (data: IStudyGroup[]) => {
		groups.value = data
	}
	/*  */

	/* Семестры */
	const semesters: Ref<string[]> = ref([])
	const setSemesters = (value: string[]) => (semesters.value = value)

	const selectedSemester: Ref<number | null> = ref(null)
	const setSelectedSemester = (semestr: string) => {
		selectedSemester.value = +semestr
	}
	/*  */

	/* Поиск */
	const search: Ref<string> = ref('')
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
	/*  */

	/* Модалки */
	const directionDialogModel = ref(false)
	const setDirectionDialogModel = value => (directionDialogModel.value = value)

	const disciplineDialogModel = ref(false)
	const setDisciplineDialogModel = value =>
		(disciplineDialogModel.value = value)

	const disciplinesDialogItems: Ref<Array<any>> = ref([])

	const fetchDisciplinesDialogItems = async (aup: string) => {
		const data = await Api.fetchDisciplinesByAup(aup)
		disciplinesDialogItems.value = data
	}
	/*  */

	/* Режим просмотра/редактирования */
	const editMode = ref(false)
	const switchMode = () => (editMode.value = !editMode.value)

	/* new */
	const isOpenDisciplineColumn = ref(true)
	const setIsOpenDisciplineColumn = async value => {
		isOpenDisciplineColumn.value = value
		await fetchDisciplines()
	}

	const disciplinesByAup = ref({})
	const disciplinesBySemester = computed(() => {
		if (!selectedSemester.value) return []

		return disciplinesByAup.value[selectedSemester.value]
	})

	const fetchDisciplines = async () => {
		if (!selectedAup.value) return

		const data = await Api.fetchDisciplines(selectedAup.value)
		disciplinesByAup.value = data
		setSemesters(Object.keys(data))
	}

	return {
		search,
		setSearch,

		selectedDisciplineId,
		setSelectedDisciplineId,
		hasSelectedDiscipline,

		aups,
		selectedAup,
		setSelectedAup,
		isLoadingAups,

		directionDialogModel,
		setDirectionDialogModel,

		disciplineDialogModel,
		setDisciplineDialogModel,

		disciplinesDialogItems,
		fetchDisciplinesDialogItems,

		editMode,
		switchMode,

		semesters,
		selectedSemester,
		setSelectedSemester,

		selectedGroup,
		setSelectedGroup,

		groups,
		setStudyGroups,

		/* new */
		isOpenDisciplineColumn,
		setIsOpenDisciplineColumn,

		disciplinesBySemester,

		fetchDisciplines,
	}
})
