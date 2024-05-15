<template>
	<div class="Grades" :class="{ isShowSettings: gradesStore.isShowSettings }">
		<HeaderTable>
			<TypeGradeSelect />

			<GradeSettingsButton />
		</HeaderTable>

		<div class="Grades__body">
			<GradesTable />

			<GradeSettings />
		</div>
	</div>
</template>

<script setup>
import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'

import GradesTable from '@components/Grades/GradesTable.vue'
import TypeGradeSelect from '@components/Grades/TypeGradeSelect.vue'
import GradeSettingsButton from '@components/Grades/GradeSettingsButton.vue'
import GradeSettings from '@components/Grades/GradeSettings.vue'

import { useGradesStore } from '@/stores/grades'

const gradesStore = useGradesStore()
</script>

<style lang="scss">
.Grades {
	height: calc(100vh - 16px - 16px);
	display: grid;
	grid-template-rows: 70px calc(100% - 70px - 12px);
	gap: 12px;

	&__body {
		display: grid;
		grid-template-columns: 1fr 0px;
		grid-template-rows: 100%;
		transition: all 0.3s;
		height: 100%;
	}

	&.isShowSettings {
		.Grades {
			&__body {
				grid-template-columns: 1fr 300px;
			}
		}
	}
}
</style>
