<template>
	<router-link class="CategoryBlock" :to="to" rel="noopener">
		<div
			class="CategoryBlock__icon"
			:style="{ backgroundColor: color, '--color': color }"
		>
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

	&:hover {
		.CategoryBlock {
			&__icon {
				box-shadow: var(--color) 0px 20px 110px 60px;
				transform: scale(1.1) translateY(10px);
			}

			&__label {
				transform: scale(0.95) translateY(40%);
				color: rgb(255, 255, 255);
			}
		}
	}

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
		position: relative;
		z-index: 2;
		font-weight: 600;
		height: 30px;
		font-size: 0.8rem;
		text-align: center;
		transition: all 0.2s ease 0s;
	}
}
</style>
