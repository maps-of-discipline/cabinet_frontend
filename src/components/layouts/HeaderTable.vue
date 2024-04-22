<template>
	<div class="HeaderTable">
		<div class="HeaderTable__left">
			<DisciplineSelect />
			<GroupSelect />
			<SemesterSelect />
			<EditModeSwitcher />
		</div>

		<div class="HeaderTable__right" id="headerTableTarget">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import DisciplineSelect from '@components/layouts/Main/DisciplineSelect/DisciplineSelect.vue'

import GroupSelect from '@components/Lessons/GroupSelect.vue'
import SemesterSelect from '@components/Lessons/SemesterSelect.vue'
import EditModeSwitcher from '@components/layouts/EditModeSwitcher.vue'

defineProps({
	title: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['add'])
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.HeaderTable {
	padding: 0 16px;

	background-color: $view-bg;
	border-radius: $borderRadius;
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__title {
		font-size: 1.2rem;
	}

	&__right,
	&__left {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	&__editMode {
		display: flex;
		gap: 12px;
		align-items: center;
	}
}
</style>
