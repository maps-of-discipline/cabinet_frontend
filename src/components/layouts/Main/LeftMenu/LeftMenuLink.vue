<template>
	<div v-tooltip.right="tooltip">
		<router-link
			v-if="item.route"
			class="LeftMenuLink p-ripple"
			:class="{ mini: props.mini }"
			:to="item.route"
			v-ripple
		>
			<i v-if="item.icon" class="LeftMenuLink__icon mdi" :class="[item.icon]" />

			<span class="LeftMenuLink__label">
				{{ item.label }}
			</span>
		</router-link>

		<a
			v-else
			class="LeftMenuLink p-ripple"
			:href="item.url"
			v-ripple
			target="_blank"
		>
			<i v-if="item.icon" class="LeftMenuLink__icon mdi" :class="[item.icon]" />

			<span class="LeftMenuLink__label">
				{{ item.label }}
			</span>
		</a>
	</div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
	item: {
		type: Object,
		default: () => ({}),
	},

	mini: {
		type: Boolean,
		default: false,
	},
})

const tooltip = computed(() => {
	return props.mini
		? {
				value: props.item.label,
				showDelay: 500,
		  }
		: null
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LeftMenuLink {
	text-decoration: none;
	color: $menu-link-color;
	display: inline-flex;
	align-items: center;
	border-radius: $borderRadius;
	padding: 12px 16px;
	transition: all 0.25s ease;
	width: 100%;
	white-space: nowrap;

	&:hover,
	&.router-link-active {
		background: $menu-link-hover-bg;
		color: #fff;
	}

	&__icon {
		font-size: 1.2rem;
		min-width: 24px;
	}

	&__label {
		margin-left: 16px;
		font-size: 1rem;
		transition: opacity 0.25s ease;
	}

	&.mini {
		.LeftMenuLink {
			&__label {
				opacity: 0;
			}
		}
	}
}
</style>
