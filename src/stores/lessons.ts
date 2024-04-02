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

import Api from '@services/Api'
import generateEmptyLesson from '@services/helpers/lessons/generateEmptyLesson'

export const useLessonsStore = defineStore('lessons', () => {
	const lessons: Ref<ILesson[]> = ref([])
	const groups: Ref<IStudyGroup[]> = ref([])
	const controlTypes: Ref<ILessonControls> = ref([])

	const prefixLocalId = 'local_'

	const aup: Ref<Key | null> = ref(null)
	const disciplineId: Ref<Key | null> = ref(null)
	const rpdId: Ref<Key | null> = ref(null)
	const title: Ref<string> = ref('')

	const isLoadingLessons: Ref<boolean> = ref(false)
	const isLoadingControlTypes: Ref<boolean> = ref(false)

	const setLessonItems = (data: ILesson[]) => (lessons.value = data)
	const setStudyGroups = (data: IStudyGroup[]) => (groups.value = data)
	const setControlTypes = (data: ILessonControls) => (controlTypes.value = data)

	const semesters = computed(() => Object.keys(controlTypes.value))

	const filteredLessons = computed(() => {
		if (selectedGroup.value === null || selectedSemester.value === null) return

		const semester: number = selectedSemester.value
		const group: IStudyGroup = selectedGroup.value

		return lessons.value.filter(
			lesson =>
				lesson.semester === semester && lesson.study_group_id === group.id
		)
	})

	const rowsCount = computed(() => filteredLessons.value?.length)

	const controlTypesBySemester = computed(() => {
		if (selectedSemester.value === null) return []

		return controlTypes.value[selectedSemester.value]
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
		if (!selectedSemester.value || !selectedGroup.value || rpdId.value === null)
			return

		const lesson = generateEmptyLesson(
			prefixLocalId,
			selectedSemester.value,
			selectedGroup.value.id,
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
		isLoadingLessons.value = true
		const data: IFetchLessons | null = await Api.fetchLessons(aupCode, id)

		if (!data) return []

		setLessonItems(data.topics)
		setStudyGroups(data.groups)

		aup.value = aupCode
		disciplineId.value = id
		rpdId.value = data.rpd_id
		title.value = data.title

		await fetchControlTypes(data.rpd_id)

		setGroup(groups.value[0])
		setSemester(semesters.value[0])

		isLoadingLessons.value = false

		return data.topics
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

	// other
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

	const viewMode: Ref<ViewModesEnum> = ref(ViewModesEnum.Simple)
	const setViewMode = (mode: ViewModesEnum) => {
		viewMode.value = mode
	}

	const loadViewMode = ref(false)
	function switchLoadViewMode() {
		loadViewMode.value = !loadViewMode.value
	}

	return {
		lessons,
		groups,
		controlTypes,
		aup,
		disciplineId,
		rpdId,
		title,

		isLoadingLessons,
		isLoadingControlTypes,

		setLessonItems,
		setStudyGroups,
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
		editMode,
		switchMode,
		selectedSemester,
		setSemester,
		viewMode,
		setViewMode,
		loadViewMode,
		switchLoadViewMode,
		selectedGroup,
		setGroup,
	}
})
