<template>
	<MultiSelect
		v-model="selectedFilters"
		:options="filters"
		optionLabel="label"
		:selectAll="false"
		class="GradeFilterDropdown"
		panelClass="GradeFilterDropdown__panel"
		placeholder="Фильтры"
	>
		<template #value>Фильтры</template>
		<template #closeicon></template>
	</MultiSelect>
</template>

<script setup>
import { ref, computed } from 'vue'

import { useGradesStore } from '@/stores/grades'

const gradesStore = useGradesStore()

const selectedFilters = computed({
	get() {
		return gradesStore.selectedFilters
	},

	set(filters) {
		gradesStore.setSelectedFilters(filters)
	},
})

const filters = computed(() => gradesStore.filters)
</script>

<style lang="scss">
.GradeFilterDropdown {
	&__panel {
		.p-multiselect-header {
			display: none;
		}
	}
}
</style>
