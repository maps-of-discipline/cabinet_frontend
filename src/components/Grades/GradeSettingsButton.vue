<template>
	<Button
		class="GradeSettingsButton"
		:class="{ isOpen: gradesStore.isShowSettings }"
		icon="mdi mdi-cog"
		v-tooltip.bottom="{
			value: 'Настройки учета успеваемости',
			showDelay: 500,
		}"
		@click="onClick"
	/>
</template>

<script setup>
import { useGradesStore } from '@/stores/grades'

const gradesStore = useGradesStore()

const onClick = () => {
	gradesStore.setIsShowSettings(!gradesStore.isShowSettings)
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeSettingsButton {
	background-color: $shade950;
	outline: $focusOutlineTransparent;
	border: none;
	transition: outline 0.2s, color 0.2s;
	color: $shade400;
	height: 37px;
	display: flex;
	align-items: center;

	.p-button-label {
		transition-duration: 0s;
	}

	&:hover,
	&.isOpen {
		border: none;
		outline: $focusOutline;
		color: $shade000;
	}
}
</style>
