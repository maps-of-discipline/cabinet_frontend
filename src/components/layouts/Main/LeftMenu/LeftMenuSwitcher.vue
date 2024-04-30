<template>
	<Button
		class="LeftMenuSwitcher"
		:class="{ isLeftIcon }"
		icon="mdi mdi-chevron-left"
		aria-label="Переключить"
		@click="onClick"
	/>
</template>

<script setup>
import { computed } from 'vue'
import { useUi } from '@stores/ui'

const uiStore = useUi()

const isLeftIcon = computed(() => uiStore.leftMenuMiniMode)

const onClick = () => {
	uiStore.setLeftMenuMiniMode(!uiStore.leftMenuMiniMode)
}
</script>

<style lang="scss">
@import '@styles/variables.scss';

.LeftMenuSwitcher {
	background-color: $shade1000;
	width: 2rem;
	height: 2rem;
	border: none !important;

	.p-button-icon {
		transition: all 0.35s ease;
	}

	&.isLeftIcon {
		.p-button-icon {
			transform: rotate(180deg);
		}
	}
}
</style>
