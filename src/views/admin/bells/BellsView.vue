<template>
	<div class="BellsView">
		<BellsTable />
	</div>
</template>

<script setup>
import BellsTable from '@components/admin/bells/BellsTable.vue'
</script>

<style lang="scss">
.BellsView {
	height: 100%;
	min-width: 500px;
	width: 100%;
}
</style>
