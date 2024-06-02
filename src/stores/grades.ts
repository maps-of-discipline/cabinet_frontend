import type { Key } from '@models/Key'

import type { IGradeColumn } from '@models/grades/IGradeColumn'
import type { IGradeTableRow } from '@models/grades/IGradeTableRow'
import type { IGradeType } from '@models/grades/IGradeType'
import type { IGradeTableFilters } from '@models/grades/IGradeTableFilters'

import type { Ref } from 'vue'
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useDisciplineStore } from '@stores/discipline'

import Api from '@services/Api'

export const useGradesStore = defineStore('grades', () => {
	const disciplineStore = useDisciplineStore()

	const disciplineTableId: Ref<Key | null> = ref(null)
	const gradeTableIsNotExist = ref(false)

	// Виды оценивания
	const gradeTypes: Ref<IGradeType[]> = ref([])
	const availableTypesGrade = computed(() =>
		gradeTypes.value.filter(gradeType => !gradeType.archived)
	)
	const setTypesGrade = data => (gradeTypes.value = data)

	const updateGradeType = async gradeType => {
		if (!gradeType) return

		const data = await Api.updateGradeType(gradeType)

		const indexToUpdate = gradeTypes.value.findIndex(
			item => item.id === data.id
		)

		if (indexToUpdate === -1) return null

		gradeTypes.value[indexToUpdate] = data

		if (gradeType.id === selectedGradeType.value?.id) {
			setSelectedGradeType(availableTypesGrade.value[0])
		}
	}

	const createGradeType = async gradeTypeSettings => {
		if (!gradeTypeSettings || !disciplineTableId.value) return

		const data: any = await Api.createGradeType(
			gradeTypeSettings,
			disciplineTableId.value
		)

		gradeTypes.value.push(data)
	}

	// Выбранный вид оценивания
	const selectedGradeType: Ref<IGradeType | null> = ref(null)
	const setSelectedGradeType = value => (selectedGradeType.value = value)

	const isAllGradeType = ref(false)
	const setIsAllGradeType = value => (isAllGradeType.value = value)

	// Оценки
	const grades: Ref<IGradeTableRow[]> = ref([])
	const setGrades = (data: IGradeTableRow[]) => (grades.value = data)

	const columns: Ref<IGradeColumn[]> = ref([])
	const setColumns = data => (columns.value = data)

	const setColumnsIdsBySelectedType = computed(() => {
		const set = new Set()

		columns.value.forEach(col => {
			if (
				isAllGradeType.value ||
				selectedGradeType.value?.id === col.grade_type_id
			)
				set.add(col.id)
		})

		return set
	})

	const filteredColumnsBySelectedType = computed(() => {
		if (isAllGradeType.value) return columns

		return [...columns.value]
			.filter(column => column.grade_type_id === selectedGradeType.value?.id)
			.sort((a: IGradeColumn, b: IGradeColumn) => +a.topic.id - +b.topic.id)
	})

	const showFullname = ref(true)
	const setShowFullname = data => (showFullname.value = data)

	const isShowSettings = ref(false)
	const setIsShowSettings = value => (isShowSettings.value = value)

	const isLoading = ref(false)

	const fetchGrades = async () => {
		if (
			!disciplineStore.selectedAupId ||
			!disciplineStore.selectedDisciplineId ||
			!disciplineStore.selectedGroup?.title ||
			!disciplineStore.selectedSemester
		)
			return

		isLoading.value = true

		const data = await Api.getGrades(
			disciplineStore.selectedAupId,
			disciplineStore.selectedDisciplineId,
			disciplineStore.selectedGroup.title,
			disciplineStore.selectedSemester
		)

		if (data.is_not_exist) {
			gradeTableIsNotExist.value = true
			isLoading.value = false
		} else {
			setGrades(data.rows)
			setColumns(data.columns)

			setTypesGrade(data.gradeTypes)
			setSelectedGradeType(availableTypesGrade.value[0])

			disciplineTableId.value = data.disciplineTableId

			gradeTableIsNotExist.value = false
			isLoading.value = false
		}
	}

	const updateGrade = async (value: number, colId: Key, studentId: Key) => {
		if (disciplineTableId.value === null) return

		const data = await Api.updateGrade(
			disciplineTableId.value,
			value,
			colId,
			studentId
		)

		const neededIndex = grades.value.findIndex(row => row.id === studentId)
		grades.value[neededIndex].values[colId] = value
	}

	/* filters */
	const filters: Ref<IGradeTableFilters[]> = ref([
		{ label: 'Скрыть пустые столбцы', name: 'hideEmptyCols' },
	])

	const selectedFilters: Ref<IGradeTableFilters[]> = ref([])
	const setSelectedFilters = filters => (selectedFilters.value = filters)

	const isHideEmptyCols = computed(() =>
		selectedFilters.value.some(filter => filter.name === 'hideEmptyCols')
	)

	/* column filters */

	const setSelectedColumnFilters = filters => {
		console.log(filters)
	}

	return {
		isShowSettings,
		setIsShowSettings,
		isLoading,

		disciplineTableId,
		gradeTableIsNotExist,

		grades,
		setGrades,

		columns,
		setColumns,
		setColumnsIdsBySelectedType,
		filteredColumnsBySelectedType,

		gradeTypes,
		availableTypesGrade,
		updateGradeType,
		createGradeType,

		selectedGradeType,
		setSelectedGradeType,

		isAllGradeType,
		setIsAllGradeType,

		showFullname,
		setShowFullname,

		fetchGrades,
		updateGrade,

		/* filters */
		filters,
		selectedFilters,
		setSelectedFilters,

		isHideEmptyCols,

		/* column filters */
		setSelectedColumnFilters,
	}
})
