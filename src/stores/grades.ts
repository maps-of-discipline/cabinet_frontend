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
			setSelectedGradeType(
				availableTypesGrade.value.find(gt => gt.id == gradeType.id) ||
					availableTypesGrade.value[0]
			)
		}
	}

	const createGradeType = async gradeTypeSettings => {
		if (!gradeTypeSettings || !disciplineTableId.value) return

		const data: any = await Api.createGradeType(
			gradeTypeSettings,
			disciplineTableId.value
		)

		gradeTypes.value.push(data.grade_type)

		const columnsMap = {}
		data.columns.forEach(col => (columnsMap[col.id] = col))
		columnsById.value = { ...columnsById.value, ...columnsMap }
	}

	const deleteGradeType = async id => {
		try {
			const data: any = await Api.deleteGradeType(id)

			const indexToUpdate = gradeTypes.value.findIndex(item => item.id === id)
			if (indexToUpdate === -1) return null

			gradeTypes.value.splice(indexToUpdate, 1)

			if (id === selectedGradeType.value?.id) {
				setSelectedGradeType(availableTypesGrade.value[0])
			}
		} catch (e) {
			console.log(e)
		}
	}

	const selectedGradeType: Ref<IGradeType | null> = ref(null)
	const setSelectedGradeType = value => (selectedGradeType.value = value)

	const isAllGradeType = ref(false)
	const setIsAllGradeType = value => (isAllGradeType.value = value)

	// Оценки
	const grades: Ref<IGradeTableRow[]> = ref([])
	const setGrades = (data: IGradeTableRow[]) => (grades.value = data)

	const columnsById = ref({})
	const columns: Ref<IGradeColumn[]> = computed(() =>
		Object.values(columnsById.value)
	)

	const setColumns = data => {
		const columnsMap = {}

		data.forEach(col => (columnsMap[col.id] = col))

		columnsById.value = columnsMap
	}

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
		if (isAllGradeType.value)
			return [...columns.value].sort(
				(a: IGradeColumn, b: IGradeColumn) => +a.topic.id - +b.topic.id
			)

		return [...columns.value]
			.filter(column => column.grade_type_id === selectedGradeType.value?.id)
			.sort((a: IGradeColumn, b: IGradeColumn) => +a.topic.id - +b.topic.id)
	})

	const columnsByGradeTypeId = computed(() => {
		const map = {}

		const sortedColumns = [...columns.value].sort(
			(a: IGradeColumn, b: IGradeColumn) => +a.topic.id - +b.topic.id
		)

		sortedColumns.forEach((col, index) => {
			if (!map[col.grade_type_id]) map[col.grade_type_id] = []
			map[col.grade_type_id].push({ ...col, index })
		})

		return map
	})

	const filteredColumnsByGradeTypeId = computed(() => {
		const map = {}

		const sortedColumns = [...columns.value].sort(
			(a: IGradeColumn, b: IGradeColumn) => +a.topic.id - +b.topic.id
		)

		sortedColumns.forEach((col, index) => {
			if (col.hidden) return

			if (!map[col.grade_type_id]) map[col.grade_type_id] = []
			map[col.grade_type_id].push({ ...col, index })
		})

		return map
	})

	const visibleColumnsByGradeTypeId = computed(() => {
		const map = {}

		for (const gradeTypeId in columnsByGradeTypeId.value) {
			const filteredCols = columnsByGradeTypeId.value[gradeTypeId].filter(
				col => !col.hidden
			)

			map[gradeTypeId] = filteredCols
		}

		return map
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

	const updateVisibleColumns = async (
		gradeTypeId: Key,
		visibleIds: Key[],
		hiddenIds: Key[]
	) => {
		const newCols = await Api.updateVisibleColumns(
			gradeTypeId,
			visibleIds,
			hiddenIds
		)

		console.log(newCols)

		newCols.forEach(col => {
			columnsById.value[col.id] = col
		})
	}

	/* filters */
	const filters: Ref<IGradeTableFilters[]> = ref([
		{ label: 'Скрыть пустые столбцы', name: 'hideEmptyCols' },
		{ label: 'Отображать ближайшие столбцы', name: 'recentCols' },
	])

	const selectedFilters: Ref<IGradeTableFilters[]> = ref([])
	const setSelectedFilters = filters => (selectedFilters.value = filters)

	const isHideEmptyCols = computed(() =>
		selectedFilters.value.some(filter => filter.name === 'hideEmptyCols')
	)

	const isRecentCols = computed(() =>
		selectedFilters.value.some(filter => filter.name === 'recentCols')
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

		columnsById,
		columns,
		setColumns,
		setColumnsIdsBySelectedType,
		filteredColumnsBySelectedType,
		columnsByGradeTypeId,
		visibleColumnsByGradeTypeId,
		filteredColumnsByGradeTypeId,

		gradeTypes,
		availableTypesGrade,
		updateGradeType,
		updateVisibleColumns,
		deleteGradeType,
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
		isRecentCols,

		/* column filters */
		setSelectedColumnFilters,
	}
})
