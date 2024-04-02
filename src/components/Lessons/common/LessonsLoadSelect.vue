<template>
	<div
		class="LessonsLoadSelect__wrapper"
		v-tooltip="{
			value: selectedControl?.name,
		}"
	>
		<Dropdown
			v-if="selectedControlId || editMode"
			v-model="selectedControlId"
			class="LessonsLoadSelect"
			:options="controlTypes"
			optionLabel="name"
			optionValue="id_type_control"
			:disabled="!editMode"
			placeholder=""
			checkmark
			:highlightOnSelect="false"
			:class="{ editMode, isEmpty: !selectedControlId }"
			:style="{ backgroundColor }"
		>
			<template #value="{ value }">
				<span class="LessonsLoadSelect__value">{{
					getControlType(value)?.shortname
				}}</span>
			</template>
		</Dropdown>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import colorById from '@services/helpers/colorById'

const emit = defineEmits(['change'])

const props = defineProps({
	editMode: {
		type: Boolean,
		default: false,
	},

	item: {
		type: Object,
		default: null,
	},

	controlTypes: {
		type: Array,
		default: () => [],
	},
})

const getControlType = value => {
	return props.controlTypes.find(
		controlType => controlType.id_type_control == value
	)
}

const selectedControl = computed(() => {
	return getControlType(selectedControlId.value)
})

const backgroundColor = computed(() => colorById[selectedControlId.value])

/* const selectedControlId = ref() */

const selectedControlId = computed({
	get() {
		return props.item.id_type_control
	},

	set(value) {
		emit('change', value)
	},
})
</script>

<style lang="scss">
.LessonsLoadSelect {
	&__wrapper {
		display: inline-block;
		cursor: pointer;
	}

	&__value {
		text-transform: uppercase;
	}

	&.p-disabled {
		opacity: 1;
	}

	.p-dropdown-label {
		padding: 8px 12px 8px 12px;
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
		height: 37px;
		width: 80px;
	}
}
</style>
