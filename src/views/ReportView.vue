<template>
	<div class="ReportView">
		<HeaderTable />

		<div class="ReportView__body">
			<ReportRatingChart class="ReportBlock ReportBlock-1" />
			<ReportStudentsClassificationTable class="ReportBlock ReportBlock-2" />
			<ReportRadialsBars class="ReportBlock ReportBlock-3" />
			<ReportAreaByGradeType class="ReportBlock ReportBlock-4" />
		</div>
	</div>
</template>

<script setup>
import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'

import ReportStudentsClassificationTable from '@components/Report/ReportStudentsClassificationTable.vue'
import ReportRadialsBars from '@components/Report/ReportRadialsBars.vue'
import ReportRatingChart from '@components/Report/ReportRatingChart.vue'
import ReportAreaByGradeType from '@components/Report/ReportAreaByGradeType.vue'
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.ReportView {
	height: 100%;
	display: grid;
	grid-template-rows: 70px calc(100vh - 70px - 12px - 16px - 16px);
	gap: 12px;

	&__body {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: 16px;
		overflow: auto;

		padding-right: 16px;
	}

	.asis-label {
		tspan {
			fill: #fff;
		}
	}
}

.ReportBlock {
	background-color: $shade900;
	padding: 16px;
	border-radius: $borderRadius;

	&-1 {
		grid-column: 1 / span 3;
		grid-row: 1;
	}

	&-2 {
		grid-column: 1 / span 2;
	}

	&-3 {
		grid-column: 3;
		grid-row: 2;
	}

	&-4 {
		grid-column: 1 / span 3;
		grid-row: 3;
	}

	&__title {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 12px;
		display: flex;
		justify-content: space-between;
	}
}
</style>
