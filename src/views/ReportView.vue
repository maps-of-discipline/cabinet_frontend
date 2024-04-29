<template>
	<div class="ReportView">
		<HeaderTable />

		<DevelopingStub />
	</div>
</template>

<script setup>
import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'
import DevelopingStub from '@components/layouts/DevelopingStub.vue'
</script>

<style lang="scss">
.ReportView {
	height: 100%;
	display: grid;
	grid-template-rows: 70px calc(100vh - 70px - 12px - 16px - 16px);
	gap: 12px;
}
</style>
