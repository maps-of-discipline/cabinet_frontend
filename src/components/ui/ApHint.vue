<template>
	<i
		class="ApHint mdi mdi-help-circle"
		v-tooltip.bottom="{
			value: props.hint,
			showDelay: 300,
		}"
	/>
</template>

<script setup>
const props = defineProps({
	hint: {
		type: String,
	},
})
</script>

<style lang="scss">
.ApHint {
	cursor: pointer;
	font-size: 1rem;
	opacity: 0.6;
}
</style>
