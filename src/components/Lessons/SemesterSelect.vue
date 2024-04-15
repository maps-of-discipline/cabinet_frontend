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
import { useLessonsStore } from '@/stores/lessons'
import semesterNamesByNum from '@services/helpers/semesterNamesByNum'

const lessonsStore = useLessonsStore()

const selectedSemestr = computed({
	get() {
		return `${lessonsStore.selectedSemester}`
	},

	set(val) {
		lessonsStore.setSemester(+val)
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
