<template>
	<div class="LeftMenuNav">
		<div
			class="LeftMenuNav__block"
			v-for="(block, i) in data"
			:key="i"
			:class="{ hideInMini: block.hideInMini && props.mini }"
		>
			<divider v-if="i !== 0" />

			<LeftMenuLink
				v-for="(item, j) in block.items"
				class="LeftMenuNav__link"
				:key="j"
				:item="item"
				:mini="props.mini"
			/>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'
import LeftMenuLink from '@components/layouts/Main/LeftMenu/LeftMenuLink.vue'

const props = defineProps({
	data: {
		type: Object,
		default: () => ({}),
	},

	mini: {
		type: Boolean,
		default: false,
	},
})
</script>

<style lang="scss" scoped>
.LeftMenuNav {
	width: 100%;
	display: inline-block;

	&__block {
		transition: opacity 0.25s ease;

		&.hideInMini {
			opacity: 0;
		}
	}

	&__link {
		display: inline-block;
		width: 100%;

		&:not(:last-child) {
			margin-bottom: 12px;
		}
	}
}
</style>
