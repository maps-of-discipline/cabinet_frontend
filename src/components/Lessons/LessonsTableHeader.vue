<template>
	<div class="LessonsTableHeader">
		<div class="LessonsTableHeader__title">{{ title }}</div>
		<Button icon="mdi mdi-plus" label="Добавить строку" @click="onAddButton" />
	</div>
</template>

<script setup>
const emit = defineEmits(['add'])

defineProps({
	title: {
		type: String,
		default: '',
	},
})

const onAddButton = () => {
	emit('add')
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LessonsTableHeader {
	padding: 0 16px;

	background-color: $view-bg;
	border-radius: $border-radius-main;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
