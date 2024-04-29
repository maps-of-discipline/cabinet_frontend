<template>
	<Button
		class="OpenPlanButton"
		label="Открыть УП"
		icon="mdi mdi-link"
		:disabled="disabled"
		v-tooltip.bottom="{
			value: 'Открыть учебный план',
			showDelay: 500,
		}"
		@click="onClick"
	/>
</template>

<script setup>
import { useDisciplineStore } from '@stores/discipline'
import { computed } from 'vue'

const disciplineStore = useDisciplineStore()

const onClick = () => {
	const rootKdUrl = import.meta.env.VITE_KD_ROOT
	const url = `${rootKdUrl}/?aup=${disciplineStore.selectedAup}`

	window.open(url, '_blank').focus()
}

const disabled = computed(() => !disciplineStore.selectedAup)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.OpenPlanButton {
	background-color: $shade950;
	outline: $focusOutlineTransparent;
	border: none;
	transition: outline 0.2s, color 0.2s;
	color: $shade400;

	.p-button-label {
		transition-duration: 0s;
	}

	&:hover,
	&:focus {
		border: none;
		outline: $focusOutline;
		color: $shade000;
	}
}
</style>
