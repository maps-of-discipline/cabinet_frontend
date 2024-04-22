<template>
	<ToggleButton
		class="EditModeSwitcher"
		v-model="editMode"
		onLabel="Редактирование"
		offLabel="Просмотр"
		onIcon="mdi mdi-pen"
		offIcon="mdi mdi-eye"
	/>
</template>

<script setup>
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

<style scoped></style>
