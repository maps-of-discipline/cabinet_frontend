<template>
	<Dropdown
		class="GroupSelect"
		v-model="selectedGroup"
		:options="lessonsStore.groups"
		:optionLabel="getLabel"
		:loading="lessonsStore.isLoadingLessons"
		placeholder="Группа"
	/>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useLessonsStore } from '@/stores/lessons'

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
