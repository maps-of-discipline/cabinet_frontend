<template>
	<MultiSelect
		class="GradeColumnFilters"
		panelClass="GradeColumnFilters__panel"
		v-model="selectedFilters"
		:options="filters"
		optionLabel="label"
		:selectAll="false"
	>
		<template #value>
			<i class="mdi mdi-pencil" />
		</template>
	</MultiSelect>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	column: {
		type: Object,
		required: true,
	},
})

const filtersByValue = ref({
	hidden: {
		label: 'Скрыть столбец для студентов',
		value: 'hidden',
	},
})

const filters = ref(Object.values(filtersByValue.value))

const selectedFilters = computed({
	get() {
		const res = []
		if (props.column.hidden) res.push(filtersByValue.value['hidden'])

		return res
	},

	set(newFilters) {
		console.log(newFilters)
	},
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeColumnFilters {
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
		padding: 5px 6px;
		font-size: 0.8rem;
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
