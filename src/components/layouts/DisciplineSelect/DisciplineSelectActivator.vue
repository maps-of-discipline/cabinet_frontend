<template>
	<Button
		class="DisciplineSelectActivator"
		:label="_label"
		:loading="loading"
		v-tooltip.bottom="{
			value: tooltip,
			showDelay: 500,
		}"
		@click="onClick"
	/>
</template>

<script setup>
import { computed } from 'vue'

import { useDisciplineStore } from '@/stores/discipline'

const emit = defineEmits(['open'])

const disciplineStore = useDisciplineStore()

const props = defineProps({
	label: {
		type: String,
	},

	loading: {
		type: Boolean,
	},
})

const _label = computed(() => props.label || 'Выбор дисциплины')
const tooltip = computed(() =>
	disciplineStore.hasSelectedDiscipline ? props.label : 'Выбор дисциплины'
)

const onClick = () => emit('open')
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.DisciplineSelectActivator {
	background-color: $shade950;
	height: 37px;
	max-width: 300px;

	.p-button-label {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	outline: $focusOutlineTransparent;
	border: none;
	transition: outline 0.2s;

	&:hover,
	&:focus {
		border: none;
		outline: $focusOutline;
	}

	&--dev {
		color: #eab308;
		background-color: rgba(234, 179, 8, 0.16);
		outline: 4px solid transparent;

		&:hover,
		&:focus {
			border: none;
			outline: 4px solid rgb(234, 179, 8, 0.3);
		}
	}
}
</style>
