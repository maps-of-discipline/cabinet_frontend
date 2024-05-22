<template>
	<div class="ReportStudentsClassificationTable">
		<div class="ReportBlock__title">
			Классификация студентов по успеваемости
		</div>

		<div class="ReportStudentsClassificationTable__body">
			<div id="chart">
				<apexchart
					ref="chart"
					type="pie"
					width="380"
					:options="chartOptions"
					:series="series"
					@dataPointSelection="onDataPointSelection"
				></apexchart>
			</div>

			<DataTable
				:value="classifications"
				@row-click="onRowClick"
				:rowClass="() => 'ReportStudentsClassificationTable__row'"
			>
				<Column field="label" header="Категория" bod>
					<template #body="{ data, field }">
						<div
							class="ReportStudentsClassificationTable__name-row"
							:class="{ isSelected: selectedLabel === data.label }"
							:style="{
								backgroundColor:
									selectedLabel === data.label
										? getOpacityBgColor(colorById[data.colorId])
										: 'transparent',
							}"
						>
							<span
								class="ReportStudentsClassificationTable__name-row-circle"
								:style="{ backgroundColor: colorById[data.colorId] }"
							>
							</span>

							<span>{{ data[field] }}</span>
						</div>
					</template>
				</Column>
				<Column field="students" header="ФИО" style="max-width: 500px">
					<template #body="{ data, field }">
						<span>{{ data[field].join(', ') }}</span>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

import apexchart from 'vue3-apexcharts'

import colorById from '@services/helpers/colorById'

const classifications = ref([
	{
		label: 'Отличники',
		students: ['Кириллов Даниил Павлович', 'Панин Максим Иванович'],
		colorId: 2,
	},
	{
		label: 'Хорошисты',
		students: [
			'Марьюшкин Матвей Дмитриевич',
			'Лаптев Никита Олегович',
			'Гимаев Илья Александрович',
		],
		colorId: 5,
	},
	{
		label: 'Троечники',
		students: [
			'Сизов Егор Андреевич',
			'Иванов Иван Иванович',
			'Марьюшкин Матвей Дмитриевич',
		],
		colorId: 3,
	},
	{
		label: 'Неуспевающие',
		students: [
			'Шеховцов Всеволод Антонович',
			'Иванов Денис Олегович',
			'Панин Максим Иванович',
			'Захаров Никита Сергеевич',
		],
		colorId: 4,
	},
])

const chart = ref(null)

const series = computed(() => {
	return classifications.value.map(
		classification => classification.students.length
	)
})

const labels = computed(() => {
	return classifications.value.map(classification => classification.label)
})

const colors = computed(() => {
	return classifications.value.map(
		classification => colorById[classification.colorId]
	)
})

const chartOptions = ref({
	chart: {
		width: 450,
		type: 'donut',

		events: {
			click: function (event, chartContext, config) {
				console.log(event, chartContext, config)
			},

			legendClick: function (chartContext, seriesIndex, config) {
				console.log(event, chartContext, config)
			},

			selection: function (chartContext, { xaxis, yaxis }) {
				console.log(1)
			},
		},
	},

	stroke: {
		show: false,
	},

	colors: colors,

	labels: labels,

	legend: {
		show: false,
	},

	dataLabels: {
		textAnchor: 'end',

		style: {
			fontSize: '1rem',
			fontFamily: 'inherit',
			fontWeight: 'normal',
		},
	},
})

const selectedLabel = ref(null)

const getOpacityBgColor = color => {
	return color + '55'
}

const onDataPointSelection = (event, chartContext, config) => {
	selectedLabel.value = labels.value[config.selectedDataPoints[0][0]]
}

const onRowClick = e => {
	console.log(e.data.label, chart.value)

	if (selectedLabel.value === e.data.label) selectedLabel.value = null
	else selectedLabel.value = e.data.label

	chart.value.toggleSeries(e.data.label)
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.ReportStudentsClassificationTable {
	&__body {
		display: flex;
		align-items: center;
	}

	&__row {
		cursor: pointer;
	}

	&__name-row {
		display: flex;
		align-items: center;
		gap: 8px;
		user-select: none;
		padding: 24px 12px;
		transition: background-color 0.2s ease;
		border-radius: $borderRadius;

		&.isSelected {
			background: red;
		}
	}

	&__name-row-circle {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
}
</style>
