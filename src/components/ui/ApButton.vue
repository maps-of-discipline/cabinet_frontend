<template>
	<Button class="ApButton" v-bind.prop="$props" />
</template>

<script setup></script>

<style lang="scss">
@import '@styles/_variables.scss';

.ApButton {
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
