<template>
	<ApEditMode
		v-model="editMode"
		:disabled="!disciplineStore.hasSelectedDiscipline"
	/>
</template>

<script setup>
import ApEditMode from '@components/ui/ApEditMode.vue'

import { computed } from 'vue'
import { useDisciplineStore } from '@/stores/discipline'

const disciplineStore = useDisciplineStore()

const editMode = computed({
	get() {
		return disciplineStore.editMode
	},

	set(val) {
		disciplineStore.switchMode(val)
	},
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';
</style>
