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

export const useLessonsStore = defineStore('lessons', () => {
	const lessons: Ref<ILesson[]> = ref([])
	const groups: Ref<IStudyGroup[]> = ref([])
	const controlTypes: Ref<ILessonControls> = ref([])

	const prefixLocalId = 'local_'

	const aup: Ref<Key | null> = ref(null)
	const disciplineId: Ref<Key | null> = ref(null)
	const rpdId: Ref<Key | null> = ref(null)
	const title: Ref<string> = ref('')

	const setLessonItems = (data: ILesson[]) => (lessons.value = data)
	const setStudyGroups = (data: IStudyGroup[]) => (groups.value = data)
	const setControlTypes = (data: ILessonControls) => (controlTypes.value = data)

	const semesters = computed(() => Object.keys(controlTypes.value))

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
	const createLocalLesson = (semester: number, study_group_id: number) => {
		if (!rpdId.value) return

		lessons.value.push({
			id: prefixLocalId + Date.now(),
			id_rpd: rpdId.value,
			id_type_control: null,
			chapter: '',
			task_link: '',
			task_link_name: '',
			completed_task_link: '',
			completed_task_link_name: '',
			topic: '',
			semester,
			study_group_id,
		})
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

	const fetchControlTypes = async id => {
		const data: IFetchLessonControls | null = await Api.fetchLessonControlTypes(
			id
		)

		if (!data) return []

		setControlTypes(data.control_types)
	}

	const fetchLessons = async (aupCode: Key, id: Key) => {
		const data: IFetchLessons | null = await Api.fetchLessons(aupCode, id)
		if (!data) return []

		setLessonItems(data.topics)
		setStudyGroups(data.groups)

		aup.value = aupCode
		disciplineId.value = id
		rpdId.value = data.rpd_id
		title.value = data.title

		await fetchControlTypes(data.rpd_id)

		return data.topics
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

	const selectedGroup: Ref<string | null> = ref(null)
	function setGroup(group: string) {
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

		setLessonItems,
		setStudyGroups,
		setControlTypes,

		semesters,

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
