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
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useDisciplineStore } from '@stores/discipline'

import Api from '@services/Api'

interface IGradeRow {
	id: Key
	name: string
	values: {
		[key: string]: number
	}
}

export const useGradesStore = defineStore('grades', () => {
	const disciplineStore = useDisciplineStore()

	const gradeTableId: Ref<Key | null> = ref(null)
	const gradeTableIsNotExist = ref(false)

	const typesGrades = ref([])
	const grades: Ref<IGradeRow[]> = ref([])

	const isLoading = ref(false)
	const isShowSettings = ref(false)
	const setIsShowSettings = value => (isShowSettings.value = value)

	const setGrades = (data: IGradeRow[]) => {
		grades.value = data
	}

	const fetchGrades = async () => {
		if (
			!disciplineStore.selectedAup ||
			!disciplineStore.selectedDisciplineId ||
			!disciplineStore.selectedGroup?.title
		)
			return

		isLoading.value = true

		const data = await Api.getGrades(
			disciplineStore.selectedAup,
			disciplineStore.selectedDisciplineId,
			disciplineStore.selectedGroup.title
		)

		if (data.is_not_exist) {
			gradeTableIsNotExist.value = true
			isLoading.value = false
		} else {
			setGrades(data.rows)
			gradeTableId.value = data.gradeTableId

			gradeTableIsNotExist.value = false
			isLoading.value = false
		}
	}

	const updateGrade = async (value: number, topicId: Key, studentId: Key) => {
		if (gradeTableId.value === null) return

		const data = await Api.updateGrade(
			gradeTableId.value,
			value,
			topicId,
			studentId
		)

		const neededIndex = grades.value.findIndex(row => row.id === studentId)
		grades.value[neededIndex].values[topicId] = value
	}

	const createGradeTable = async () => {
		if (
			!disciplineStore.selectedAup ||
			!disciplineStore.selectedDisciplineId ||
			!disciplineStore.selectedGroup?.title
		)
			return

		const data = await Api.createGradeTable(
			disciplineStore.selectedAup,
			disciplineStore.selectedDisciplineId,
			disciplineStore.selectedGroup.title
		)

		gradeTableIsNotExist.value = false
		fetchGrades()
	}

	watch(
		() => disciplineStore.selectedGroup,
		(count, prevCount) => {
			fetchGrades()
		}
	)
	return {
		isShowSettings,
		setIsShowSettings,
		isLoading,

		gradeTableId,
		gradeTableIsNotExist,
		grades,
		fetchGrades,
		createGradeTable,
		updateGrade,
	}
})
