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

		const data: IGradeRow[] = await Api.getGrades(
			disciplineStore.selectedAup,
			disciplineStore.selectedDisciplineId,
			disciplineStore.selectedGroup.title
		)

		setGrades(data)

		isLoading.value = false
	}

	const updateGrade = async (value: number, topicId: Key, studentId: Key) => {
		const data = await Api.updateGrade(value, topicId, studentId)

		const neededIndex = grades.value.findIndex(row => row.id === studentId)
		grades.value[neededIndex].values[topicId] = value
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

		grades,
		fetchGrades,
		updateGrade,
		isLoading,
	}
})
