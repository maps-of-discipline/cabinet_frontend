<template>
	<Button
		class="AttachLinkButton"
		:class="{ isEmpty }"
		:label="_label"
		:icon="icon"
	/>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	label: {
		type: String,
		default: null,
	},
})

const _label = computed(() => {
	return props.label || 'Прикрепить'
})

const isEmpty = computed(() => {
	return props.label === null
})

const icon = computed(() => {
	if (!isEmpty.value) return 'mdi mdi-link-variant'
	else return 'mdi mdi-link-variant-plus'
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.AttachLinkButton {
	border: none;

	&.isEmpty {
		background-color: $shade1050;
	}
}
</style>
