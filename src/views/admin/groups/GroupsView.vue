<template>
	<div class="GroupsView">
		<GroupsHeader />
		<GroupsTable />
	</div>
</template>

<script setup>
import GroupsHeader from '@components/admin/groups/GroupsHeader.vue'
import GroupsTable from '@components/admin/groups/GroupsTable.vue'
</script>

<style lang="scss">
.GroupsView {
	height: 100%;
	display: grid;
	grid-template-rows: 70px 1fr;
	gap: 12px;
}
</style>
