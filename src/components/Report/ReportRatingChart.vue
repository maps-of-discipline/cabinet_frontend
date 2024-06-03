<template>
	<div class="ReportRatingChart">
		<div class="ReportBlock__title">Рейтинг студентов</div>

		<div v-if="isLoading" class="ReportRatingChart__body">
			<ApLoadingSpinner />
		</div>

		<div
			v-else-if="reportStore.ratingChartItems.length"
			class="ReportRatingChart__chart"
		>
			<apexchart
				ref="chart"
				type="bar"
				:height="`${50 * reportStore.ratingChartItems.length + 100}px`"
				:options="chartOptions"
				:series="series"
			/>
		</div>

		<div v-else class="ReportRatingChart__body ReportRatingChart__empty">
			Данные отсутствуют
		</div>
	</div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted, onMounted } from 'vue'
import apexchart from 'vue3-apexcharts'

import { useReportStore } from '@stores/report'
import { useDisciplineStore } from '@stores/discipline'
import ApLoadingSpinner from '@components/ui/ApLoadingSpinner.vue'

const disciplineStore = useDisciplineStore()
const reportStore = useReportStore()

const chart = ref(null)

watch(
	() => reportStore.ratingChartItems,
	() => {
		chart.value?.updateOptions({
			xaxis: {
				categories: categories,
			},

			chart: {
				height: `${70 * reportStore.ratingChartItems.value.length}px`,
			},

			series: [
				{
					data: series.value,
				},
			],
		})
	}
)

const isLoading = computed(() => reportStore.isLoading)

const categories = computed(() => {
	return reportStore.ratingChartItems.map(student => student.name)
})

const mapOrderByName = computed(() => {
	const res = {}

	categories.value.forEach((name, index) => (res[name] = index + 1))

	return res
})

const series = computed(() => {
	const res = {}

	reportStore.ratingChartItems.forEach(student => {
		Object.values(student.categories).forEach(category => {
			if (res[category.name]) {
				res[category.name].data.push(category.value)
			} else {
				res[category.name] = {
					name: category.name,
					data: [category.value || 0],
				}
			}
		})
	})

	const resArr = Object.values(res)

	return resArr
})

const chartOptions = ref({
	chart: {
		type: 'bar',
		stacked: true,
		stackOnlyBar: true,
		height: `${50 * reportStore.ratingChartItems.length}px`,

		toolbar: {
			show: false,
		},

		zoom: {
			enabled: false,
		},
	},

	colors: [
		function ({ value, seriesIndex, dataPointIndex, w }) {
			return ['#A85FEC', '#EC5F6B', '#3CD288'][seriesIndex]
		},
	],

	plotOptions: {
		bar: {
			horizontal: true,
			barHeight: '60%',

			dataLabels: {
				total: {
					enabled: true,
					style: {
						fontSize: '.9rem',
						fontWeight: 600,
						color: '#fff',
					},
				},
			},
		},
	},

	stroke: {
		width: 0,
	},

	xaxis: {
		categories: categories,

		labels: {
			show: false,
			style: {
				fontSize: 'rem',
				fontFamily: 'inherit',
				fontWeight: 400,
				cssClass: 'asis-label',
			},
		},
	},

	yaxis: {
		title: {
			text: undefined,
		},

		opposite: true,

		labels: {
			show: true,
			minWidth: 200,
			maxWidth: 400,
			formatter: value => `${mapOrderByName.value[value]}. ${value}`,
			style: {
				fontSize: '16px',
				fontFamily: 'inherit',
				fontWeight: 400,
				colors: '#fff',
			},
		},
	},

	tooltip: {
		y: {
			formatter: val => ` ${val}`,
		},
	},

	legend: {
		show: false,
	},
})

watch(
	() => [disciplineStore.selectedGroup],
	() => {
		reportStore.fetchReport()
	}
)

onMounted(() => {
	reportStore.fetchReport()
})

onUnmounted(() => {
	chart.value?.updateOptions({
		xaxis: {
			categories: [],
		},
	})

	reportStore.setRatingChartItems([])
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.ReportRatingChart {
	display: grid;
	grid-template-rows: auto 1fr;

	&__chart {
		width: 100%;
		max-height: 500px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	&__body {
		padding-bottom: 12px;
		overflow: auto;
		min-height: 200px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rating-yasis-label {
		text-align: right;
	}

	.apexcharts-tooltip {
		background-color: $shade900 !important;
		color: #fff !important;
		border: none !important;
	}

	.apexcharts-tooltip-title {
		background-color: $shade1050 !important;
	}
}
</style>
