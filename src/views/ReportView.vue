<template>
	<div class="ReportView" :class="{ isOpenLeftMenu }">
		<HeaderTable />

		<div class="ReportView__body">
			<div class="ReportView__left">
				<DisciplineSelectLeftMenu />
			</div>

			<div class="ReportView__charts">
				<ReportRatingChart class="ReportBlock ReportBlock-1" />
				<ReportStudentsClassificationTable class="ReportBlock ReportBlock-2" />
				<ReportRadialsBars class="ReportBlock ReportBlock-3" />
				<ReportAreaByGradeType class="ReportBlock ReportBlock-4" />
			</div>
		</div>
	</div>
</template>

<script setup>
import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'

import ReportStudentsClassificationTable from '@components/Report/ReportStudentsClassificationTable.vue'
import ReportRadialsBars from '@components/Report/ReportRadialsBars.vue'
import ReportRatingChart from '@components/Report/ReportRatingChart.vue'
import ReportAreaByGradeType from '@components/Report/ReportAreaByGradeType.vue'
import DisciplineSelectLeftMenu from '@components/layouts/DisciplineSelect/DisciplineSelectLeftMenu.vue'

import { computed } from 'vue'

import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'

const disciplineStore = useDisciplineStore()

const isOpenLeftMenu = computed(() => disciplineStore.isOpenDisciplineColumn)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.ReportView {
	height: calc(100vh - 16px - 16px);
	gap: 12px;
	display: grid;
	grid-template-rows: 70px calc(100% - 70px - 12px);
	grid-template-columns: minmax(0px, 1fr);

	&__body {
		display: flex;
		transition: all 0.3s;
		overflow: auto;
		height: 100%;
		align-items: stretch;
	}

	&__charts {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: 16px;
		overflow: auto;

		padding-right: 16px;
	}

	&__left {
		width: 0px;
		height: 100%;
		transition: 0.25s ease;
		margin-left: 0px;
		margin-right: 0px;
		display: flex;
		align-items: stretch;
	}

	&.isOpenLeftMenu {
		.ReportView {
			&__left {
				width: 300px;
				margin-right: 12px;
			}
		}
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
