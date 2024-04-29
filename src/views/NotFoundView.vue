<template>
	<div class="NotFoundView">
		<Stub>
			<div class="NotFoundView__404">404</div>
			<div class="NotFoundView__info">Страница не найдена</div>
		</Stub>
	</div>
</template>

<script setup>
import Stub from '@components/layouts/Stub.vue'
</script>

<style lang="scss">
.NotFoundView {
	height: 100%;
	display: grid;
	grid-template-rows: 1fr;
	gap: 12px;

	&__404 {
		font-size: 3rem;
	}

	&__info {
		font-size: 1.25rem;
	}
}
</style>
