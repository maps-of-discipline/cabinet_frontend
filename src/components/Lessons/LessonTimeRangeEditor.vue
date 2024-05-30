<template>
	<Dropdown
		v-model="selectedRangeId"
		class="LessonTimeRangeEditor"
		:options="options"
		optionLabel="name"
		optionValue="id"
		:disabled="!editMode"
		:highlightOnSelect="false"
		:class="{ editMode, isEmpty: !selectedRangeId }"
	>
		<template #value="{ value }">
			<span class="LessonTimeRangeEditor__value">{{
				getValueLabel(value) || 'Время'
			}}</span>
		</template>

		<template #option="{ option }">
			<div class="LessonTimeRangeEditor__option">
				<span
					class="LessonTimeRangeEditor__option-order"
					:class="{ isSelected: option.order === selectedRangeId }"
				>
					{{ option.order }}
				</span>

				<span>{{ option.name }}</span>
			</div>
		</template>
	</Dropdown>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['change'])

const props = defineProps({
	editMode: {
		type: Boolean,
		default: false,
	},

	bells: {
		type: Array,
		default: () => [],
	},

	value: {
		type: Number,
		default: null,
	},
})

const options = computed(() => props.bells)

const getValueLabel = value => {
	return props.bells.find(bell => bell.id === value)?.name || ''
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
@import '@styles/_variables.scss';

.LessonTimeRangeEditor {
	width: 145px;

	&__option {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	&__option-order {
		width: 25px;
		text-align: center;
		background-color: $shade950;
		border-radius: $borderRadius;
		padding: 2px 2px;
		transition: outline 0.2s;
		outline: $focusOutlineTransparent;

		&.isSelected {
			outline: $focusOutline;
		}
	}

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
		color: $shade400;

		.LessonTimeRangeEditor__value {
			font-weight: 300;
		}
	}
}
</style>
