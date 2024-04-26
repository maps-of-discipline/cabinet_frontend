<template>
	<Dropdown
		class="GradeSelect"
		panelClass="GradeSelectPanel"
		v-model="selectedGrade"
		:options="gradesOptions"
		:optionLabel="getLabel"
	>
		<template #value>{{ selectedGrade.value }}</template>
	</Dropdown>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'

const emit = defineEmits(['input'])

const props = defineProps({
	value: {
		type: Number,
		default: null,
	},
})

const selectedGrade = computed({
	get() {
		return (
			gradesOptions.find(grade => grade.value === props.value) || {
				value: null,
			}
		)
	},

	set(grade) {
		emit('input', grade.value)
	},
})

const gradesOptions = [
	{
		title: 'Неудовлетворительно',
		value: 2,
	},
	{
		title: 'Удовлетворительно',
		value: 3,
	},
	{
		title: 'Хорошо',
		value: 4,
	},
	{
		title: 'Отлично',
		value: 5,
	},
]

const getLabel = grade => {
	return grade.title
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeSelect {
	width: 100%;
	height: 100%;
	border-radius: 0;
	box-shadow: 0px 0px 0px 1px $blue000;
	position: relative;
	z-index: 2;

	.p-dropdown-trigger {
		display: none;
	}

	.p-dropdown-label {
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.GradeSelectPanel {
	.p-dropdown-item {
		justify-content: center;
	}
}
</style>
