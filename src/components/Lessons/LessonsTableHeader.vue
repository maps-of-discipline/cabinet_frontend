<template>
	<div class="LessonsTableHeader">
		<div class="LessonsTableHeader__title">{{ title }}</div>

		<div class="LessonsTableHeader__right">
			<Button
				v-if="editMode"
				style="height: 34px"
				severity="success"
				outlined=""
				icon="mdi mdi-plus"
				label="Добавить тему"
				@click="onAddButton"
			/>

			<div class="LessonsTableHeader__editMode">
				<ViewSelect />
				<LoadViewSelect />

				<SemesterSelect />

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
import { useLessonsStore } from '@/stores/lessons'

import ViewSelect from '@components/Lessons/ViewSelect.vue'
import LoadViewSelect from '@components/Lessons/LoadViewSelect.vue'
import SemesterSelect from '@components/Lessons/SemesterSelect.vue'

const emit = defineEmits(['add'])

defineProps({
	title: {
		type: String,
		default: '',
	},
})

const lessonsStore = useLessonsStore()

const editMode = computed({
	get() {
		return lessonsStore.editMode
	},
	set(val) {
		lessonsStore.switchMode(val)
	},
})

const onAddButton = () => {
	emit('add')
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LessonsTableHeader {
	padding: 0 16px;

	background-color: $view-bg;
	border-radius: $border-radius-main;
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__right {
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
