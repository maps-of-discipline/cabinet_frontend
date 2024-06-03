<template>
	<div
		v-tooltip.bottom="{
			value: 'Вид оценивания',
			showDelay: 500,
		}"
	>
		<Dropdown
			class="GradeTypeSelect"
			v-model="selectedType"
			:options="options"
			:optionLabel="getLabel"
			:disabled="!disciplineStore.hasSelectedDiscipline"
			placeholder="Вид оценивания"
			emptyMessage="Отутствуют виды оценивания"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisciplineStore } from '@stores/discipline'
import { useGradesStore } from '@/stores/grades'

const disciplineStore = useDisciplineStore()
const gradesStore = useGradesStore()

const options = computed(() => {
	const availableTypes = gradesStore.availableTypesGrade.sort((a, b) =>
		a.name.localeCompare(b.name)
	)

	const selectAll = {
		name: 'Выбрать все',
		value: 'all',
		type: 'all',
	}

	return [selectAll, ...availableTypes]
})

const selectedType = computed({
	get() {
		return gradesStore.selectedGradeType
	},

	set(type) {
		if (type.value === 'all') gradesStore.setIsAllGradeType(true)
		else gradesStore.setIsAllGradeType(false)

		return gradesStore.setSelectedGradeType(type)
	},
})

const getLabel = value => value.name
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeTypeSelect {
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
