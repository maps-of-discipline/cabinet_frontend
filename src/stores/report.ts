import { ref, computed, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'

import Api from '@services/Api'

import { useDisciplineStore } from './discipline'

export const useReportStore = defineStore('report', () => {
	const disciplineStore = useDisciplineStore()

	const ratingChartItems = ref([])
	const setRatingChartItems = value => {
		ratingChartItems.value = value
	}

	const isLoading = ref(false)

	const fetchReport = async () => {
		if (
			!disciplineStore.selectedAup ||
			!disciplineStore.selectedDisciplineId ||
			!disciplineStore.selectedGroup?.title
		)
			return

		isLoading.value = true

		const data = await Api.getReport(
			disciplineStore.selectedAup,
			disciplineStore.selectedDisciplineId,
			disciplineStore.selectedGroup.title
		)

		setRatingChartItems(Object.values(data.rating_chart))

		isLoading.value = false
	}

	watch(
		() => [disciplineStore.selectedGroup, disciplineStore.selectedSemester],
		() => {
			fetchReport()
		}
	)

	return {
		ratingChartItems,
		fetchReport,
		isLoading,
	}
})
