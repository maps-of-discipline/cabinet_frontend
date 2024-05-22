<template>
	<div class="ReportAreaByGradeType">
		<div class="ReportBlock__title">
			<span>Показатели по видам оценивания </span>

			<Button label="Выбрать вид оценивания" />
		</div>

		<div class="ReportAreaByGradeType__chart-wrapper">
			<apexchart
				type="area"
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

const series = ref([
	{
		name: 'Посещение',
		data: [31, 40, 28, 51, 42, 109, 100],
	},
])

const chartOptions = ref({
	chart: {
		height: 350,
		type: 'area',

		toolbar: {
			show: false,
		},

		zoom: {
			enabled: false,
		},
	},

	dataLabels: {
		enabled: false,
	},

	stroke: {
		curve: 'smooth',
	},

	legend: {
		show: false,
	},

	xaxis: {
		type: 'datetime',
		categories: [
			'2018-09-19T00:00:00.000Z',
			'2018-09-19T01:30:00.000Z',
			'2018-09-19T02:30:00.000Z',
			'2018-09-19T03:30:00.000Z',
			'2018-09-19T04:30:00.000Z',
			'2018-09-19T05:30:00.000Z',
			'2018-09-19T06:30:00.000Z',
		],

		labels: {
			show: true,
			style: {
				fontSize: '.9rem',
				fontFamily: 'inherit',
				fontWeight: 400,
				cssClass: 'asis-label ',
			},
		},

		tooltip: {
			enabled: false,
		},
	},

	yaxis: {
		labels: {
			show: true,
			style: {
				fontSize: '.9rem',
				fontFamily: 'inherit',
				fontWeight: 400,
				cssClass: 'asis-label ',
			},
		},
	},

	tooltip: {
		style: {
			fontSize: '1rem',
			fontFamily: 'inherit',
			backgroundColor: '#000',
		},

		x: {
			show: true,
			format: 'dd MMM',
			formatter: undefined,
		},
		y: {
			show: false,
			formatter: undefined,
			title: {
				formatter: seriesName => seriesName,
			},
		},

		marker: {
			show: false,
		},
	},
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.ReportAreaByGradeType {
	display: grid;
	grid-template-rows: auto 1fr;

	&__chart-wrapper {
		padding: 0 16px;
	}

	.asis-label {
		tspan {
			fill: #fff;
		}
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
