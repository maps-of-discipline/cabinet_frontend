<template>
	<div class="HeaderNav">
		<div v-for="(block, i) in data" :key="i">
			<divider v-if="i !== 0" />

			<MainHeaderLink
				v-for="(item, j) in block.items"
				class="HeaderNav__link"
				:key="j"
				:item="item"
			/>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'
import MainHeaderLink from '@components/layouts/MainHeaderLink.vue'

defineProps({
	data: {
		type: Object,
		default: () => ({}),
	},
})
</script>

<style lang="scss" scoped>
.HeaderNav {
	&__link {
		&:not(:last-child) {
			margin-bottom: 12px;
		}
	}
}
</style>
