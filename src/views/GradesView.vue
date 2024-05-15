<template>
	<div class="Grades">
		<HeaderTable>
			<TypeGradeSelect />

			<GradeSettingsButton />
		</HeaderTable>

		<GradesTable />
	</div>
</template>

<script setup>
import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'

import GradesTable from '@components/Grades/GradesTable.vue'
import TypeGradeSelect from '@components/Grades/TypeGradeSelect.vue'
import GradeSettingsButton from '@components/Grades/GradeSettingsButton.vue'
</script>

<style lang="scss">
.Grades {
	height: 100%;
	display: grid;
	grid-template-rows: 70px calc(100vh - 70px - 12px - 16px - 16px);
	gap: 12px;
}
</style>
