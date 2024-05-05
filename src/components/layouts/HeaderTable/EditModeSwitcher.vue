<template>
	<ToggleButton
		class="EditModeSwitcher"
		v-model="editMode"
		onLabel="Редактирование"
		offLabel="Просмотр"
		onIcon="mdi mdi-pen"
		offIcon="mdi mdi-eye"
		:disabled="!disciplineStore.hasSelectedDiscipline"
		v-tooltip.bottom="{
			value: 'Режим редактирования таблицы',
			showDelay: 500,
		}"
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

<style lang="scss">
@import '@styles/_variables.scss';

.EditModeSwitcher {
	outline: $focusOutlineTransparent;
	border: none;
	border-radius: $borderRadius;
	transition: outline 0.2s;

	&:hover,
	&:focus {
		border: none;
		outline: $focusOutline;
	}
}
</style>
