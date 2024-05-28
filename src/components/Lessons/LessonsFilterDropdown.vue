<template>
	<div
		v-tooltip.bottom="{
			value: 'Фильтры',
			showDelay: 500,
		}"
	>
		<MultiSelect
			v-model="selectedFilters"
			:options="filters"
			optionLabel="label"
			:selectAll="false"
			class="LessonsFilterDropdown"
			panelClass="LessonsFilterDropdown__panel"
			placeholder="Фильтры"
		>
			<template #header>
				<div class="LessonsFilterDropdown__header">Отображение столбцов</div>
			</template>

			<template #value>
				<i class="mdi mdi-filter" />
			</template>
		</MultiSelect>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { useLessonsStore } from '@/stores/lessons'

const lessonsStore = useLessonsStore()

const selectedFilters = computed({
	get() {
		return lessonsStore.selectedShowColFilters
	},

	set(filters) {
		lessonsStore.setSelectedShowColFilters(filters)
	},
})

const filters = computed(() => lessonsStore.showColFilters)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LessonsFilterDropdown {
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

		.p-multiselect-label.p-placeholder {
			color: #fff;
		}
	}

	.p-multiselect-label {
		transition-duration: 0s;
	}

	.p-multiselect-trigger {
		display: none;
	}

	&__header {
		margin: 12px;
		font-size: 0.9rem;
		font-weight: 500;
	}

	&__panel {
		.p-multiselect-header {
			display: none;
		}
	}
}
</style>
