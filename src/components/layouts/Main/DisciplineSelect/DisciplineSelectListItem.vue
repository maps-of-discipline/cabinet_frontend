<template>
	<Button
		class="DisciplineSelectListItem"
		:key="id"
		@click="onClick"
		icon="mdi mdi-chevron-right"
		iconPos="right"
	>
		<span class="DisciplineSelectListItem__label">{{ label }}</span>
		<Tag v-if="tag" class="DisciplineSelectListItem__tag" :value="tag"></Tag>
	</Button>
</template>

<script setup>
const props = defineProps({
	id: {
		type: [String, Number],
		default: null,
	},

	label: {
		type: String,
		default: '',
	},

	tag: {
		type: [String, Number],
		default: '',
	},
})

const emit = defineEmits(['open'])

const onClick = () => emit('open')
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.DisciplineSelectListItem {
	text-align: left;
	background-color: #0000001f;
	height: 50px;
	width: 100%;
	border: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px;

	&:hover {
		background-color: $shade800;
	}

	&__tag {
		width: 50px;
	}
}
</style>
