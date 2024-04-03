<template>
	<div class="LeftMenuNav">
		<div v-for="(block, i) in data" :key="i">
			<divider v-if="i !== 0" />

			<LeftMenuLink
				v-for="(item, j) in block.items"
				class="LeftMenuNav__link"
				:key="j"
				:item="item"
			/>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'
import LeftMenuLink from '@components/layouts/Main/LeftMenuLink.vue'

defineProps({
	data: {
		type: Object,
		default: () => ({}),
	},
})
</script>

<style lang="scss" scoped>
.LeftMenuNav {
	&__link {
		&:not(:last-child) {
			margin-bottom: 12px;
		}
	}
}
</style>
