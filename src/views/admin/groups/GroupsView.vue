<template>
	<div class="GroupsView">
		<div class="GroupsView__body">
			<GroupsHeader v-model:search="searchModel" />
			<GroupsTable :search="searchModel" />
		</div>
	</div>
</template>

<script setup>
import GroupsTable from '@components/admin/GroupsTable.vue'
import GroupsHeader from '@components/admin/GroupsHeader.vue'

import { ref } from 'vue'

const searchModel = ref('')
</script>

<style lang="scss">
.GroupsView {
	display: flex;
	justify-content: center;

	&__body {
		max-height: 500px;
		height: 100%;
		display: grid;
		grid-template-rows: 70px 1fr;
		grid-template-columns: minmax(0px, 700px);
		gap: 12px;
	}
}
</style>
