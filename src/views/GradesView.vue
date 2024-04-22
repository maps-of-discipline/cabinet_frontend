<template>
	<div class="Grades">
		<HeaderTable>1</HeaderTable>

		<GradesTable />
	</div>
</template>

<script setup>
import HeaderTable from '@components/layouts/HeaderTable.vue'
import GradesTable from '@components/Grades/GradesTable.vue'
</script>

<style lang="scss">
.Grades {
	height: 100%;
	display: grid;
	grid-template-rows: 70px calc(100vh - 70px - 12px - 16px - 16px);
	gap: 12px;
}
</style>
