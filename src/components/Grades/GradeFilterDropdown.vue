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
		<template #value>
			<i class="mdi mdi-filter" />
		</template>
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
@import '@styles/_variables.scss';

.GradeFilterDropdown {
	background-color: $shade950;
	color: $shade400;

	outline: $focusOutlineTransparent;
	transition: outline 0.2s, color 0.2s;

	&:hover,
	&:focus,
	&.p-inputwrapper-focus {
		border: none;
		outline: $focusOutline;
		color: $shade000;
	}

	.p-multiselect-label {
		transition-duration: 0s;
	}

	.p-multiselect-label.p-placeholder {
		color: #fff;
	}

	.p-multiselect-trigger {
		display: none;
	}

	&__panel {
		.p-multiselect-header {
			display: none;
		}
	}
}
</style>
