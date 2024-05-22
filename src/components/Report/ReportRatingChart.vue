<template>
	<div class="ReportRatingChart">
		<div class="ReportBlock__title">Рейтинг студентов</div>

		<div class="ReportRatingChart__chart">
			<apexchart
				type="bar"
				height="auto"
				:options="chartOptions"
				:series="series"
			/>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import apexchart from 'vue3-apexcharts'

const students = ref([
	{
		name: 'Шеховцов Всеволод Антонович',
		categories: [
			{
				name: 'Посещение',
				value: 44,
			},
			{
				name: 'Активность',
				value: 53,
			},
			{
				name: 'Задания',
				value: 12,
			},
		],
	},

	{
		name: 'Захаров Никита Сергеевич',
		categories: [
			{
				name: 'Посещение',
				value: 13,
			},
			{
				name: 'Активность',
				value: 22,
			},
			{
				name: 'Задания',
				value: 33,
			},
		],
	},

	{
		name: 'Иванов Денис Олегович',
		categories: [
			{
				name: 'Посещение',
				value: 55,
			},
			{
				name: 'Активность',
				value: 32,
			},
			{
				name: 'Задания',
				value: 17,
			},
		],
	},

	{
		name: 'Панин Максим Иванович',
		categories: [
			{
				name: 'Посещение',
				value: 55,
			},
			{
				name: 'Активность',
				value: 44,
			},
			{
				name: 'Задания',
				value: 23,
			},
		],
	},

	{
		name: 'Иванов Денис Олегович',
		categories: [
			{
				name: 'Посещение',
				value: 55,
			},
			{
				name: 'Активность',
				value: 32,
			},
			{
				name: 'Задания',
				value: 17,
			},
		],
	},

	{
		name: 'Панин Максим Иванович',
		categories: [
			{
				name: 'Посещение',
				value: 55,
			},
			{
				name: 'Активность',
				value: 44,
			},
			{
				name: 'Задания',
				value: 23,
			},
		],
	},

	{
		name: 'Иванов Денис Олегович',
		categories: [
			{
				name: 'Посещение',
				value: 55,
			},
			{
				name: 'Активность',
				value: 32,
			},
			{
				name: 'Задания',
				value: 17,
			},
		],
	},

	{
		name: 'Панин Максим Иванович',
		categories: [
			{
				name: 'Посещение',
				value: 55,
			},
			{
				name: 'Активность',
				value: 44,
			},
			{
				name: 'Задания',
				value: 23,
			},
		],
	},

	{
		name: 'Иванов Денис Олегович',
		categories: [
			{
				name: 'Посещение',
				value: 55,
			},
			{
				name: 'Активность',
				value: 32,
			},
			{
				name: 'Задания',
				value: 17,
			},
		],
	},

	{
		name: 'Панин Максим Иванович',
		categories: [
			{
				name: 'Посещение',
				value: 55,
			},
			{
				name: 'Активность',
				value: 44,
			},
			{
				name: 'Задания',
				value: 23,
			},
		],
	},
])

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

/*
[
    'Шеховцов Всеволод Антонович',
    'Иванов Денис Олегович',
    'Панин Максим Иванович',
    'Захаров Никита Сергеевич',
    'Сизов Егор Андреевич',
    'Иванов Иван Иванович',
    'Марьюшкин Матвей Дмитриевич',
    'Марьюшкин Матвей Дмитриевич',
    'Лаптев Никита Олегович',
    'Гимаев Илья Александрович',
    'Кириллов Даниил Павлович',
    'Панин Максим Иванович',
]
 */

const chartOptions = ref({
	chart: {
		type: 'bar',
		height: '100%',
		stacked: true,

		toolbar: {
			show: false,
		},

		zoom: {
			enabled: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: true,
			dataLabels: {
				total: {
					enabled: true,
					offsetX: 0,
					style: {
						fontSize: '13px',
						fontWeight: 900,
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
			formatter: val => `${val}`,
		},

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
			minWidth: '200px',
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
	&__chart {
		padding-bottom: 12px;
		overflow: auto;
		max-height: 500px;

		text {
			fill: white !important;
			font-family: inherit !important;
			font-weight: normal !important;
		}
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
