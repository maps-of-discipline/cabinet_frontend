<template>
	<div class="LessonsTableHeader">
		<div class="LessonsTableHeader__title">{{ title }}</div>

		<div class="LessonsTableHeader__right">
			<Button
				v-if="editMode"
				icon="mdi mdi-plus"
				label="Добавить строку"
				@click="onAddButton"
			/>

			<div class="LessonsTableHeader__editMode">
				Режим редактирования
				<InputSwitch v-model="editMode" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useLessonsStore } from '@/stores/lessons'
const emit = defineEmits(['add'])

const lessonsStore = useLessonsStore()

const editMode = computed({
	get() {
		return lessonsStore.editMode
	},
	set(val) {
		lessonsStore.switchMode(val)
	},
})

defineProps({
	title: {
		type: String,
		default: '',
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
