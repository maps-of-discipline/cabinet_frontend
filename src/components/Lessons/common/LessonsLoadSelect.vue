<template>
	<Dropdown
		v-if="selectedControl || editMode"
		v-model="selectedControl"
		:options="controls"
		optionLabel="name"
		:disabled="!editMode"
		placeholder=""
		checkmark
		:highlightOnSelect="false"
		class="LessonsLoadSelect"
		:class="{ editMode }"
	/>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
	editMode: {
		type: Boolean,
		default: false,
	},
})

const selectedControl = ref()
const controls = ref([
	{ name: 'ЛЕК' },
	{ name: 'ЭКЗ' },
	{ name: 'ЛАБ' },
	{ name: 'СЕМ' },
])
</script>

<style lang="scss">
.LessonsLoadSelect {
	/* width: 100%; */

	.p-dropdown-label {
		padding: 8px 12px 8px 12px;
	}

	.p-dropdown-trigger {
		display: none;
		width: 2rem;
	}

	&.p-disabled {
		opacity: 1;
	}

	&.editMode {
		.p-dropdown-trigger {
			display: flex;
		}
	}
}
</style>
