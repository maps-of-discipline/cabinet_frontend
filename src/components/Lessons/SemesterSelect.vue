<template>
	<Dropdown
		class="SemesterSelect"
		v-model="selectedSemestr"
		:options="lessonsStore.semesters"
		:loading="lessonsStore.isLoadingControlTypes"
		:optionLabel="getLabel"
		placeholder="Семестр"
	/>
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
		disciplineStore.setSemester(+val)
	},
})

const getLabel = value => {
	return semesterNamesByNum[+value]
}
</script>

<style lang="scss">
.SemesterSelect {
	height: 37px;
	align-items: center;
}
</style>
