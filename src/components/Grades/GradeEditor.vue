<template>
	<InputNumber
		class="GradeEditor"
		unstyled
		:min="props.min"
		:max="props.max"
		:useGrouping="false"
		:modelValue="modelValue === 0 ? null : modelValue"
		:maxFractionDigits="2"
		@update:modelValue="handleInput"
	/>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	min: {
		type: Number,
	},

	max: {
		type: Number,
	},

	modelValue: {
		type: [String, Number],
		default: '',
	},
})

const emit = defineEmits(['update:modelValue'])

const handleInput = value => {
	emit('update:modelValue', value)
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeEditor {
	width: 100%;
	height: 100%;
	display: inline-block;

	input {
		width: 100%;
		height: 100%;
		font-size: 1rem;
		border-radius: 0px;
		resize: none;
		position: relative;
		z-index: 2;
		padding: $tableHeaderCellPadding;
		border: none;
		outline: none;
		box-shadow: 0px 0px 0px 1px transparent;
		text-align: center;
		font-family: inherit;

		&:focus {
			box-shadow: 0px 0px 0px 1px $blue000;
		}
	}
}
</style>
