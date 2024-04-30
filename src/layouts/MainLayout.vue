<template>
	<div class="MainLayout">
		<LeftMenu class="MainLayout__menu" />

		<BubbleBg />

		<main class="MainLayout__main">
			<slot />
		</main>
	</div>
</template>

<script lang="ts" setup>
import BubbleBg from '@components/layouts/Main/BubbleBg.vue'
import LeftMenu from '@components/layouts/Main/LeftMenu/LeftMenu.vue'
</script>

<style lang="scss">
.MainLayout {
	display: grid;
	grid-template-columns: auto 1fr;

	&__menu {
		height: 100vh;
	}

	&__main {
		margin: 16px 30px 16px 30px;
	}
}
</style>
