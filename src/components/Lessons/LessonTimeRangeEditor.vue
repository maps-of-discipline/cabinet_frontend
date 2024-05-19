<template>
	<Dropdown
		v-model="selectedRangeId"
		class="LessonTimeRangeEditor"
		:options="options"
		optionLabel="label"
		optionValue="order"
		:disabled="!editMode"
		checkmark
		:highlightOnSelect="false"
		:class="{ editMode, isEmpty: !selectedRangeId }"
	>
		<template #value="{ value }">
			<span class="LessonTimeRangeEditor__value">{{
				getValueLabel(value) || 'Время'
			}}</span>
		</template>
	</Dropdown>
</template>

<script setup>
import { ref, computed } from 'vue'

import lessonTimeRange from '@services/helpers/lessons/lessonTimeRange'

const emit = defineEmits(['change'])

const options = computed(() => lessonTimeRange)

const props = defineProps({
	editMode: {
		type: Boolean,
		default: false,
	},

	value: {
		type: Number,
		default: null,
	},
})

const getValueLabel = value => {
	return (
		lessonTimeRange.find(timerange => timerange.order === value)?.label || ''
	)
}

const selectedRangeId = computed({
	get() {
		return props.value
	},

	set(value) {
		emit('change', value)
	},
})
</script>

<style lang="scss">
.LessonTimeRangeEditor {
	width: 145px;

	&.p-disabled {
		opacity: 1;
	}

	.p-dropdown-label {
		padding: 8px 12px 8px 12px;
		text-align: center;
	}

	.p-dropdown-trigger {
		color: #fff;
		display: none;
		width: 2rem;
	}

	&.editMode {
		.p-dropdown-trigger {
			display: flex;
		}

		.p-dropdown-label {
			padding: 8px 0px 8px 12px;
		}
	}

	&.isEmpty {
		opacity: 0.7;
	}
}
</style>
