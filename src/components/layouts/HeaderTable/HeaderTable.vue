<template>
	<div class="HeaderTable">
		<div class="HeaderTable__left">
			<DisciplineSelect />
			<GroupSelect />
			<SemesterSelect />
			<template v-if="disciplineStore.selectedDisciplineId">
				<EditModeSwitcher />
				<OpenPlanButton />
			</template>
		</div>

		<div class="HeaderTable__right" id="headerTableTarget">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import DisciplineSelect from '@components/layouts/DisciplineSelect/DisciplineSelect.vue'

import GroupSelect from '@components/layouts/HeaderTable/GroupSelect.vue'
import SemesterSelect from '@components/layouts/HeaderTable/SemesterSelect.vue'
import EditModeSwitcher from '@components/layouts/HeaderTable/EditModeSwitcher.vue'
import OpenPlanButton from '@components/layouts/HeaderTable/OpenPlanButton.vue'

import { useDisciplineStore } from '@/stores/discipline'

const disciplineStore = useDisciplineStore()

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
