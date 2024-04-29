<template>
	<div
		v-tooltip.bottom="{
			value: 'Выбор учебной группы',
			showDelay: 500,
		}"
	>
		<Dropdown
			class="GroupSelect"
			v-model="selectedGroup"
			:options="disciplineStore.groups"
			:optionLabel="getLabel"
			:loading="lessonsStore.isLoadingLessons"
			placeholder="Группа"
			emptyMessage="Выберите дисциплину"
		/>
	</div>
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
		disciplineStore.setSelectedGroup(val)
	},
})

const getLabel = value => {
	return value.title
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GroupSelect {
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
