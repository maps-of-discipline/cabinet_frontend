<template>
	<div class="ReportRadialsBars">
		<div class="ReportBlock__title">Показатели по видам оценивания</div>

		<div class="ReportRadialsBars__chart" id="chart">
			<apexchart
				type="radialBar"
				height="350"
				:options="chartOptions"
				:series="series"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

import apexchart from 'vue3-apexcharts'

const series = ref([44, 55, 67])
const chartOptions = ref({
	chart: {
		height: 350,
		type: 'radialBar',
	},

	plotOptions: {
		radialBar: {
			dataLabels: {
				name: {
					fontSize: '1.2rem',
				},

				value: {
					fontSize: '1.2rem',
				},

				total: {
					show: true,
					label: 'Общее',
					formatter: () => {
						return (
							Math.floor(
								series.value.reduce((acc, value) => {
									return acc + value
								}, 0)
							) + '%'
						)
					},
				},
			},
		},
	},
	labels: ['Посещение', 'Задания', 'Активность'],
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.ReportRadialsBars {
	display: grid;
	grid-template-rows: auto 1fr;

	&__chart {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
