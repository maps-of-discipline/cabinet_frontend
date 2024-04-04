<template>
	<Button class="DisciplineSelectActivator" :label="label" @click="onClick" />
</template>

<script setup>
const props = defineProps({
	label: {
		type: String,
		default: '',
	},
})

const emit = defineEmits('open')

const onClick = () => emit('open')
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.DisciplineSelectActivator {
	background-color: $shade950;
	border: none;
	height: 37px;
}
</style>
