<template>
	<Dropdown
		v-model="selectedSemestr"
		:options="availableSemesters"
		:optionLabel="test"
		placeholder="Семестр"
	/>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useLessonsStore } from '@/stores/lessons'
import lessonsService from '@services/LessonsService'
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

const availableSemesters = computed(() =>
	Object.keys(lessonsService.controlTypes.value)
)

const test = value => {
	return semesterNamesByNum[+value]
}
</script>

<style lang="scss" scoped></style>
