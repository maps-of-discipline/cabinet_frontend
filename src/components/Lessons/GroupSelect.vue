<template>
	<Dropdown
		class="GroupSelect"
		v-model="selectedGroup"
		:options="disciplineStore.groups"
		:optionLabel="getLabel"
		:loading="lessonsStore.isLoadingLessons"
		placeholder="Группа"
		emptyMessage="Выберите дисциплину"
	/>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@stores/lessons'

const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()

const selectedGroup = computed({
	get() {
		return disciplineStore.selectedGroup
	},

	set(val) {
		disciplineStore.setGroup(val)
	},
})

const getLabel = value => {
	return value.title
}
</script>

<style lang="scss">
.GroupSelect {
	height: 37px;
	align-items: center;
}
</style>
