import { ref, computed, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'

import Api from '@services/Api'

import { useDisciplineStore } from './discipline'

export const useReportStore = defineStore('report', () => {
	const disciplineStore = useDisciplineStore()

	const ratingChartItemsRaw = ref([])
	const ratingChartItems = computed(() => {
		return ratingChartItemsRaw.value.sort((a, b) => {
			const aValues = Object.values(a.categories)
				?.map(c => c.value)
				.reduce((c, d) => c + d, 0)
			const bValues = Object.values(b.categories)
				?.map(c => c.value)
				.reduce((c, d) => c + d, 0)

			return bValues - aValues
		})
	})
	const setRatingChartItems = value => {
		ratingChartItemsRaw.value = value
	}

	const isLoading = ref(true)

	const fetchReport = async () => {
		if (
			!disciplineStore.selectedAupId ||
			!disciplineStore.selectedDisciplineId ||
			!disciplineStore.selectedGroup?.title
		)
			return

		isLoading.value = true

		const data = await Api.getReport(
			disciplineStore.selectedAupId,
			disciplineStore.selectedDisciplineId,
			disciplineStore.selectedGroup.title
		)

		setRatingChartItems(Object.values(data.rating_chart))

		isLoading.value = false
	}

	return {
		ratingChartItems,
		fetchReport,
		isLoading,
		setRatingChartItems,
	}
})
