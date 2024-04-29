<template>
	<Dropdown
		class="TypeGradeSelect"
		v-model="selectedType"
		:options="options"
		:optionLabel="getLabel"
		placeholder="Тип оценивания"
		emptyMessage="Выберите дисциплину"
	/>
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
.TypeGradeSelect {
	height: 37px;
	align-items: center;
}
</style>
