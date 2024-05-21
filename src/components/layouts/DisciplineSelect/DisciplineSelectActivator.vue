<template>
	<Button
		class="DisciplineSelectActivator"
		:label="_label"
		v-tooltip.bottom="{
			value: 'Выбор дисциплины',
			showDelay: 500,
		}"
		@click="onClick"
	/>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	label: {
		type: String,
	},
})

const _label = computed(() => props.label || 'Выбор дисциплины')

const emit = defineEmits('open')

const onClick = () => emit('open')
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.DisciplineSelectActivator {
	background-color: $shade950;
	height: 37px;

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
