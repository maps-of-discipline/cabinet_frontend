<template>
	<div
		v-tooltip.bottom="{
			value: 'Выбор семестра',
			showDelay: 500,
		}"
	>
		<Dropdown
			class="SemesterSelect"
			v-model="selectedSemestr"
			:options="lessonsStore.semesters"
			:loading="lessonsStore.isLoadingControlTypes"
			:optionLabel="getLabel"
			placeholder="Семестр"
			:disabled="!disciplineStore.hasSelectedDiscipline"
			emptyMessage="Выберите дисциплину"
		/>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDisciplineStore } from '@/stores/discipline'
import semesterNamesByNum from '@services/helpers/semesterNamesByNum'
import { useLessonsStore } from '@stores/lessons'

const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()

const selectedSemestr = computed({
	get() {
		return `${disciplineStore.selectedSemester}`
	},

	set(val) {
		disciplineStore.setSelectedSemester(+val)
	},
})

const getLabel = value => {
	return semesterNamesByNum[+value]
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.SemesterSelect {
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
