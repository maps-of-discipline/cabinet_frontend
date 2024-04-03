<template>
	<div class="MainLayout">
		<Header class="MainLayout__header" />

		<main class="MainLayout__main">
			<slot />
		</main>
	</div>
</template>

<script lang="ts">
import Header from '@components/layouts/Main/Header.vue'
</script>

<style lang="scss">
.MainLayout {
	display: grid;
	grid-template-columns: 300px 1fr;

	&__header {
		height: 100vh;
	}

	&__main {
		margin: 16px 30px;
	}
}
</style>
