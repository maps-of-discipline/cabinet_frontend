import type { Key } from '@models/Key'
import type { IFetchLessons } from '@models/lessons/IFetchLessons'
import type { ILesson } from '@models/lessons/ILesson'
import type {
	IFetchLessonControls,
	ILessonControls,
} from '@models/lessons/IFetchLessonControls'
import type { IStudyGroup } from '@models/lessons/IStudyGroup'
import ViewModesEnum from '@models/lessons/ViewModesEnum'

import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDisciplineStore } from './discipline'

import Api from '@services/Api'
import generateEmptyLesson from '@services/helpers/lessons/generateEmptyLesson'

export const useLessonsStore = defineStore('lessons', () => {
	const disciplineStore = useDisciplineStore()

	const lessons: Ref<ILesson[]> = ref([])
	const controlTypes: Ref<ILessonControls> = ref([])

	const prefixLocalId = 'local_'

	const aup: Ref<Key | null> = ref(null)
	const disciplineId: Ref<Key | null> = ref(null)
	const rpdId: Ref<Key | null> = ref(null)
	const title: Ref<string> = ref('')

	const places = ref([])
	const setPlaces = data => (places.value = data)

	const isLoadingLessons: Ref<boolean> = ref(false)
	const isLoadingControlTypes: Ref<boolean> = ref(false)

	const setLessonItems = (data: ILesson[]) => (lessons.value = data)
	const setControlTypes = (data: ILessonControls) => (controlTypes.value = data)

	const semesters = computed(() => Object.keys(controlTypes.value))

	const filteredLessons = computed(() => {
		if (
			disciplineStore.selectedGroup === null ||
			disciplineStore.selectedSemester === null
		)
			return []

		const semester: number = disciplineStore.selectedSemester
		const group: IStudyGroup = disciplineStore.selectedGroup

		return lessons.value.filter(
			lesson =>
				lesson.semester === semester && lesson.study_group_id === group.id
		)
	})

	const rowsCount = computed(() => filteredLessons.value?.length)

	const controlTypesBySemester = computed(() => {
		if (disciplineStore.selectedSemester === null) return []

		return controlTypes.value[disciplineStore.selectedSemester]
	})

	const getSumLoadByControlType = id => {
		return lessons.value.reduce((acc, value) => {
			if (id === value.id_type_control) return acc + 2
			return acc
		}, 0)
	}

	/* Fetching */
	const createLesson = async (lesson: ILesson) => {
		if (!isLocalLesson(lesson.id)) return null

		const createdLesson: ILesson | null = await Api.createLesson(lesson)
		if (!createdLesson) return null

		return editLocalLesson(lesson.id, createdLesson)
	}

	const editLesson = async (lesson: ILesson) => {
		if (isLocalLesson(lesson.id)) return await createLesson(lesson)

		const editedLesson: ILesson | null = await Api.editLesson(lesson)
		if (!editedLesson) return null

		return editLocalLesson(lesson.id, editedLesson)
	}

	const deleteLesson = async (id: Key) => {
		if (!id) return null

		if (isLocalLesson(id)) return deleteLocalLesson(id)

		const data: ILesson | null = await Api.deleteLesson(id)
		if (data) {
			return deleteLocalLesson(id)
		} else {
			return null
		}
	}

	/* Local */
	const createLocalLesson = () => {
		if (
			!disciplineStore.selectedSemester ||
			!disciplineStore.selectedGroup ||
			rpdId.value === null
		)
			return

		const lesson = generateEmptyLesson(
			prefixLocalId,
			disciplineStore.selectedSemester,
			disciplineStore.selectedGroup.id,
			rpdId.value
		)

		lessons.value.push(lesson)
	}

	const editLocalLesson = (id: Key, newLesson: ILesson) => {
		const indexToUpdate = lessons.value.findIndex(item => item.id === id)
		if (indexToUpdate === -1) return null

		lessons.value[indexToUpdate] = newLesson

		return newLesson
	}

	const deleteLocalLesson = (id: Key) => {
		lessons.value = lessons.value.filter(item => item.id !== id)
	}

	const isLocalLesson = (id: Key) => `${id}`.startsWith(prefixLocalId)

	const fetchLessons = async (aupCode: Key, id: Key) => {
		let data: IFetchLessons | null = null

		try {
			isLoadingLessons.value = true
			data = await Api.fetchLessons(aupCode, id)

			if (!data) return []

			setLessonItems(data.topics)
			setPlaces(data.places)
			disciplineStore.setStudyGroups(data.groups)

			aup.value = aupCode
			disciplineId.value = id
			rpdId.value = data.rpd_id
			title.value = data.title

			await fetchControlTypes(data.rpd_id)

			disciplineStore.setSelectedGroup(disciplineStore.groups[0])
			disciplineStore.setSelectedSemester(semesters.value[0])
		} catch (e) {
			console.log(e)
		} finally {
			isLoadingLessons.value = false
		}

		return data?.topics || []
	}

	const fetchControlTypes = async id => {
		isLoadingControlTypes.value = true
		const data: IFetchLessonControls | null = await Api.fetchLessonControlTypes(
			id
		)
		isLoadingControlTypes.value = false

		if (!data) return []

		setControlTypes(data.control_types)
	}

	const viewMode: Ref<ViewModesEnum> = ref(ViewModesEnum.Simple)
	const setViewMode = (mode: ViewModesEnum) => {
		viewMode.value = mode
	}

	const loadViewMode = ref(false)
	function switchLoadViewMode() {
		loadViewMode.value = !loadViewMode.value
	}

	const bells = ref([])
	const fetchBells = async () => {
		const data = await Api.getBells()

		if (!data) return []

		bells.value = data

		return data
	}

	/* filters */

	const defaultShowColFilters = [
		{ label: 'Дата', name: 'date' },
		{ label: 'Время', name: 'time' },
		{ label: 'Вид', name: 'control' },
		{ label: 'Глава', name: 'chapter' },
		{ label: 'Задание', name: 'task' },
		{ label: 'Загрузка задания', name: 'completedTask' },
		{ label: 'Срок выполнения', name: 'dateFinish' },
	]

	const showColFilters = ref(defaultShowColFilters)

	const selectedShowColFilters = ref(
		localStorage.getItem('lessonsFilters')
			? JSON.parse(localStorage.getItem('lessonsFilters') || '[]')
			: defaultShowColFilters
	)
	const selectedShowColFiltersSet = computed(
		() => new Set(selectedShowColFilters.value.map(filter => filter.name))
	)

	const setSelectedShowColFilters = filters => {
		selectedShowColFilters.value = filters
		localStorage.setItem('lessonsFilters', JSON.stringify(filters))
	}

	return {
		lessons,
		controlTypes,
		aup,
		disciplineId,
		rpdId,
		title,

		isLoadingLessons,
		isLoadingControlTypes,

		setLessonItems,
		setControlTypes,

		semesters,
		filteredLessons,
		rowsCount,
		controlTypesBySemester,

		getSumLoadByControlType,

		createLesson,
		editLesson,
		deleteLesson,

		createLocalLesson,
		editLocalLesson,
		deleteLocalLesson,

		isLocalLesson,

		fetchControlTypes,
		fetchLessons,

		/*  */

		viewMode,
		setViewMode,
		loadViewMode,
		switchLoadViewMode,

		bells,
		fetchBells,
		places,

		/* filters */
		showColFilters,
		selectedShowColFilters,
		selectedShowColFiltersSet,
		setSelectedShowColFilters,
	}
})
