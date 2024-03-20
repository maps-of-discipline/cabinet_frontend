<template>
	<div class="MainLayout">
		<MainHeader class="MainLayout__header" />

		<main class="MainLayout__main">
			<slot />
		</main>
	</div>
</template>

<script lang="ts">
import MainHeader from '@components/layouts/MainHeader.vue'
</script>

<style lang="scss">
.MainLayout {
	display: grid;
	grid-template-columns: 300px 1fr;

	&__header {
		height: 100vh;
	}

	&__main {
		margin: 30px;
	}
}
</style>
