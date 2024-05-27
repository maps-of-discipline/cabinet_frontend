<template>
	<div
		contenteditable
		class="CellEditor p-inputtextarea p-inputtext p-component p-filled"
		ref="input"
		@input="handleInput"
		@focus="setCaretToEnd"
	>
		{{ modelValue }}
	</div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue'

const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: '',
	},
})

const emit = defineEmits(['update:modelValue'])

const handleInput = e => {
	emit('update:modelValue', e.target.innerText)
}

const input = ref(null)
const setCaretToEnd = () => {
	const range = document.createRange()
	const selection = window.getSelection()
	range.setStart(input.value, input.value.childNodes.length)
	range.collapse(true)
	selection.removeAllRanges()
	selection.addRange(range)
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.CellEditor {
	width: 100%;
	font-size: 1rem;
	border-radius: 0px;
	height: 100%;
	resize: none;
	position: relative;
	z-index: 2;
	padding: $tableHeaderCellPadding;
	display: flex;
	align-items: center;
	border: none;
	outline: none;
	box-shadow: 0px 0px 0px 1px transparent;

	&:focus {
		box-shadow: 0px 0px 0px 1px $blue000;
	}
}
</style>
