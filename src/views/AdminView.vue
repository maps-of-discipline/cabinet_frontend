<template>
	<div class="AdminView">
		<HeaderAdmin />

		<GroupsTable />
	</div>
</template>

<script setup>
import GroupsTable from '@components/admin/Groups/GroupsTable.vue'
import HeaderAdmin from '@components/admin/HeaderAdmin.vue'
</script>

<style lang="scss">
.AdminView {
	height: 100%;
	display: grid;
	grid-template-rows: 70px calc(100vh - 70px - 12px - 16px - 16px);
	gap: 12px;
}
</style>
