<template>
	<div class="HeaderTable">
		<div class="HeaderTable__left">
			<DisciplineSelect />
			<GroupSelect />
			<SemesterSelect />
		</div>

		<div class="HeaderTable__right">
			<Button
				v-if="editMode"
				style="height: 34px"
				icon="mdi mdi-plus"
				severity="success"
				label="Добавить задание"
				@click="onAddButton"
			/>

			<div class="HeaderTable__editMode">
				<ViewSelect />
				<LoadViewSelect />

				<ToggleButton
					v-model="editMode"
					onLabel="Редактирование"
					offLabel="Просмотр"
					onIcon="mdi mdi-pen"
					offIcon="mdi mdi-eye"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDisciplineStore } from '@/stores/discipline'

import DisciplineSelect from '@components/layouts/Main/DisciplineSelect/DisciplineSelect.vue'
import ViewSelect from '@components/Lessons/ViewSelect.vue'
import LoadViewSelect from '@components/Lessons/LoadViewSelect.vue'
import GroupSelect from '@components/Lessons/GroupSelect.vue'
import SemesterSelect from '@components/Lessons/SemesterSelect.vue'

const emit = defineEmits(['add'])

defineProps({
	title: {
		type: String,
		default: '',
	},
})

const disciplineStore = useDisciplineStore()

const editMode = computed({
	get() {
		return disciplineStore.editMode
	},
	set(val) {
		disciplineStore.switchMode(val)
	},
})

const onAddButton = () => {
	emit('add')
}
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
