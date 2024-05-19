<template>
	<div class="ProfileView">
		<DevelopingStub />
	</div>
</template>

<script setup>
import DevelopingStub from '@components/layouts/DevelopingStub.vue'
</script>

<style lang="scss">
.ProfileView {
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
