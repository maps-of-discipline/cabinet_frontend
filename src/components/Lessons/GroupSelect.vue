<template>
	<Dropdown
		v-model="selectedGroup"
		:options="availableGroups"
		:optionLabel="getLabel"
		placeholder="Группа"
	/>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useLessonsStore } from '@/stores/lessons'
import lessonsService from '@services/LessonsService'

const lessonsStore = useLessonsStore()

const selectedGroup = computed({
	get() {
		return lessonsStore.selectedGroup
	},

	set(val) {
		console.log(val)
		lessonsStore.setGroup(val)
	},
})

const availableGroups = computed(() => lessonsService.groups.value)

const getLabel = value => {
	return value.title
}
</script>

<style lang="scss" scoped></style>
