<template>
	<div class="ReportView">
		<HeaderTable />

		<Stub>
			<VueApexCharts
				width="500"
				type="bar"
				:options="chartOptions"
				:series="series"
			/>
		</Stub>
	</div>
</template>

<script setup>
import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'
import Stub from '@components/layouts/Stub.vue'

import VueApexCharts from 'vue3-apexcharts'

const chartOptions = {
	chart: {
		id: 'vuechart-example',
	},
	xaxis: {
		categories: [
			'Неудовлетворительно',
			'Удовлетворительно',
			'Хорошо',
			'Отлично',
		],
	},
}

const series = [
	{
		name: 'series-1',
		data: [30, 40, 35, 50],
	},
]
</script>

<style lang="scss">
.ReportView {
	height: 100%;
	display: grid;
	grid-template-rows: 70px calc(100vh - 70px - 12px - 16px - 16px);
	gap: 12px;
}
</style>
