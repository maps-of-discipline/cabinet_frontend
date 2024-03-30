<template>
	<div>
		<router-link
			v-if="item.route"
			class="HeaderNavLink p-ripple"
			:to="item.route"
			v-ripple
		>
			<i
				v-if="item.icon"
				class="HeaderNavLink__icon mdi"
				:class="[item.icon]"
			/>

			<span class="HeaderNavLink__label">
				{{ item.label }}
			</span>
		</router-link>

		<a
			v-else
			class="HeaderNavLink p-ripple"
			:href="item.url"
			v-ripple
			target="_blank"
		>
			<i
				v-if="item.icon"
				class="HeaderNavLink__icon mdi"
				:class="[item.icon]"
			/>

			<span class="HeaderNavLink__label">
				{{ item.label }}
			</span>
		</a>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
	item: {
		type: Object,
		default: () => ({}),
	},
})
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.HeaderNavLink {
	text-decoration: none;
	color: $menu-link-color;
	display: flex;
	align-items: center;
	border-radius: $borderRadius;
	padding: 12px 16px;
	transition: all 0.25s ease;

	&:hover,
	&.router-link-active {
		background: $menu-link-hover-bg;
		color: #fff;
	}

	&__icon {
		margin-right: 16px;
		font-size: 1.2rem;
		width: 24px;
	}

	&__label {
		font-size: 1rem;
	}
}
</style>
