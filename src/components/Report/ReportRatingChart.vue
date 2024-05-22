<template>
	<div class="ReportRatingChart">
		<div class="ReportBlock__title">Рейтинг студентов</div>

		<div v-if="isLoading" class="ReportRatingChart__body">
			<ApLoadingSpinner />
		</div>

		<div v-else-if="students.length" class="ReportRatingChart__chart">
			<apexchart
				ref="chart"
				type="bar"
				:height="`${50 * students.length + 100}px`"
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
import { computed, ref, watch } from 'vue'
import apexchart from 'vue3-apexcharts'

import { useReportStore } from '@stores/report'
import ApLoadingSpinner from '@components/ui/ApLoadingSpinner.vue'

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
				height: `${70 * students.value.length}px`,
			},

			series: [
				{
					data: series.value,
				},
			],
		})
	}
)

const students = computed(() => {
	return reportStore.ratingChartItems
})

const isLoading = computed(() => reportStore.isLoading)

const categories = computed(() => {
	return students.value
		.sort((a, b) => {
			const aValues = a.categories.map(c => c.value).reduce((c, d) => c + d, 0)
			const bValues = b.categories.map(c => c.value).reduce((c, d) => c + d, 0)

			return bValues - aValues
		})
		.map(student => student.name)
})

const series = computed(() => {
	const res = {}

	students.value.forEach(student => {
		student.categories.forEach(category => {
			if (res[category.name]) {
				res[category.name].data.push(category.value)
			} else {
				res[category.name] = {
					name: category.name,
					data: [category.value],
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
		height: `${50 * students.value.length}px`,

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
					enabled: false,
					style: {
						fontSize: '13px',
						fontWeight: 900,
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
			show: true,
			style: {
				fontSize: '.9rem',
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

		labels: {
			show: true,
			style: {
				fontSize: '.9rem',
				fontFamily: 'inherit',
				fontWeight: 400,
				cssClass: 'rating-yasis-label asis-label',
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
