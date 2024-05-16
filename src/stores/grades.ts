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

	// Виды оценивания
	const typesGrade = ref([])
	const availableTypesGrade = computed(() =>
		typesGrade.value.filter(typeGrade => !typeGrade.archived)
	)
	const setTypesGrade = data => (typesGrade.value = data)

	const updateGradeType = async gradeType => {
		if (!gradeType) return

		const data = await Api.updateGradeType(gradeType)

		const indexToUpdate = typesGrade.value.findIndex(
			item => item.id === data.id
		)

		if (indexToUpdate === -1) return null

		typesGrade.value[indexToUpdate] = data

		if (gradeType.id === selectedTypeGrade.value.id) {
			setSelectedTypeGrade(availableTypesGrade.value[0])
		}
	}

	const createGradeType = async gradeTypeSettings => {
		if (!gradeTypeSettings) return

		const data: any = await Api.createGradeType(
			gradeTypeSettings,
			gradeTableId.value
		)

		typesGrade.value.push(data)
	}

	// Выбранный вид оценивания
	const selectedTypeGrade = ref(null)
	const setSelectedTypeGrade = value => (selectedTypeGrade.value = value)

	// Оценки
	const grades: Ref<IGradeRow[]> = ref([])
	const setGrades = (data: IGradeRow[]) => (grades.value = data)

	const columns = ref([])
	const setColumns = data => (columns.value = data)

	const setColumnsIdsBySelectedType = computed(() => {
		const set = new Set()

		columns.value.forEach(col => {
			if (selectedTypeGrade.value.id === col.grade_type_id) set.add(col.id)
		})

		return set
	})

	const filteredColumnsBySelectedType = computed(() => {
		return columns.value.filter(
			column => column.grade_type_id === selectedTypeGrade.value.id
		)
	})

	const showFullname = ref(true)
	const setShowFullname = data => (showFullname.value = data)

	const isShowSettings = ref(false)
	const setIsShowSettings = value => (isShowSettings.value = value)

	const isLoading = ref(false)

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
			setColumns(data.columns)

			setTypesGrade(data.gradeTypes)
			setSelectedTypeGrade(availableTypesGrade.value[0])

			gradeTableId.value = data.gradeTableId

			gradeTableIsNotExist.value = false
			isLoading.value = false
		}
	}

	const updateGrade = async (value: number, colId: Key, studentId: Key) => {
		if (gradeTableId.value === null) return

		const data = await Api.updateGrade(
			gradeTableId.value,
			value,
			colId,
			studentId
		)

		const neededIndex = grades.value.findIndex(row => row.id === studentId)
		grades.value[neededIndex].values[colId] = value
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
		setGrades,

		columns,
		setColumns,
		setColumnsIdsBySelectedType,
		filteredColumnsBySelectedType,

		typesGrade,
		availableTypesGrade,
		updateGradeType,
		createGradeType,

		selectedTypeGrade,
		setSelectedTypeGrade,

		showFullname,
		setShowFullname,

		fetchGrades,
		createGradeTable,
		updateGrade,
	}
})
