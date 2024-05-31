import type { Key } from '@models/Key'
import type { IFetchLessons } from '@models/lessons/IFetchLessons'
import type { ILesson } from '@models/lessons/ILesson'
import type { IControlType } from '@models/lessons/IFetchLessonControls'
import type { IStudyGroup } from '@models/lessons/IStudyGroup'
import ViewModesEnum from '@models/lessons/ViewModesEnum'

import type { Ref } from 'vue'
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useDisciplineStore } from './discipline'

import Api from '@services/Api'
import generateEmptyLesson from '@services/helpers/lessons/generateEmptyLesson'

export const useLessonsStore = defineStore('lessons', () => {
	const disciplineStore = useDisciplineStore()

	const prefixLocalId = 'local_'

	const disciplineTableId: Ref<Key | null> = ref(null)

	/* Строки занятий */
	const lessons: Ref<ILesson[]> = ref([])
	const setLessonItems = (data: ILesson[]) => (lessons.value = data)

	/* Нагрузки */
	const controlTypes: Ref<IControlType[]> = ref([])
	const setControlTypes = (data: IControlType[]) => (controlTypes.value = data)

	/* Места */
	const places = ref([])
	const setPlaces = data => (places.value = data)

	/* Флаги загрузки */
	const isLoadingLessons: Ref<boolean> = ref(false)
	const isLoadingControlTypes: Ref<boolean> = ref(false)

	const filteredLessons = computed(() => {
		return lessons.value
	})

	const rowsCount = computed(() => filteredLessons.value?.length)

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
			disciplineTableId.value === null
		)
			return

		const lesson = generateEmptyLesson(
			prefixLocalId,
			disciplineStore.selectedGroup.id,
			disciplineTableId.value
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

	const fetchLessons = async () => {
		if (
			!disciplineStore.selectedAupId ||
			!disciplineStore.selectedDisciplineId ||
			!disciplineStore.selectedGroup ||
			!disciplineStore.selectedSemester
		)
			return

		let data = null
		try {
			isLoadingLessons.value = true
			data = await Api.fetchLessons(
				disciplineStore.selectedAupId,
				disciplineStore.selectedDisciplineId,
				disciplineStore.selectedGroup?.title,
				disciplineStore.selectedSemester
			)

			if (!data) return []

			setLessonItems(data.topics)
			setPlaces(data.places)
			setControlTypes(data.control_types)

			disciplineTableId.value = data.discipline_table_id
		} catch (e) {
			console.log(e)
		} finally {
			isLoadingLessons.value = false
		}

		return data?.topics || []
	}

	const viewMode: Ref<ViewModesEnum> = ref(ViewModesEnum.Simple)
	const setViewMode = (mode: ViewModesEnum) => {
		viewMode.value = mode
	}

	const loadViewMode = ref(false)
	const switchLoadViewMode = () => (loadViewMode.value = !loadViewMode.value)

	const bells = ref([])
	const fetchBells = async () => {
		const data = await Api.getBells()

		if (!data) return []

		bells.value = data

		return data
	}

	/* filters */
	const defaultShowColFilters = [
		{ label: 'Место', name: 'place' },
		{ label: 'Дата', name: 'date' },
		{ label: 'Время', name: 'time' },
		{ label: 'Вид', name: 'control' },
		{ label: 'Глава', name: 'chapter' },
		{ label: 'Задание', name: 'task' },
		{ label: 'Загрузка задания', name: 'completedTask' },
		{ label: 'Срок выполнения', name: 'dateFinish' },
		{ label: 'Примечание', name: 'note' },
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

		disciplineTableId,

		isLoadingLessons,
		isLoadingControlTypes,

		setLessonItems,
		setControlTypes,

		filteredLessons,
		rowsCount,

		getSumLoadByControlType,

		createLesson,
		editLesson,
		deleteLesson,

		createLocalLesson,
		editLocalLesson,
		deleteLocalLesson,

		isLocalLesson,

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
