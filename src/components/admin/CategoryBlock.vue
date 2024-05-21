<template>
	<router-link class="CategoryBlock" :to="to" rel="noopener">
		<div class="CategoryBlock__icon" :style="{ backgroundColor: color }">
			<i :class="[icon]" />
		</div>

		<div class="CategoryBlock__label">{{ label }}</div>
	</router-link>
</template>

<script setup>
const props = defineProps({
	label: {
		type: String,
		default: '',
	},

	to: {
		type: String,
		default: null,
	},

	icon: {
		type: String,
		default: null,
	},

	color: {
		type: String,
		default: null,
	},
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.CategoryBlock {
	background-color: $shade950;
	border-radius: $borderRadius;
	width: 125px;
	height: 135px;
	padding: 15px;

	overflow: hidden;
	gap: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	&__icon {
		height: 38px;
		width: 38px;
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: all 0.2s ease 0s;
	}

	&__label {
		font-weight: 600;
		height: 30px;
		font-size: 0.8rem;
		text-align: center;
	}
}
</style>
