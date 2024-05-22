<template>
	<ToggleButton
		class="ApEditMode"
		v-model="value"
		onLabel="Редактирование"
		offLabel="Просмотр"
		onIcon="mdi mdi-pen"
		offIcon="mdi mdi-eye"
		:disabled="disabled"
		v-tooltip.bottom="{
			value: 'Режим редактирования таблицы',
			showDelay: 500,
		}"
	/>
</template>

<script setup>
const props = defineProps({
	disabled: {
		type: Boolean,
		default: false,
	},
})

const value = defineModel('value')
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.ApEditMode {
	outline: $focusOutlineTransparent;
	border: none;
	border-radius: $borderRadius;
	transition: outline 0.2s;

	&:hover,
	&:focus {
		border: none;
		outline: $focusOutline;
	}
}
</style>
