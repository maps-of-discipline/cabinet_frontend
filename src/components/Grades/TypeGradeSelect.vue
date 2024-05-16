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

const options = computed(() =>
	gradesStore.availableTypesGrade.sort((a, b) => a.name.localeCompare(b.name))
)

const selectedType = computed({
	get() {
		return gradesStore.selectedTypeGrade
	},

	set(type) {
		return gradesStore.setSelectedTypeGrade(type)
	},
})

/* const selectedGroup = computed({
	get() {
		return disciplineStore.selectedGroup
	},

	set(val) {
		disciplineStore.setSelectedGroup(val)
	},
}) */

const getLabel = value => value.name
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
