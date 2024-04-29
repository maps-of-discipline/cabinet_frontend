<template>
	<div
		v-tooltip.bottom="{
			value: 'Вид оценивания',
			showDelay: 500,
		}"
	>
		<Dropdown
			class="TypeGradeSelect"
			v-model="selectedType"
			:options="options"
			:optionLabel="getLabel"
			placeholder="Вид оценивания"
			emptyMessage="Выберите дисциплину"
		/>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const options = [
	{
		type: 'activity',
		label: 'Активность',
	},
	{
		type: 'activity',
		label: 'Посещаемость',
	},
	{
		type: 'activity',
		label: 'Задания',
	},
]

const selectedType = ref(options[0])

/* const selectedGroup = computed({
	get() {
		return disciplineStore.selectedGroup
	},

	set(val) {
		disciplineStore.setSelectedGroup(val)
	},
}) */

const getLabel = value => value.label
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.TypeGradeSelect {
	height: 37px;
	align-items: center;
	transition: outline 0.2s;
	outline: $focusOutlineTransparent;

	&.p-inputwrapper-focus,
	&:hover {
		outline: $focusOutline;
	}
}
</style>
